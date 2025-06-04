const { User, UserProfile, Slot, Booking } = require("../models");
const { formatDateTime } = require("../helpers/helper");
const { Op } = require('sequelize')

class ServiceController {
   static async showServiceUser(req, res) {
    try {
      const userId = req.session.userId;
      const { category, search, notification} = req.query;

      let options = {
        where: { CreatedBy: userId },
        include:[{
          model:Booking
        }],
        order: [["startTime", "DESC"]],
      };

      if (category === 'booked') options.where.isBooked = true;
      if (category === 'notbooked') options.where.isBooked = false;

      if (search) {
        options.where.serviceName = {
          [Op.iLike]: `%${search}%`, 
        };
      }

      const services = await Slot.findAll(options);
      res.render("homeClientA", { services, notification, });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  
  static async addSlotService(req, res) {
    try {
      res.render("addSlotService");
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }
  static async saveSlotService(req, res) {
    try {
      const userId = req.session.userId;
      const { serviceName, startTm, startDt, endTm, endDt, location } =
        req.body;

      let startTime = formatDateTime(startDt, startTm);
      let endTime = formatDateTime(endDt, endTm);

      await Slot.create({
        serviceName,
        startTime,
        endTime,
        location,
        CreatedBy: userId,
      });

      res.redirect("/service");
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }

  static async deleteService(req, res) {
    try {
      const { idService } = req.params;

      const slotToDelete = await Slot.findOne({
        where: {
          id: idService,
        },
      });

      if (slotToDelete.isBooked) {
        const msg = "Tidak dapat menghapus slot yang sudah dibooking.";
        return res.redirect(`/service?notification=${msg}`);
      }

      await Slot.destroy({ where: { id: idService } });
      const msg = `Success deleted service post`;
      res.redirect(`/service?notification=${msg}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = ServiceController;
