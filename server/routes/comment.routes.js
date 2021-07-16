const express = require("express");
const router = express.Router();
const authenticate = require("../utils/auth");
const commentController = require("../controllers/comment.controller");

router.post("/addComment", authenticate, commentController.addComment);

router.get("/getTopComments", commentController.getTopComments);

router.get("/getChildComments", commentController.getChildComments);

module.exports = router;
