const { User, Profile, Slot, Booking } = require("../models");
const { formatDateTime } = require('../helpers/helper');

class ControllerServiceUser {
    static async showServiceUser(req, res) {
        try {
            const dbSlotUser = await Slot.findAll()

            res.render('serviceUserPg', { dbSlotUser });
        } catch (error) {
            console.log(error);

            res.send(error);
        }
    }
    static async addSlotService(req, res) {
        try {
            res.render('addSlotService')
        } catch (error) {
            console.log(error);

            res.send(error);
        }
    }
    static async saveSlotService(req, res) {
        try {
            const { serviceName, startTm, startDt, endTm, endDt, location } = req.body;

            let startTime = formatDateTime(startDt,startTm);
            let endTime = formatDateTime(endDt,endTm);

            
            await Slot.create({ serviceName, startTime, endTime, location });

            res.redirect('/service')
        } catch (error) {
            console.log(error);

            res.send(error);
        }
    }
}

module.exports = ControllerServiceUser;