const db = require("../models");

exports.addComment = async (parentId, userId, postId, text) => {
  try {
    await db.comment.create({
      parentComment: parentId,
      hasChildren: false,
      text: text,
      postId: postId,
      userId: userId,
    });

    if (parentId !== null) {
      await db.comment.update(
        { hasChildren: true },
        { where: { id: parentId } }
      );
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.getTopComments = async (postId) => {
  try {
    const result = await db.comment.findAll({
      where: { postId: postId, parentComment: null },
      attributes: [
        "id",
        "parentComment",
        "hasChildren",
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
      attributes: [
        "id",
        "parentComment",
        "hasChildren",
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
      order: [["createdAt", "ASC"]],
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteChildren = async (parentId) => {
  try {
    const children = await db.comment.findAll({
      where: { parentComment: parentId },
    });
    children.forEach(async (child) => {
      if (child.hasChildren === true) {
        await deleteChildren(child.id);
      }
      child.destroy();
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteComment = async (commentId, tokenId) => {
  try {
    const comment = await db.comment.findOne({ where: { id: commentId } });
    if (tokenId === comment.userId) {
      if (comment.hasChildren === true) {
        await deleteChildren(comment.id);
      }
      await comment.destroy();
    } else {
      throw new Error("unauthorized");
    }
  } catch (err) {
    throw new Error(err);
  }
};
