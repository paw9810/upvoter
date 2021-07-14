const db = require("../models");
const jwtDecode = require("jwt-decode");
const postService = require("../services/post.service");

exports.getPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postService.getPost(postId);

    res.status(200).json({
      title: post.title,
      location: post.location,
      tags: post.tags,
      rating: post.rating,
    });
  } catch (err) {
    res.status(404).send("post not found");
  }
};

exports.addPost = async (req, res) => {
  try {
    const fileName = `${Date.now()}_${req.files.postImage.name}`;
    const path = __dirname + "/../media/posts/" + fileName;

    const accessToken = req.cookies.JWT;
    const decoded = await jwtDecode(accessToken);

    const title = req.body.title;
    const tags = req.body.tags;

    await req.files.postImage.mv(path);

    const post = await postService.createPost(
      title,
      fileName,
      tags,
      0,
      decoded.id
    );
    res.status(201).send("succesfully added image");
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
