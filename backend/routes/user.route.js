import express from "express";
import { loginUser, signUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginUser);

export default router;
