const commentService = require("../services/comment.service");

exports.addComment = async (req, res) => {
  try {
    const parentComment = req.body.parentCommentId;
    const text = req.body.text;
    const userId = req.body.userId;
    const postId = req.body.postId;

    await commentService.addComment(parentComment, userId, postId, text);

    res.status(201).send("success");
  } catch (err) {
    res.ststus(400).send(err.message);
  }
};

exports.getComments = async (req, res) => {
  try {
    const postId = req.query.postId;

    const result = await commentService.getComments(postId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
