import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password ) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ message: 'User with same username or email already exists' });
  }

  const newUser = new User({
    username,
    email,
    password
    
  });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });



}

export const LoginUser = async (req,res) => {

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
  
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
      const options = {
        httpOnly: true,
        secure: true,
        partitioned: true,
        sameSite: "None",
      };
      return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
          user: loggedInUser,
          accessToken,
          refreshToken,
          message: 'User logged in successfully'
        });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }

}

export const LogoutUser = async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
      );
    
      const options = {
        httpOnly: true,
        secure: true,
      };
    
      return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json({ message: 'User logged out' });
    }




export const GetCurrentUser = async(req,res) => {
    const userId  = await req.user._id;
    try {
        const user = await User.findById(userId, 'username email ');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error });
      }

}

export const updateUser = async(req,res) => {
    const userId = req.user._id;
    const { username, email } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user details', error });
    }



}

export const ChangePassword = async (req, res) => {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(userId);
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};