import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();
// routes
import foodRoute from "./routes/food.route.js";
import userRoute from "./routes/user.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";

const app = express();
const PORT = 8080;

// middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("The MOON's PIZZA server is working ...");
});

// database connection
try {
  await connectDB();
} catch (err) {
  console.log("failed to connect", err);
}

// APIs
app.use("/food", foodRoute);
app.use("/auth", userRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

// start the server
app.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});
