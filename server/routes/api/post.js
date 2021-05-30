const express = require("express");
const router = express.Router();
const db = require("../../models");
const authenticate = require("../../auth");
const jwtDecode = require("jwt-decode");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await db.post.findOne({ where: { id: postId } });

  res.status(200).json({
    title: post.title,
    location: post.location,
    tags: post.tags,
    rating: post.rating,
  });
});

router.post("/addPost", authenticate, async (req, res) => {
  const fileName = `${Date.now()}_${req.files.postImage.name}`;
  const path = __dirname + "/../../media/posts/" + fileName;
  const accessToken = req.cookies.JWT;
  const decoded = await jwtDecode(accessToken);
  const title = req.body.title;
  const tags = req.body.tags;
  try {
    await req.files.postImage.mv(path);
  } catch (err) {
    res.status(500).send(err);
  }

  try {
    const post = await db.post.create({
      title: title,
      location: fileName,
      tags: tags,
      rating: 0,
      userId: decoded.id,
    });
  } catch (err) {
    res.status(401).send(err);
  }

  res.status(201).send("succesfully added image");
});
module.exports = router;
