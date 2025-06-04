'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dbUserProfile = JSON.parse(await fs.readFile("./data/userprofile.json", "utf-8"));

    dbUserProfile.forEach((el) => {
      el.createdAt = el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('UserProfiles', dbUserProfile)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserProfiles', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
    })
  }
};
