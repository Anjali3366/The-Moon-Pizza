import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

import authMiddleware from "../middlewares/auth.js";
const router = express.Router();

// add to cart
router.post("/add", authMiddleware, addToCart);
// remove from cart
router.post("/remove", authMiddleware, removeFromCart);
// get cart
router.post("/get", authMiddleware, getCart);

export default router;
