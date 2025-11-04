import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { placeOrder, verifyOrder } from "../controllers/order.controller.js";

const router = express.Router();
// place order
router.post("/place", authMiddleware, placeOrder);

router.post("/verify", verifyOrder);
export default router;
