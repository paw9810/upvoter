const express = require("express");
const router = express.Router();
const authenticate = require("../utils/auth");
const postController = require("../controllers/post.controller");

router.get("/:postId", postController.getPost);

router.post("/addPost", authenticate, postController.addPost);

module.exports = router;
