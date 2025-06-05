"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slot.belongsTo(models.User, {
        foreignKey: "CreatedBy",
      });

      Slot.hasMany(models.Booking, {
        foreignKey: "slotId",
      });
    }

   

    
    get formatStartTime (){
      return  new Date(this.startTime).toLocaleString();

    }

    get formatEndTime (){
      return new Date(this.endTime).toLocaleString()
    }
  }
  Slot.init(
    {
      serviceName: DataTypes.STRING,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      location: DataTypes.TEXT,
      CreatedBy: DataTypes.INTEGER,
      isBooked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Slot",
      hooks: {
        beforeCreate: (slot) => {
          slot.isBooked = false;
        },
      },
    }
  );
  return Slot;
};
