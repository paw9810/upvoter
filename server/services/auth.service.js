const { body, validationResult } = require("express-validator");

exports.validateRegister = [
  body("name").trim().isLength({ min: 5 }),
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
];

exports.validateLogin = [body("name").trim(), body("password").trim()];
