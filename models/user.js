'use strict';
const {hash} = require('../helper/bcrypt.js')
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
      User.hasMany(models.Todo , {foreignKey : 'UserId'})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate (user){
        user.password = hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};