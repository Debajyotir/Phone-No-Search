import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../drizzle/db";
import { UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { sendCookie } from "../utils/cookies";

interface User{
    name: string,
    phoneNo: string,
    email?: string,
    password: string
}

interface Login{
    phoneNo: string,
    password: string
}



export const createUser = async(req:Request,res:Response) => {
    try {
        const {name,phoneNo,email,password} : User = req.body;
    
        const findUser = await db.select({phoneNo:UserTable.phoneNo}).from(UserTable).where(eq(UserTable.phoneNo,phoneNo));
    
        if(findUser.length!==0){
            return res.status(409).json({
                success: false,
                message: "Already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        let user:{id:string}[];

        if(email)
           user = await db.insert(UserTable).values({name,phoneNo,email,password:hashedPassword}).returning({id:UserTable.id});
        else
            user = await db.insert(UserTable).values({name,phoneNo,password:hashedPassword}).returning({id:UserTable.id});

        sendCookie(user[0].id,res,"Registered Successfully",201);

    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }

}



export const login = async(req:Request,res:Response) => {
    try {
        const {phoneNo, password} : Login  = req.body;
        
        const findUser = await db.select({password:UserTable.password,id:UserTable.id}).from(UserTable).where(eq(UserTable.phoneNo,phoneNo));

        if(findUser.length===0){
            return res.status(401).json({
                success: false,
                message: "Register first"
            });
        }

        const isMatch = await bcrypt.compare(password,findUser[0].password)

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        sendCookie(findUser[0].id,res,"Login Successfully",200);

    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
}



export const logout = (req:Request,res:Response) => {
    return res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Developement" ? false : true
    }).json({
        success: true,
        message: "Logged out successfully"
    })
}