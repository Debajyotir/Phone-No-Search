/*

// This code is just for creating some random users in the database to test the APIs


import { faker } from '@faker-js/faker';
import { db } from '../drizzle/db';
import { ContactList, SpamCount, SpamReport, UserTable } from '../drizzle/schema';
import bcrypt from "bcrypt";
import { sql } from 'drizzle-orm';

const RandomData = async() =>{
    try {
        const array = [];
        for(let i=0;i<30;i++){
            const user = {
                id: faker.string.uuid(),
                name: faker.name.fullName(),
                phoneNo: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
                email: faker.internet.email(),
                password: await bcrypt.hash("1234",10)
            }
            array.push(user.phoneNo);
            await db.insert(UserTable).values(user)
            for(let j=0;j<25;j++){
                const contact = {
                    name: faker.name.fullName(),
                    phoneNo: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
                    userId: user.id
                }
                await db.insert(ContactList).values(contact);
                array.push(contact.phoneNo);
            }

            if(i>=2){
                for(let k=0;k<3;k++){
                    const randomIndex = Math.floor(Math.random() * array.length);
                    try {
                        await db.insert(SpamReport).values({phoneNo:array[randomIndex],userId:user.id});
                        await db.insert(SpamCount).values({phoneNo:array[randomIndex],count: 1}).onConflictDoUpdate({
                            target: SpamCount.phoneNo, set:{count: sql`${SpamCount.count}+1`, updatedAt: sql`NOW()`}
                        });
                    } catch (error) {
                        
                    }
                }
            }
        }
    } catch (error) {
        console.log("error is here :- ",error);
    }
}

RandomData();

*/