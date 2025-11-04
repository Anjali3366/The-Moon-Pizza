import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  allOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/order.controller.js";

const router = express.Router();
// place order
router.post("/place", authMiddleware, placeOrder);

router.post("/verify", verifyOrder);
router.post("/userOrders", authMiddleware, userOrders);

router.get("/allOrders", allOrders);
router.post("/status", updateStatus);
export default router;
