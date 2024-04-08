// Import required modules
import express from 'express';
import morgan from 'morgan';
import router from './routes/authRoute.js';
import dotenv from "dotenv";
import cors from 'cors';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import { connectToMongo } from './dataBase/db.js';

// Configure env
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Define API routes
app.use("/api/auth", router);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Database connection
connectToMongo();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
