import Food from "../models/food.model.js";
import fs from "fs";

// add food items
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const image_filename = req.file.filename;

    const food = new Food({
      name,
      description,
      price,
      category,
      image: image_filename,
    });
    await food.save();

    res.status(200).json({ success: true, message: "Food Added!" });
  } catch (err) {
    console.error("Error in addFood Controller:", err);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};
