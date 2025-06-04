const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get('/',Controller.showServiceUser);
router.get('/service',Controller.showServiceUser);
router.get('/service/addSlot',Controller.addSlotService);
router.post('/service/addSlot',Controller.saveSlotService)

module.exports = router;