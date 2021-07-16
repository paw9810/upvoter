const db = require("../models");

exports.addComment = async (parentId, userId, postId, text) => {
  await db.comment.create({
    parentComment: parentId,
    text: text,
    postId: postId,
    userId: userId,
  });
};

exports.getComments = async (postId) => {
  const result = await db.comment.findAll({
    where: { postId: postId },
  });
  return result;
};
