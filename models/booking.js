"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.models = models;
      Booking.belongsTo(models.Slot, {
        foreignKey: "slotId",
      });

      Booking.belongsTo(models.User, {
        foreignKey: "bookedBy",
      });
    }

    static async slots(userId) {
      return await Booking.findAll({
        where: { bookedBy: userId },
        include: [
          {
            model: Booking.models.Slot,
          },
        ],
      });
    }
  }
  Booking.init(
    {
      slotId: DataTypes.INTEGER,
      bookedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
