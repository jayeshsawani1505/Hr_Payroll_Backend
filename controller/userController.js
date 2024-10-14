const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { email, username, password, mobile_number, role } = req.body;

  try {

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new UserModel({
      email,
      username,
      password,
      mobile_number,
      role
    });

    await user.save();
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.user;
    const UserDetail = await UserModel.findById(userId._id).select("-password")

    return res.status(200).json({ data: UserDetail })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}
const verifyPassword = async (req, res) => {
  const { _id, password } = req.body;

  try {
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Password is valid' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  verifyPassword
};
