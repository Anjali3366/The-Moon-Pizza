import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// routes
import foodRoute from "./routes/food.route.js";
dotenv.config();

const app = express();
const PORT = 8080;

// middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("server is working ...");
});

// database connection
try {
  await connectDB();
} catch (err) {
  console.log("failed to connect", err);
}

// APIs
app.use("/food", foodRoute);

// start the server
app.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});
