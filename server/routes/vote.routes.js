const express = require("express");
const voteController = require("../controllers/vote.controller");
const authenticate = require("../utils/auth");

const router = express.Router();

router.get("/all", authenticate, voteController.getVotes);

module.exports = router;
