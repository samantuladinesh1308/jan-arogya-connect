const Patient = require('../models/patient-model.js')

const getAllPatients = async(req, res) => {
    try {
        const Patients = await Patient.find({}).lean(); 
        res.status(200).json(Patients);
    } catch (error) {
        console.log(error)
    }
}
const addPatient = async(req, res) => {
    try {
        const {name, patient_id, age, contact, weight, height, doc_assigned } = req.body;

        const userExist = await Patient.findOne({ patient_id: patient_id });

        if (userExist) {
            return res.status(400).json({ message: "Patient Already Exists" })
        }

        const newUser = await Patient.create({name, patient_id, age, contact, weight, height, doc_assigned })
        res.status(201).json({ message: "Registration Successful", userId: newUser._id.toString() });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error : Registration Failed" })
    }

}

const editPatientDetails = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const updateData = req.body;

        const patient = await Patient.findOneAndUpdate({ patient_id: patient_id }, updateData, { new: true });

        if (!patient) {
            return res.status(404).json({ message: "Patient Not Found" });
        }

        console.log(patient)

        res.status(200).json({ message: "Patient Details Updated Successfully", patient });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: Update Failed" });
    }
};


const deletePatient = async (req, res) => {
    try {
        const { patient_id } = req.params;

        const patient = await Patient.findOneAndDelete({ patient_id: patient_id });

        if (!patient) {
            return res.status(404).json({ message: "Patient Not Found" });
        }

        res.status(200).json({ message: "Patient Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: Deletion Failed" });
    }
};

module.exports = {getAllPatients, addPatient, editPatientDetails, deletePatient}