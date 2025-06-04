'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dbBooking = JSON.parse(await fs.readFile("./data/booking.json", "utf-8"));

    dbBooking.forEach((el) => {
      el.createdAt = el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Bookings', dbBooking)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    })
  }
};
