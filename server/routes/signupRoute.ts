import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from "../models/User.ts";

const Signup = async (req: express.Request, res: express.Response) => {
  try {
    dotenv.config();
    const JWT_SECRET = process.env.JWT_SECRET || '';

    const { email, password } = req.body;

    // Validate email format server-side (defence-in-depth beyond the frontend)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate Token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ token, user: { email: newUser.email, id: newUser._id } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default Signup;