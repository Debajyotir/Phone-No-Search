import express from "express";
import { isAuthenticated } from "../middlewares/auth";
import { addContact } from "../controllers/contacts";
import { nameValidation, phoneNoValidation } from "../middlewares/validations";

const router = express.Router();

router.post("/upload",phoneNoValidation,nameValidation,isAuthenticated,addContact);

export default router;