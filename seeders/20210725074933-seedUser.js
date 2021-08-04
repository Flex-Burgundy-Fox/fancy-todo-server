'use strict';
const { hashPassword } = require("../helpers/hash");
const fs = require('fs')

let users = JSON.parse(fs.readFileSync('./databases/users.json', { encoding: 'utf-8' }))
users = users.map(user => {
  return {
    email: user.email,
    password: hashPassword(user.password),
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', users, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"Users_id_seq"' , (SELECT MAX(id) FROM "Users"))`)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
