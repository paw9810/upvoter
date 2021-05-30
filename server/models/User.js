const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.TEXT,
      },
      karma: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageLocation: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "defaultImage.png",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  User.associate = (models) => {
    User.hasMany(models.post, {
      foreignKey: {
        allowNull: false,
      },
    });
    User.belongsToMany(models.post, { through: models.vote });
  };

  return User;
};
