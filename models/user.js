'use strict';
const { hashingPassword } = require('../helpers/bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: "UserId" })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email has been used"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Email format is not correct"
        },
        notNull: {
          args: true,
          msg: "Email can not be null"
        },
        notEmpty: {
          args: true,
          msg: "Email can not be null"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "Password at least have 8 character"
        },
        notNull: {
          args: true,
          msg: "Password can not be null"
        },
        notEmpty: {
          args: true,
          msg: "Password can not be null"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    const hashedPassword = hashingPassword(user.password)
    user.password = hashedPassword
  })

  return User;
};