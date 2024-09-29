import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { ContactList, SpamCount, UserTable } from "../drizzle/schema";
import { and, eq, ilike } from "drizzle-orm";
import { sortContactByName } from "../utils/search";

export const searchUserByName = async(req:Request,res:Response) => {
    try {
        const {name} : {name:string} = req.body;
        
        const resultFromRegisteredUserDB = await db.select({name:UserTable.name, phoneNo:UserTable.phoneNo,
            spamLikelihood: SpamCount.count
        }).from(UserTable).leftJoin(SpamCount, eq(UserTable.phoneNo,SpamCount.phoneNo)).where(
            ilike(UserTable.name,`%${name}%`)
        )
        


        const resultFromContactList = await db.select({name:ContactList.name, phoneNo:ContactList.phoneNo,
            spamLikelihood: SpamCount.count
        }).from(ContactList).leftJoin(SpamCount, eq(ContactList.phoneNo,SpamCount.phoneNo)).where(
            ilike(ContactList.name,`%${name}%`)
        )
        

        const fullList = resultFromContactList.concat(resultFromRegisteredUserDB);
        const sortedList = sortContactByName(fullList,name);

        for(let i=0;i<sortedList.length;i++){
            if(sortedList[i].spamLikelihood===null)
                sortedList[i].spamLikelihood = 0;
        }
 
        if(sortedList.length>0){
            return res.status(200).json({
                success: true,
                searchResult: sortedList
            });
        }

        return res.status(200).json({
            success: true,
            message: "No search result found",
            searchResult: []
        })
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
}

export const searchUserByPhoneNo = async(req:Request,res:Response) =>{
    try {
        
        const {phoneNo} = req.body;
        const userId = req.loggedInUserId as string;

        const resultFromRegisteredUserDB = await db.select({
            name: UserTable.name,
            phoneNo: UserTable.phoneNo,
            spamLikelihood: SpamCount.count,
            email: UserTable.email
        }).from(UserTable).leftJoin(SpamCount,eq(UserTable.phoneNo,SpamCount.phoneNo)).where(eq(UserTable.phoneNo,phoneNo));


        
        if(resultFromRegisteredUserDB.length>0){

            const inTheUserContactList = await db.select({id:ContactList.id}).from(ContactList).where(and(
                eq(ContactList.userId,userId),
                eq(ContactList.phoneNo,phoneNo)
            ));

            if(resultFromRegisteredUserDB[0].email===null)
                resultFromRegisteredUserDB[0].email = "Not provided by the user"
            if(resultFromRegisteredUserDB[0].spamLikelihood===null)
                resultFromRegisteredUserDB[0].spamLikelihood = 0;

            if(inTheUserContactList.length>0){
                return res.status(200).json({
                    success: true,
                    searchResult: resultFromRegisteredUserDB,
                })
            }

            return res.status(200).json({
                success: true,
                searchResult: [{
                    name: resultFromRegisteredUserDB[0].name,
                    phoneNo: resultFromRegisteredUserDB[0].phoneNo,
                    spamLikelihood : resultFromRegisteredUserDB[0].spamLikelihood
                }]
            })
        }


        const searchInGlobalContactList = await db.select({
            name: ContactList.name,
            phoneNo: ContactList.phoneNo,
            spamLikelihood: SpamCount.count
        }).from(ContactList).leftJoin(SpamCount,eq(ContactList.phoneNo,SpamCount.phoneNo)).where(eq(ContactList.phoneNo,phoneNo));

        if(searchInGlobalContactList.length>0){
            if(searchInGlobalContactList[0].spamLikelihood===null)
                searchInGlobalContactList[0].spamLikelihood=0;
            return res.status(200).json({
                success: true,
                searchResult: searchInGlobalContactList
            })
        }

        return res.status(200).json({
            success: true,
            message: "No search result found",
            searchResult: []
        })

    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
}