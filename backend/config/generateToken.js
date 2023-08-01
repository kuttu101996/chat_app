const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "shhh", {
    expiresIn: "1d",
  });
};

module.exports = { generateToken };
