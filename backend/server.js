const express = require("express");
const { chats } = require("./data/data");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send({ msg: "Hello from Server" });
});

app.get("/chats", (req, res) => {
  res.send({ msg: "Chats serving", data: chats });
});

app.get("/chats/:id", (req, res) => {
  const data = chats.filter((ele) => {
    return req.params.id === ele._id;
  });
  res.send({ msg: "Single Chat", data: data });
});

app.listen(process.env.port, async () => {
  try {
    console.log(`server running at ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
