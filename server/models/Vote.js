const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {}

  Vote.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      voteType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "user",
      //     key: "id",
      //   },
      // },
      // postId: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "post",
      //     key: "id",
      //   },
      // },
    },
    {
      sequelize,
      modelName: "vote",
    }
  );

  return Vote;
};
