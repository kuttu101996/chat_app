const express = require("express");
require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const path = require("path");

const { chats } = require("./data/data");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/user.router");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { chatRouter } = require("./Routes/chat.router");
const { messageRouter } = require("./Routes/message.router");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "Hello from Server" });
});

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send({ msg: "Hello from Server" });
  });
}

app.use(notFound);
app.use(errorHandler);

app.get("/chats/:id", (req, res) => {
  const data = chats.filter((ele) => {
    return req.params.id === ele._id;
  });
  res.send({ msg: "Single Chat", data: data });
});

const server = app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DB`.cyan.underline);
    console.log(`server running at ${process.env.port}`.cyan.underline);
  } catch (error) {
    console.log(error);
  }
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on("joinChat", (room) => {
    socket.join(room);
    console.log(`User Joined room : ${room}`);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stopTyping", (room) => socket.in(room).emit("stopTyping"));

  socket.on("newMessage", (newMessage) => {
    var chat = newMessage.chat;

    if (!chat.users) return console.log("Not User");

    chat.users.forEach((element) => {
      if (element._id == newMessage.sender._id) return;

      socket.in(element._id).emit("messageRcv", newMessage);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
