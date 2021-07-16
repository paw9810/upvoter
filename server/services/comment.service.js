const db = require("../models");

exports.addComment = async (parentId, userId, postId, text) => {
  await db.comment.create({
    parentComment: parentId,
    text: text,
    postId: postId,
    userId: userId,
  });
};

exports.getTopComments = async (postId) => {
  try {
    const result = await db.comment.findAll({
      where: { postId: postId, parentComment: null },
      attributes: ["id", "text", "createdAt", "updatedAt", "postId"],
      include: [
        {
          model: db.user,
          attributes: ["id", "name", "imageLocation"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getChildComments = async (postId, parentComment) => {
  try {
    const result = await db.comment.findAll({
      where: { postId: postId, parentComment: parentComment },
      attributes: ["id", "text", "createdAt", "updatedAt", "postId"],
      include: [
        {
          model: db.user,
          attributes: ["id", "name", "imageLocation"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
