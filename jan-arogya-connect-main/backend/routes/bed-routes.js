const express = require('express');
const { getOccupiedERBeds, dischargePatient, handleEmergencyPatient} = require('../controllers/bed-controller.js');
const router = express.Router();

router.get('/er/occupied', getOccupiedERBeds);
router.put('/free/:bedID', dischargePatient);
router.put('/emergency-patient', handleEmergencyPatient);

module.exports = router;