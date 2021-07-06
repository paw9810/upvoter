const express = require("express");
const authController = require("../controllers/auth.controller");
const authService = require("../services/auth.service");

const router = express.Router();

router.post("/register", authService.validateRegister, authController.register);

router.post("/login", authService.validateLogin, authController.login);

router.post("/refresh", authController.refresh);

module.exports = router;
