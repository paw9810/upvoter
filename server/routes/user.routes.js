const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../utils/auth");

router.get("/all", authenticate, userController.getUsers);

module.exports = router;
