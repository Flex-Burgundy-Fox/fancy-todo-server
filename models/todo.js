'use strict';
const moment = require('moment')

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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title can not be null",
        },
        notEmpty: {
          args: true,
          msg: "Title can not be empty",
        },
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Description can not be null",
        },
        notEmpty: {
          args: true,
          msg: "Description can not be empty",
        },
      },
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Status can not be null",
        },
        notEmpty: {
          args: true,
          msg: "Status can not be empty",
        },
        isIn: {
          args: [["Open", "Closed"]],
          msg: "Status must be either 'Open' or 'Closed'",
        },
      },
    },

    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Date can not be null",
        },
        notEmpty: {
          args: true,
          msg: "Date can not be empty",
        },
        isAfter: {
          args: moment().subtract(1, 'days').format(),
          msg: "Date must be greater than or equals to current date",
        },
      },
    },

    UserId: {
      type: DataTypes.INTEGER,
    }

  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};