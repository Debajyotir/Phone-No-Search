import { Response } from "express";
import jwt from "jsonwebtoken";

export const sendCookie = (id:string, res:Response, message:string, statusCode:number) =>{
    const token = jwt.sign({id},process.env.AUTH_SECRET!);
    res.status(statusCode).cookie("token",token,{
        httpOnly: true,
        maxAge: 60*60*1000,
        sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Developement" ? false : true
    }).json({
        success: true,
        message: message
    });
}