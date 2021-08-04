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
      Todo.belongsTo(models.User, {foreignKey: "UserId"})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "title cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "title cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Description cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Description cannot be empty"
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: new Date().toLocaleDateString('fr-CA')
      },
      notNull: {
        args: true,
        msg: "Due date cannot be null"
      },
      notEmpty: {
        args: true,
        msg: "Due date cannot be empty"
      }
    },
    UserId: DataTypes.INTEGER,
  }, {
    hooks:{
      beforeCreate : (todo, option) => {
        todo.due_date = new Date(todo.due_date).toLocaleDateString('fr-CA')
        todo.status = "Undone"
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};