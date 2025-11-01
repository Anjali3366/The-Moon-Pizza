import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { createToken } from "../utils/createToken.js";
import { hashPassword } from "../utils/hashPassword.js";

// login

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email address.",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = createToken(existingUser._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log("Error in Login Controller :", error);
    res.status(500).json({ success: false, error: "Internal Server Error !" });
  }
};

// sign
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already Exists" });
    }

    // validating email and password format ;
    if (!validator.isEmail(email)) {
      res.status(400).json({ success: false, message: "Enter a valid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8 Character long !",
      });
    }
    //hash the user password
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log("Error in Signup Controller :", error);
    res.status(500).json({ success: false, error: "Internal Server Error !" });
  }
};
