import express from "express";
import { addFood } from "../controllers/food.controller.js";
import multer from "multer";

const router = express.Router();

// Image storage Engine
const storage = multer.diskStorage({});
router.post("/add", addFood);

export default router;
