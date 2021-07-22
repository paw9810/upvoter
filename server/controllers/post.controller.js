const db = require("../models");
const jwtDecode = require("jwt-decode");
const postService = require("../services/post.service");

exports.getPost = async (req, res) => {
  try {
    const postImage = req.query.postImage;
    const post = await postService.getPost(postImage);

    res.status(200).json(post);
  } catch (err) {
    res.status(404).send("post not found");
  }
};

exports.addPost = async (req, res) => {
  try {
    postService.checkIfImage(req.files.postImage.name);
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

    res.status(201).send("success");
  } catch (err) {
    if (err.message === "wrong extension") res.status(400).send(err.message);
    else res.sendStatus(400);
  }
};
