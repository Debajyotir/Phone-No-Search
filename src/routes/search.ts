import express from "express";
import { isAuthenticated } from "../middlewares/auth";
import { searchUserByName, searchUserByPhoneNo } from "../controllers/search";
import { nameValidation, phoneNoValidation } from "../middlewares/validations";

const router = express.Router();

router.get("/by-name",nameValidation,isAuthenticated,searchUserByName);
router.get("/by-number",phoneNoValidation,isAuthenticated,searchUserByPhoneNo);

export default router;