'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require("../helpers/hash");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email has been used",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Email format is not correct",
        },
        notNull: {
          args: true,
          msg: "Email can not be null",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Password at least have 6 characters",
        },
        notNull: {
          args: true,
          msg: "Password can not be null",
        },
      },
    },
  },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, opt) => {
          const hashedPassword = hashPassword(user.password);
          user.password = hashedPassword;
        },
      },
    });
  return User;
};