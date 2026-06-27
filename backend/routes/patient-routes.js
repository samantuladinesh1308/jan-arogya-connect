const express = require('express');
const { getAllPatients, addPatient, deletePatient, editPatientDetails } = require('../controllers/patient-controller');
const router = express.Router();


router.get('/', getAllPatients);
router.post("/add-patient", addPatient)
router.delete("/delete-patient/:patient_id", deletePatient)
router.put("/edit-patient/:patient_id", editPatientDetails)

module.exports = router;