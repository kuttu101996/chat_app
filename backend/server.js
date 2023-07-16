const express = require("express");
require("dotenv").config();

const app = express();

app.listen(process.env.port, async () => {
  try {
    console.log(`server running at ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
