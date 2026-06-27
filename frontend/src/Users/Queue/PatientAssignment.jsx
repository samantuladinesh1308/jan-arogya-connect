import React, { useState } from 'react';
import axios from 'axios';

const PatientAssignment = ({ patientId, doctorName, speciality }) => {
//   const [patientId, setPatientId] = useState('');
//   const [doctorName, setDoctorName] = useState('');
//   const [speciality, setspeciality] = useState('');
   const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://jan-arogya-connect-backend-1.onrender.com/api/queue/assign-patient', { patientId, doctorName, speciality });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <></>
    // <div>
    //   <h1>Assign Patient</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Patient ID:</label>
    //       <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
    //     </div>
    //     <div>
    //       <label>Doctor Name (optional):</label>
    //       <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>speciality (optional):</label>
    //       <input type="text" value={speciality} onChange={(e) => setspeciality(e.target.value)} />
    //     </div>
    //     <button type="submit">Submit</button>
    //   </form>
    //   {/* {message && <p>{message}</p>} */}
    // </div>
  );
};

export default PatientAssignment;