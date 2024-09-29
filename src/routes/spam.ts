import express from "express";
import { isAuthenticated } from "../middlewares/auth";
import { reportSpam } from "../controllers/spam";
import { phoneNoValidation } from "../middlewares/validations";

const router = express.Router();

router.post("/report",phoneNoValidation,isAuthenticated,reportSpam);

export default router;