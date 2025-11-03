import user from "../models/user.model";
import Order from "../models/order.model.js";
import stripe from "stripe";

//place order
export const placeOrder = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error placeOrder:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
