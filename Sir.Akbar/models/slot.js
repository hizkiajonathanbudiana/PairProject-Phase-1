'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Slot.init({
    serviceName: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    location: DataTypes.TEXT,
    CreatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Slot',
  });
  return Slot;
};