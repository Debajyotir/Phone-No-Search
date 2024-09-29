import { NextFunction, Request, Response } from "express";

export const phoneNoValidation = (req:Request,res:Response,next:NextFunction) => {
    const {phoneNo} = req.body;
    const phoneNoRegex = /^\+?\d{4,14}$/;

    if(typeof phoneNo !== "string" || !phoneNoRegex.test(phoneNo)){
        return res.status(400).json({
            success: false,
            message: "Invalid phone number format. It should be a string with a minimum of 4 and a maximum of 15 characters, and can optionally start with a '+' followed by digits."
        })
    }

    next();
}


export const emailValidation = (req:Request,res:Response,next:NextFunction) => {
    const {email} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === undefined || email === null) {
        return next();
    }

    if(typeof email !== "string" || !emailRegex.test(email) || email.length>255){
        return res.status(400).json({
            success: false,
            message: "Invalid email format or length. Please provide a valid email address with a maximum length of 255 characters."
        })
    }

    next();
}


export const nameValidation = (req:Request,res:Response,next:NextFunction) => {
    const {name} = req.body;

    if(typeof name !== "string"){
        return res.status(400).json({
            success: false,
            message: "Invalid name format. Name must be a string."
        })
    }

    next();
}


export const passwordValidation = (req:Request,res:Response,next:NextFunction) => {
    const {password} = req.body;

    if(typeof password !== "string"){
        return res.status(400).json({
            success: false,
            message: "Invalid password format. Password must be a string."
        })
    }

    next();
}