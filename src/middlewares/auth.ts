import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../drizzle/db";
import { UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

interface MyPayload extends jwt.JwtPayload{
    id: string
}

export const isAuthenticated = async(req:Request,res:Response,next:NextFunction) => {
    try {

        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Login required"
            })
        }

        const decoded = jwt.verify(token,process.env.AUTH_SECRET!) as MyPayload;

        const user = await db.select({id:UserTable.id}).from(UserTable).where(eq(UserTable.id,decoded.id));

        if(user.length===0){
            return res.status(401).json({
                success: false,
                message: "Unauthorized token. Logout first then login again"
            })
        }

        req.loggedInUserId = decoded.id;

        next();
        
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
}