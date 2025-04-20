const rateLimit = require("express-rate-limit");

// General limiter for most routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

// Strict limiter for register/login
const registerLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many attempts. Please try again in 15 minutes.",
  });

  module.exports = {
    generalLimiter,
    registerLoginLimiter,
  };
