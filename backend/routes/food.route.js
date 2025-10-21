import express from "express";
import { addFood } from "../controllers/food.controller.js";
import multer from "multer";

const router = express.Router();

// Image storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}--${file.originalname.replace(/\s+/g, "_")}`);
  },
});
const upload = multer({ storage });
router.post("/add", upload.single("image"), addFood);

export default router;
