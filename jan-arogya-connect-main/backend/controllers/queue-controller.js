const Doctor = require('../models/doctor-model');
const DoctorQueue = require('../models/queue-model');
const Patient = require('../models/patient-model');

function isDoctorAvailable(doctor, currentTime) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[currentTime.getDay()];
  const availabilityForToday = doctor.availability[currentDay];
  if (!availabilityForToday) {
    return false;
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
      return true;
    }
  }
  return false;
}

async function getDoctorQueue(doctorId) {
  try {
    let doctorQueue = await DoctorQueue.findOne({ doctorId });
    if (!doctorQueue) {
      doctorQueue = new DoctorQueue({ doctorId });
      await doctorQueue.save();
    }
    return doctorQueue;
  } catch (error) {
    console.error('Error fetching doctor queue:', error);
    return null;
  }
}

async function addPatientToDoctorQueue(patientId, doctorId) {
  try {
    const doctorQueue = await getDoctorQueue(doctorId);
    if (doctorQueue) {
      doctorQueue.patientQueue.push(patientId);
      await doctorQueue.save();
    }
  } catch (error) {
    console.error('Error updating doctor queue:', error);
  }
}

async function findShortestQueueDoctor(availableDoctors) {
  let shortestQueueDoctor = null;
  let shortestQueueLength = Infinity;
  for (const doctor of availableDoctors) {
    const doctorQueue = await getDoctorQueue(doctor._id);
    const queueLength = doctorQueue ? doctorQueue.patientQueue.length : 0;
    if (queueLength < shortestQueueLength) {
      shortestQueueLength = queueLength;
      shortestQueueDoctor = doctor;
    }
  }
  return shortestQueueDoctor;
}

async function handlePatientAssignment(req, res) {
  const patientId = req.body.patientId;
  const currentTime = new Date();
  const { doctorName, speciality } = req.body;

  const doctors = await Doctor.find();
  if (doctorName) {
    const doctor = doctors.find(doc => doc.name === doctorName);
    if (doctor && isDoctorAvailable(doctor, currentTime)) {
      await addPatientToDoctorQueue(patientId, doctor._id);
      const response = await Patient.findOneAndUpdate(
        { patient_id: patientId },  // Query by patient_id
        { doc_assigned: doctorName }, // Update the doc_assigned field
        { new: true } // Return the updated document
    );
      console.log(response);
      res.status(200).json({ message: `Patient ${patientId} added to doctor ${doctorName}s queue.` });
    } else {
      res.status(400).json({ message: `Doctor ${doctorName} is not available or not found.` });
    }
  } else if (speciality) {
    const availableDoctors = doctors.filter(doc => doc.speciality === speciality && isDoctorAvailable(doc, currentTime));
    if (availableDoctors.length > 0) {
      const doctorWithShortestQueue = await findShortestQueueDoctor(availableDoctors);
      if (doctorWithShortestQueue) {
        await addPatientToDoctorQueue(patientId, doctorWithShortestQueue._id);
        res.status(200).json({ message: `Patient ${patientId} added to queue of ${doctorWithShortestQueue.name}` });
      } else {
        res.status(400).json({ message: `No available doctors with speciality ${speciality}.` });
      }
    } else {
      res.status(400).json({ message: `No available doctors with speciality ${speciality}.` });
    }
  } else {
    res.status(400).json({ message: 'Patient did not provide a doctor name or speciality.' });
  }
}


async function removePatientFromFrontOfQueue(doctorId) {
    try {
      const doctorQueue = await DoctorQueue.findOne({ doctorId });
      if (doctorQueue && doctorQueue.patientQueue.length > 0) {
        const patientId = doctorQueue.patientQueue.shift(); // Remove the first patient
        await doctorQueue.save();
        return patientId;
      }
      return null;
    } catch (error) {
      console.error('Error updating doctor queue:', error);
      return null;
    }
  }

  async function getDoctorQueues(req, res) {
    try {
      const doctorQueues = await DoctorQueue.find({});
      res.status(200).json(doctorQueues);
    } catch (error) {
      console.error('Error fetching doctor queues:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async function handleRemovePatientFromFront(req, res) {
    const { doctorId } = req.body;

    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID is required.' });
    }

    const patientId = await removePatientFromFrontOfQueue(doctorId);
    if (patientId) {
      res.status(200).json({ message: `Patient ${patientId} removed from the front of doctor ${doctorId}'s queue.` });
    } else {
      res.status(400).json({ message: `No patients found in doctor ${doctorId}'s queue.` });
    }
  }


module.exports = { handlePatientAssignment, getDoctorQueues, handleRemovePatientFromFront};