const express = require("express");
const { authentication } = require("../middleware/authentication");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  leaveGroup,
} = require("../controllers/chatController");

const chatRouter = express.Router();

chatRouter
  .route("/")
  .post(authentication, accessChat)
  .get(authentication, fetchChats);

chatRouter.route("/group").post(authentication, createGroupChat);

chatRouter.route("/rename").put(authentication, renameGroup);

chatRouter.route("/addtogroup").put(authentication, addToGroup);

chatRouter.route("/removeGroup").put(authentication, leaveGroup);

module.exports = { chatRouter };
