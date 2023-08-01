const express = require("express");
const { User } = require("../Models/user.model");
const { registerUser, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const data = await User.find();
    console.log(data);
    return res.send({ msg: data });
  } catch (error) {
    return res.send({ msg: error.message });
  }
});

userRouter.post("/login", loginUser);

userRouter.route("/register").post(registerUser);

module.exports = { userRouter };
