const express = require('express');
const router = express.Router();
const { handlePatientAssignment, getDoctorQueues, handleRemovePatientFromFront } = require('../controllers/queue-controller');

router.post('/assign-patient', handlePatientAssignment);


// Route to get all doctor queues
router.get('/doctor-queues', getDoctorQueues);

// Route to remove patient from the front of a doctor's queue
router.post('/remove-patient-from-front', handleRemovePatientFromFront);

module.exports = router;