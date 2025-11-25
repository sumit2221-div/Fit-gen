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

   

    const newUser = new User({
      username,
      email,
      password, // Store hashed password
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
      secure: true,  // Ensures cookies are only sent over HTTPS
      sameSite: "None", // Allows cross-site cookies
      domain: "fit-gen-rczl.onrender.com", // Use backend domain or remove if unnecessary
      partitioned: true, // New flag to comply with future browser policies
    };
    

    // Set cookies
    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);
    console.log("Cookies set:", req.cookies); 

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
      secure: true,  // Ensures cookies are only sent over HTTPS
      sameSite: "None", // Allows cross-site cookies
      domain: "fit-gen-rczl.onrender.com", // Use backend domain or remove if unnecessary
      partitioned: true, // New flag to comply with future browser policies
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


