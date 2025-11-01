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

// all food list --tested
export const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});

    res.status(201).json({ success: true, data: foods });
  } catch (err) {
    console.error("Error in listFood Controller:", err);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};

// remove food Item --not tested !
export const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await Food.findByIdAndDelete(req.body.id);
    res
      .status(201)
      .json({ success: true, message: "Food successfully removed !" });
  } catch (err) {
    console.error("Error in removeFood Controller:", err);
    res.status(500).json({ success: false, error: "Internal Server Error!" });
  }
};
