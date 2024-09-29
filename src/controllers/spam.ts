import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { SpamCount, SpamReport } from "../drizzle/schema";
import { and, eq, sql } from "drizzle-orm";

export const reportSpam = async(req:Request,res:Response) => {
    try {

        const { phoneNo } : { phoneNo:string } = req.body;
        const loggedInUserId = req.loggedInUserId as string;
        
        const alreadyReported = await db.select({createdAt: SpamReport.createdAt}).from(SpamReport).where(and(eq(SpamReport.phoneNo,phoneNo),eq(SpamReport.userId,loggedInUserId)));

        if(alreadyReported.length>0){
            return res.status(400).json({
                success: false,
                message: `Already reported at ${alreadyReported[0].createdAt}`
            })
        }

        const transaction = await db.transaction(async(tx) => {
            
            const report = await tx.insert(SpamReport).values({phoneNo,userId:loggedInUserId});

            const increaseCount = await tx.insert(SpamCount).values({phoneNo,count: 1}).onConflictDoUpdate({
                target: SpamCount.phoneNo, set:{count: sql`${SpamCount.count}+1`, updatedAt: sql`NOW()`}
            });

        });

        res.status(200).json({
            success: true,
            message: "Report as spam successful"
        })
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        });
    }
}