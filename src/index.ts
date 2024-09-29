import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import contactsRouter from "./routes/contacts";
import spamRouter from "./routes/spam";
import searchRouter from "./routes/search"

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/contacts",contactsRouter);
app.use("/api/v1/spam",spamRouter);
app.use("/api/v1/search",searchRouter);


app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
});