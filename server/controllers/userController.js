import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  console.log("AuthUsers: ....", username, password)
  const user = await User.findOne({ username:username });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      themecolor: user.themecolor
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log("AuthUsers: ....", username, password)

  const userExists = await User.findOne({ username:username });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      message: "Successfully Sign Up",
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/theme
// @access  Private
const updateUserTheme = asyncHandler(async (req, res) => {

  let user;
  if(req.body._id)
    user = await User.findById(req.body._id);
  
  if (user) {
    user.themecolor = req.body.themecolor

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      themecolor: updatedUser.themecolor,
      username: updatedUser.username,
      message: "Color Updated Successfully"
    });
  } else {
    res.status(401).send({
      message: "Not authorized User"
    })
  }
});



export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserTheme,
};
