const Bed = require('../models/bed-model');
const Doctor = require('../models/doctor-model');

// Helper function to check if a doctor is available at the current time
const isDoctorAvailable = (doctor, currentTime) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[currentTime.getDay()];
    const availabilityForToday = doctor.availability[currentDay];

    if (!availabilityForToday) {
        return false; // No availability for today
    }

    for (const timeSlot of availabilityForToday) {
        const [startTime, endTime] = timeSlot.split("-");
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        const startDateTime = new Date(currentTime);
        startDateTime.setHours(startHour, startMinute, 0, 0);

        const endDateTime = new Date(currentTime);
        endDateTime.setHours(endHour, endMinute, 0, 0);

        if (currentTime >= startDateTime && currentTime <= endDateTime) {
            return true; // Doctor is available in the current time slot
        }
    }

    return false; // Doctor is not available at the current time
};

// Function to handle emergency patient arrival
const handleEmergencyPatient = async (req, res) => {
    try {
        console.log(req.body.patientId);
        var pid=req.body.patientId;
        const currentTime = new Date(); // Get the current time

        // Step 1: Check for available ER beds
        const availableBed = await Bed.findOne({  patientID: null || "null" });

        if (!availableBed) {
            return res.status(404).json({ message: "No ER bed available. Please refer the patient to another hospital." });
        }

        // Step 2: Check for available "Emergency Medicine" doctors
        const doctors = await Doctor.find({ speciality: 'Emergency Medicine' });

        // Find a doctor who is available at the current time and is free
        const availableDoctor = doctors.find(doctor => 
            isDoctorAvailable(doctor, currentTime) && doctor.isFree
        );

        if (!availableDoctor) {
            return res.status(404).json({ message: "No available Emergency Medicine doctor. Please refer the patient to another hospital." });
        }

        // Step 3: Assign the patient to the bed and mark the doctor as busy
        console.log(pid);
        console.log("hehe");
        availableBed.patientID = pid;
        await availableBed.save();

        availableDoctor.isFree = false;
        await availableDoctor.save();

        res.status(200).json({ message: "Patient assigned to bed and doctor successfully.", bedID: availableBed.bedID, doctorID: availableDoctor._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fetch all occupied ER beds
const getOccupiedERBeds = async (req, res) => {
    try {
        const occupiedBeds = await Bed.find({ type: 'ER', patientID: { $ne: null } }).lean();
        res.status(200).json(occupiedBeds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Discharge a patient and free a bed
const dischargePatient = async (req, res) => {
    try {
        const { bedID } = req.params;
        const bed = await Bed.findOneAndUpdate({ bedID }, { patientID: null }, { new: true });

        if (!bed) {
            return res.status(404).json({ message: "Bed not found" });
        }

        res.status(200).json({ message: "Patient discharged and bed freed successfully", bed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { handleEmergencyPatient, getOccupiedERBeds, dischargePatient };