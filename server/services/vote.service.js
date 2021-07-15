const db = require("../models");

exports.isAlreadyVoted = async (userId, postId) => {
  try {
    const result = await db.vote.findOne({
      where: { postId: postId, userId: userId },
    });
    if (result !== null) {
      return {
        voteType: result.voteType,
        voteId: result.id,
      };
    } else {
      return {
        voteType: null,
        voteId: null,
      };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createVote = async (voteType, userId, postId) => {
  await db.vote.create({
    voteType: voteType,
    userId: userId,
    postId: postId,
  });

  const post = await db.post.findOne({ where: { id: postId } });
  if (voteType === "up") {
    await post.increment("rating");
  } else if (voteType === "down") {
    await post.decrement("rating");
  }
  const refreshed = await post.reload();
  return refreshed.rating;
};

exports.updateVote = async (voteType, voteId, postId) => {
  await db.vote.update({ voteType: voteType }, { where: { id: voteId } });
  const post = await db.post.findOne({ where: { id: postId } });
  if (voteType === "up") {
    await post.increment("rating", { by: 2 });
  } else if (voteType === "down") {
    await post.decrement("rating", { by: 2 });
  }
  const refreshed = await post.reload();
  return refreshed.rating;
};
