import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { ContactList } from "../drizzle/schema";

interface contactSchema{
    phoneNo: string,
    name: string,
}

export const addContact = async(req:Request,res:Response) =>{
    try {

        const {phoneNo,name} : contactSchema = req.body;

        const userId = req.loggedInUserId;

        await db.insert(ContactList).values({phoneNo,name,userId});

        res.status(201).json({
            success: true,
            message: "Successfully entered"
        })
        
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
}