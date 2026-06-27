const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    patient_id : {
        type : String,
        require : true
    },
    age: {
        type: Number,
        require: false
    },
    contact: {
        type: Number,
        require: false
    },
    weight : {
        type : Number,
        require: false
    },
    height: {
        type: Number,
        require: false
    },
    doc_assigned : {
        type : String,
        default : null
    },
    speciality : {
        type : String,
        default : "General",
        require: false
    }
})


const patient = new mongoose.model("Patient", patientSchema);

module.exports = patient;