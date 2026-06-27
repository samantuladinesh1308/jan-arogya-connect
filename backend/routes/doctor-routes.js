const express = require('express');
const {getAllDoctors, addDoctor, deleteDoctor, editDoctorDetails, getDoctor, getOccupiedDoctors, freeDoctor } = require('../controllers/doctor-controller.js');
const router = express.Router();

router.get("/", getAllDoctors)
router.get("/:reg_no", getDoctor)
router.post("/add-doctor", addDoctor)
router.delete("/delete-doctor/:reg_no", deleteDoctor)
router.put("/edit-doctor/:reg_no", editDoctorDetails)
router.get('/occupied', getOccupiedDoctors);
router.put('/free/:doctorId', freeDoctor);

module.exports = router;