import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path"; // Import path using ES module syntax
import { fileURLToPath } from "url"; // Needed to get __dirname equivalent

const PORT = 5000;
dotenv.config();

const app = express();

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

// Serve static files from the frontend
const buildpath = path.join(__dirname, "../client/dist");
app.use(express.static(buildpath));

// Configure CORS
app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    // credentials: true,
    origin: "*",
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define routes
app.get("/", (req, res) => {
  res.send("App working fine");
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
