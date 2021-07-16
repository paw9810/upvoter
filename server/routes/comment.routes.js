const express = require("express");
const router = express.Router();
const authenticate = require("../utils/auth");
const commentController = require("../controllers/comment.controller");

router.post("/addComment", authenticate, commentController.addComment);

router.get("/getComments", commentController.getComments);

module.exports = router;
