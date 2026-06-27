const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reg_no: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    year_of_reg: {
        type: Number,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    availability: {
        Monday: {
            type: [String],
            default: []
        },
        Tuesday: {
            type: [String],
            default: []
        },
        Wednesday: {
            type: [String],
            default: []
        },
        Thursday: {
            type: [String],
            default: []
        },
        Friday: {
            type: [String],
            default: []
        },
        Saturday: {
            type: [String],
            default: []
        },
        Sunday: {
            type: [String],
            default: []
        }
    },
    isFree: {
        type: Boolean,
        default: true,
        required: false // Default value can be set to true or false based on your requirement
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;