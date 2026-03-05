import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from "../models/User.ts";

const Login = async (req: express.Request, res: express.Response) => {
  try {
    dotenv.config();
    const JWT_SECRET = process.env.JWT_SECRET || '';

    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Generate Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ 
      token, 
      user: { id: user._id, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default Login;