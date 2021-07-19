'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routes');
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
      type: DataTypes.DATE,
      validate: {
        isAfter: new Date().toLocaleDateString('fr-CA')
      }
    }
  }, {
    hooks:{
      beforeCreate : (todo, option) => {
        todo.due_date = new Date(todo.due_date).toLocaleDateString('fr-CA')
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};