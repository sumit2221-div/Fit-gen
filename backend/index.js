import express from 'express';
import ConnectDB from './src/db/database.js';
import dotenv from 'dotenv';
import cors from 'cors'; 
import authRoute from "./src/routes/user.routes.js";
import workoutRoute from "./src/routes/workout.route.js";
import DietRoute from "./src/routes/diet.router.js";
import NutritionRoute from "./src/routes/nutrition.router.js";
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config({ path: './.env' });

// Middleware to parse JSON bodies
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Configure CORS
const allowedOrigins = [
    "http://localhost:5173", // Allow localhost for development
    "https://fit-gen.netlify.app" // Production frontend
  ];
  
  app.use(cors({ 
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Ensure all necessary HTTP methods are allowed
  }));
  
// Define a route for GET requests to "/"
app.get("/", (req, res) => {
    res.send("Welcome to the Express server!");
});

ConnectDB();

// Define routes
app.use("/api/auth", authRoute);
app.use("/api/workout", workoutRoute);
app.use("/api/diet", DietRoute);
app.use("/api/nutrition", NutritionRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
