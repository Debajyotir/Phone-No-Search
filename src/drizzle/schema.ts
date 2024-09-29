import { integer, pgTable, primaryKey, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const UserTable = pgTable("user",{
    id: uuid("id").primaryKey().defaultRandom(),
    phoneNo: varchar("phone_no",{length: 15}).unique().notNull(), // Max length of a phone number is <= 15
    name: text("name").notNull(),
    email: varchar("email",{length:255}),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});



export const ContactList = pgTable("contact_list",{
    id: uuid("id").primaryKey().defaultRandom(),
    phoneNo: varchar("phone_no",{length: 15}).notNull(),
    name: text("name").notNull(),
    userId: uuid("user_id").references(()=>UserTable.id,{onDelete: "set null"}), // In the global database, each contact holds value independently. 
        // Therefore, I used `onDelete: "set null"` so that if a user is deleted in the future, 
        // their contacts will remain in the database, but the `userId` will be set to `null`.
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});



// I divided the Spam schema into two separate schemas:
// 1. SpamCount: This schema stores the total number of spam reports for a particular phone number.
// 2. SpamReport: This schema tracks the exact user who reported the number as spam, 
//    ensuring that a user can only report a specific number once.

// The rationale behind this design is that the number of spam reports is more important 
// than knowing who reported it, especially for read-intensive operations. 
// By separating the schemas, we reduce the amount of data transferred over the network 
// and improve the efficiency of calculating the spam report count, 
// which would be more resource-intensive if we had to aggregate data from a single table.



export const SpamCount = pgTable("spam_count",{
    phoneNo: varchar("phone_no",{length: 15}).primaryKey(),
    count: integer("count").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});



export const SpamReport = pgTable("spam_report",{
    phoneNo: varchar("phone_no",{length: 15}).notNull(),
    userId: uuid("user_id").references(()=>UserTable.id,{onDelete: "cascade"}).notNull(),// Using `ON DELETE CASCADE` here makes more sense because we have another schema (SpamCount) 
        // to globally track the number of spam reports. This `spamReport` schema is just to prevent 
        // duplicate spam reports from the same user. If a user is deleted in the future, their associated 
        // spam reports should also be deleted, ensuring the data remains clean and relevant.
    createdAt: timestamp("created_at").notNull().defaultNow(),
},(table)=>{
    return{
        pk: primaryKey({columns:[table.phoneNo,table.userId]})
    }
});