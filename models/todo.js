'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.STRING,
      validate: {
        isAfter: new Date().toString()
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  }),
  Todo.beforeCreate(async(user, options) => {
    user.due_date = user.due_date.toString().split('T')[0]
    user.status = ''
  })
  return Todo;
};