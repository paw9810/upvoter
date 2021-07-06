const db = require("../models");

exports.getPost = async (postId) => {
  return db.post.findOne({ where: { id: postId } });
};

exports.createPost = async (title, location, tags, rating, userId) => {
  await db.post.create({
    title: title,
    location: location,
    tags: tags,
    rating: rating,
    userId: userId,
  });
};
