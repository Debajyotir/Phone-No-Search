import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from "drizzle-orm/neon-http/migrator";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);


const main = async() => {
    try {
        await migrate(db,{
            migrationsFolder: "./src/drizzle/migrations"
        })
    } catch (error) {
        console.log(error);
    }
}

main();