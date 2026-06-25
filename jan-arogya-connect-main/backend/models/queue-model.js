const mongoose = require('mongoose');

// Define the DoctorQueue schema
const DoctorQueueSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
    unique: true
  },
  patientQueue: {
    type: [String],  // Array of patient IDs
    default: []
  }
});


// Create a model for DoctorQueue
const DoctorQueue = mongoose.model('DoctorQueue', DoctorQueueSchema);
module.exports = DoctorQueue;