const db = require("../models");

exports.getPost = async (postImage) => {
  const result = await db.post.findOne({
    attributes: ["title", "location", "tags", "rating", "createdAt"],
    include: [
      {
        model: db.user,
        attributes: ["name", "imageLocation"],
      },
    ],
    where: { location: postImage },
  });
  return result;
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
