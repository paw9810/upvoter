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
  try {
    const result = await db.comment.findAll({
      where: { postId: postId },
      attributes: [
        "id",
        "parentComment",
        "text",
        "createdAt",
        "updatedAt",
        "postId",
      ],
      include: [
        {
          model: db.user,
          attributes: ["id", "name", "imageLocation"],
        },
      ],
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
