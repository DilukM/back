import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import participantRoutes from "./routes/participantRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(cors());
app.use(json());


// Connect to Database
connectDB().then(() => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
});

// Routes
app.use("/api/research", participantRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});
