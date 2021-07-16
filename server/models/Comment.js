const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      parentComment: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "post",
          key: "id",
        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "comment",
    }
  );

  return Comment;
};
