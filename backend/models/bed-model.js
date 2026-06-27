const mongoose = require('mongoose');

// Define the Bed schema
const bedSchema = new mongoose.Schema({
    bedID: {
        type: String,
        required: true,
        unique: true// Matches 'floor number_bed number' format
    },
    patientID: {
        type: String,
        default: "null" // Can be null when bed is free
    },
    type: {
        type: String,
        required: true,
        enum: ['ER', 'ICU', 'General', 'Private'] // Example types; add more as needed
    }
});

// Create the Bed model
const Bed = mongoose.model('Bed', bedSchema);

module.exports = Bed;