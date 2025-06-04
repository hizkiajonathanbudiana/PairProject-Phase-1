'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dbSlot = JSON.parse(await fs.readFile("./data/slot.json", "utf-8"));

    dbSlot.forEach((el) => {
      el.createdAt = el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Slots', dbSlot)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Slots', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    })

  }
};
