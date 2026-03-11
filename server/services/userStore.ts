import mongoose from 'mongoose';
import User from '../models/User.ts';

const isDatabaseAvailable = () => mongoose.connection.readyState === 1;

const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

const findUserById = async (userId: string) => {
  return User.findById(userId);
};

const createUser = async (email: string, password: string) => {
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
};

const deleteUserById = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};

const updateUserById = async (userId: string, update: Record<string, unknown>) => {
  return User.findByIdAndUpdate(
    userId,
    { $set: update },
    { returnDocument: 'after' }
  );
};

export {
  isDatabaseAvailable,
  findUserByEmail,
  findUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
