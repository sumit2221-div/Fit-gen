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
const allowedOrigins = ["https://fit-gen.netlify.app", "http://localhost:5173"];
app.use(cors({ 
    origin: allowedOrigins,  // Allow both production and development URLs
    credentials: true 
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

import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with same username or email already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Exclude password & refreshToken from response
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const cookieOptions = {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      sameSite: 'none', 
    
    };

    // Set cookies
    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    return res.status(200).json({
      user: loggedInUser,
      accessToken,
      refreshToken,
      message: 'User logged in successfully'
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Logout User
export const LogoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      sameSite: 'none', 
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error clearing cookies:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Current User (Protected)
export const GetCurrentUser = async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const user = await User.findById(userId).select('username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update User Details (Protected)
export const updateUser = async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { username, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    ).select('username email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Change Password (Protected)
export const ChangePassword = async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
