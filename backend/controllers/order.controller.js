import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../config/stripe.js";

//place order
export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new Order({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    //create a payment intent with stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 89, // convert to paise
      },
      quantity: item.quantity,
    }));

    // delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 1 * 100 * 89, // convert to paise
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error in  placeOrder controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// verfiy Order
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: "true" });
      res.status(200).json({
        success: true,
        message: "Payment verified and order completed.",
      });
    } else {
      await Order.findByIdAndDelete(orderId);
      res
        .status(402)
        .json({ success: false, message: "Payment failed. Order cancelled." });
    }
  } catch (error) {
    console.log("Error in verifyOrder controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// user Orders for frontend

export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error in userOrders controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error in allOrders controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// update order status
export const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    await Order.findByIdAndUpdate(orderId, { status: status });
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error in updateStatus controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
