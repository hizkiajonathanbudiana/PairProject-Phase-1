const { User, UserProfile, Slot, Booking } = require("../models");
const { formatDateTime } = require("../helpers/helper");

class SlotsController {
  static async slot(req, res) {
    try {
      const userId = req.session.userId;

      const slots = await Slot.findAll();
      const bookings = await Booking.findAll({
        where: { bookedBy: userId },
        include: [
          {
            model: Slot,
          },
        ],
      });
      // res.send(bookings)
      res.render("slotServices", { slots, bookings });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async book(req, res) {
    try {
      const { idSlot } = req.params;
      const userId = req.session.userId;


      const slot = await Slot.findOne({ where: { id: idSlot } });
      // res.send(slot.CreatedBy);
      await Slot.update({ isBooked: true }, { where: { id: idSlot } });
      await Booking.create({ slotId: idSlot, bookedBy: userId });
      // res.send(slot);
      res.redirect("/slots");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = SlotsController;
