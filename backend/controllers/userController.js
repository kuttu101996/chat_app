const asyncHandler = require("express-async-handler");
const { User } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all Details");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Exist");
  }

  bcrypt.hash(password, 4, async function (err, hash) {
    if (err) {
      res.status(400);
      throw new Error({ msg: err.message });
    }
    const newUser = await User.create({
      name,
      email,
      password: hash,
      pic,
    });

    if (newUser) {
      return res.status(201).json({
        msg: "Successfully Registered",
        newUser,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Unable to register");
    }
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist && (await userExist.matchPass(password))) {
    res.status(201).json({
      msg: "Successfully Registered",
      userExist,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, loginUser };
