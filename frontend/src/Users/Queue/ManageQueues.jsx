import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageQueues = () => {
  const [queues, setQueues] = useState([]);
  const [doctors, setDoctors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await axios.get('https://jan-arogya-connect-backend-1.onrender.com/api/queue/doctor-queues');
        setQueues(response.data);
      } catch (error) {
        console.error('Error fetching queues:', error);
        setMessage('Error fetching queues.');
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://jan-arogya-connect-backend-1.onrender.com/api/doctor/');
        const doctorList = response.data.reduce((acc, doctor) => {
          acc[doctor._id] = doctor.name; // Assuming reg_no is the doctorId
          return acc;
        }, {});
        setDoctors(doctorList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setMessage('Error fetching doctors.');
      }
    };

    fetchQueues();
    fetchDoctors();
  }, []);

  const handleRemovePatient = async (doctorId) => {
    try {
      const response = await axios.post('https://jan-arogya-connect-backend-1.onrender.com/api/queue/remove-patient-from-front', { doctorId });
      setMessage(response.data.message);
      // Update the queue list after removal
      const updatedQueues = queues.map(queue => {
        if (queue.doctorId === doctorId) {
          const newQueue = { ...queue, patientQueue: queue.patientQueue.slice(1) };
          return newQueue;
        }
        return queue;
      });
      setQueues(updatedQueues);
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {queues.length > 0 ? (
        <ul className="space-y-4">
          {queues.map(queue => (
            <li key={queue.doctorId} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold text-green-600">
                Doctor: {doctors[queue.doctorId] || 'Unknown'}
              </h2>
              <ul className="mb-2 space-y-1">
                {queue.patientQueue.length > 0 ? (
                  queue.patientQueue.map((patientId, index) => (
                    <li key={index} className="text-md text-gray-700">
                      {patientId}
                    </li>
                  ))
                ) : (
                  <li className="text-md text-gray-700">No patients in queue</li>
                )}
              </ul>
              <button
                onClick={() => handleRemovePatient(queue.doctorId)}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Remove Patient from Front
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-700 text-center">No queues available.</p>
      )}
      {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
    </div>
  );
};

export default ManageQueues;
