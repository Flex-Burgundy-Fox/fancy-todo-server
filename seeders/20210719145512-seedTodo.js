'use strict';
const fs = require('fs')
let todos = JSON.parse(fs.readFileSync('./databases/todos.json', { encoding: 'utf-8' }))
todos = todos.map(todo => {
  return {
    ...todo,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', todos, {})
    await queryInterface.sequelize.query(`
    SELECT setval('"Todos_id_seq"' , (SELECT MAX(id) FROM "Todos"))`)
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
    await queryInterface.bulkDelete('Todos')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
