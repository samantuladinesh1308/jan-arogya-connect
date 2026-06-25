const Doctor = require('../models/doctor-model.js');

// Fetch all doctors with their details
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).lean();
    res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error: Could not retrieve doctors." });
  }
};

// Fetch a specific doctor by registration number
const getDoctor = async (req, res) => {
  try {
    const { reg_no } = req.params;
    const doctor = await Doctor.findOne({ reg_no }).lean(); // Fetch the doctor by registration number

    if (!doctor) {
      return res.status(404).json({ message: "Doctor does not exist" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new doctor to the database
const addDoctor = async (req, res) => {
  try {
    const { name, reg_no, contact, year_of_reg, speciality, qualification, education, gender, dob, salary, availability } = req.body;

    const doctorExist = await Doctor.findOne({ reg_no });

    if (doctorExist) {
      return res.status(400).json({ message: "Doctor Already Exists" });
    }

    // Create a new doctor entry with default isFree status
    const newDoctor = await Doctor.create({
      name,
      reg_no,
      contact,
      year_of_reg,
      speciality,
      qualification,
      education,
      gender,
      dob,
      salary,
      availability,
      isFree: true, // Doctors are free by default when added
    });

    res.status(201).json({ message: "Registration Successful", userId: newDoctor._id.toString() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error: Registration Failed" });
  }
};

// Edit a doctor's details
const editDoctorDetails = async (req, res) => {
  try {
    const { reg_no } = req.params;
    const updateData = req.body;

    const doctor = await Doctor.findOneAndUpdate({ reg_no }, updateData, { new: true });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor Not Found" });
    }

    res.status(200).json({ message: "Doctor Details Updated Successfully", doctor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error: Update Failed" });
  }
};

// Delete a doctor from the database
const deleteDoctor = async (req, res) => {
  try {
    const { reg_no } = req.params;

    const doctor = await Doctor.findOneAndDelete({ reg_no });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor Not Found" });
    }

    res.status(200).json({ message: "Doctor Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error: Deletion Failed" });
  }
};

// Fetch all occupied doctors
const getOccupiedDoctors = async (req, res) => {
    try {
        const currentTime = new Date(); // Get current time
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentDay = daysOfWeek[currentTime.getDay()];

        const occupiedDoctors = await Doctor.find({
            speciality: 'Emergency Medicine',
            isFree: false,
            [`availability.${currentDay}`]: { $exists: true, $ne: [] }
        }).lean();

        res.status(200).json(occupiedDoctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Free a doctor
const freeDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { isFree: true }, { new: true });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor freed successfully", doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getDoctor, getAllDoctors, addDoctor, editDoctorDetails, deleteDoctor, freeDoctor, getOccupiedDoctors};