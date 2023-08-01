const express = require("express");
const { chats } = require("./data/data");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const colors = require("colors");
const { userRouter } = require("./Routes/user.router");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Hello from Server" });
});

app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorHandler);

app.get("/chats/:id", (req, res) => {
  const data = chats.filter((ele) => {
    return req.params.id === ele._id;
  });
  res.send({ msg: "Single Chat", data: data });
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DB`.cyan.underline);
    console.log(`server running at ${process.env.port}`.cyan.underline);
  } catch (error) {
    console.log(error);
  }
});
