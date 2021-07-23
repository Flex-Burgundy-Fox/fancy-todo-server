'use strict';
const moment = require("moment")

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
      Todo.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title can not be null"
        },
        notEmpty: {
          args: true,
          msg: "Title can not be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Description can not be null"
        },
        notEmpty: {
          args: true,
          msg: "Description can not be empty"
        }
      }
    },
    status: {
      type: DataTypes.ENUM("Not Done", "Done"),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Status can not be null"
        },
        notEmpty: {
          args: true,
          msg: "Status can not be empty"
        },
        isIn: {
          args: [["Not Done", "Done"]],
          msg: "Status must between 'Not Done' or 'Done'"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Due date can not be null"
        },
        notEmpty: {
          args: true,
          msg: "Due date can not be empty"
        },
        isAfter: {
          args: new Date().toLocaleString().slice(0, 9),
          msg: "Only allow today's date or the date after this"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "UserId can not be null"
        },
        notEmpty: {
          args: true,
          msg: "UserId can not be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((todo, options) => {
    let title = todo.title.split(" ")
    title = title.map((el) => el[0].toUpperCase() + el.slice(1))
    todo.title = title.join(" ")

    let description = todo.description[0].toUpperCase() + todo.description.slice(1)
    todo.description = description
  })

  return Todo;
};