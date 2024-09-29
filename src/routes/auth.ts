import express from "express";
import { createUser, login, logout } from "../controllers/auth";
import { isAuthenticated } from "../middlewares/auth";
import { emailValidation, nameValidation, passwordValidation, phoneNoValidation } from "../middlewares/validations";

const router = express.Router();

router.post("/create-user",nameValidation,phoneNoValidation,emailValidation,passwordValidation,createUser);
router.post("/login",phoneNoValidation,passwordValidation,login);
router.get("/logout",isAuthenticated,logout);

export default router;