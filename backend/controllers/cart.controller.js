import User from "../models/user.model.js";

// add to cart
export const addToCart = async (req, res) => {
  try {
    let userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await User.findByIdAndUpdate(req.userId, { cartData: cartData });

    res
      .status(200)
      .json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await User.findByIdAndUpdate(req.userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    let userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = await userData.cartData;

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
