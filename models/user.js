"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserProfile, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Please Input username" },
          notEmpty: { msg: "Please Input username" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Input your email" },
          notEmpty: { msg: "Please Input your email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please Input your password" },
          notEmpty: { msg: "Please Input your password" },
          len: {
            args: [6],
            msg: "Password must be at least 6 characters long",
          },
          checkSpace(value) {
            if (/\s/.test(value)) {
              throw new Error("Password must not contain spaces");
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please select Role" },
          notEmpty: { msg: "Please select Role" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          const salt = 10;
          const hash = await bcrypt.hash(user.password, salt);
          user.password = hash;
        },
      },
    }
  );
  return User;
};
