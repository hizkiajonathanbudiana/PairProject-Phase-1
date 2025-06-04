'use strict';
const fs = require('fs').promises;
const bcrypt = require('bcryptjs');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dbUser = JSON.parse(await fs.readFile("./data/user.json", "utf-8"));

    const salt = 10
    
    for (let el of dbUser) {
      el.password = await bcrypt.hash(el.password, salt); 
      el.createdAt = el.updatedAt = new Date();
    }

    await queryInterface.bulkInsert('Users', dbUser)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    })
  }
};
