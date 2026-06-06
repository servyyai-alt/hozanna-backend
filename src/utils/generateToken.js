const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || "super-secret-key", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

module.exports = generateToken;
