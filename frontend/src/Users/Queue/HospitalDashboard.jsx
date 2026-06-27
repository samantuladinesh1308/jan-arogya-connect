import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HospitalDashboard = () => {
    const [erPatients, setERPatients] = useState([]);
    const [occupiedDoctors, setOccupiedDoctors] = useState([]);

    useEffect(() => {
        fetchERPatients();
        fetchOccupiedDoctors();
    }, []);

    const fetchERPatients = async () => {
        try {
            const response = await axios.get('https://jan-arogya-connect-backend-1.onrender.com/api/bed/er/occupied');
            setERPatients(response.data);
        } catch (error) {
            console.error("Error fetching ER patients", error);
        }
    };

    const dischargePatient = async (bedID) => {
        try {
            await axios.put(`https://jan-arogya-connect-backend-1.onrender.com/api/bed/free/${bedID}`);
            fetchERPatients(); // Refresh the list after discharging a patient
        } catch (error) {
            console.error("Error discharging patient", error);
        }
    };

    const fetchOccupiedDoctors = async () => {
        try {
            const response = await axios.get('https://jan-arogya-connect-backend-1.onrender.com/api/doctor/occupied');
            setOccupiedDoctors(response.data);
        } catch (error) {
            console.error("Error fetching occupied doctors", error);
        }
    };

    const freeDoctor = async (doctorId) => {
        try {
            await axios.put(`https://jan-arogya-connect-backend-1.onrender.com/api/doctor/free/${doctorId}`);
            fetchOccupiedDoctors(); // Refresh the list after freeing the doctor
        } catch (error) {
            console.error("Error freeing doctor", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Emergency Ward</h2>
            <div className="flex justify-between">
                <div className="w-1/2 mr-4 bg-white p-4 rounded shadow-md">
                    <h3 className="text-xl font-bold mb-4">ER Patients</h3>
                    <ul>
                        {erPatients
                            .filter(bed => bed.patientID!="null") // Filter out beds with null patientID
                            .map(bed => (
                                <li key={bed.bedID} className="mb-2">
                                    {bed.patientID} (Bed: {bed.bedID})
                                    <button
                                        onClick={() => dischargePatient(bed.bedID)}
                                        className="ml-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                    >
                                        Discharge
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="w-1/2 bg-white p-4 rounded shadow-md">
                    <h3 className="text-xl font-bold mb-4">Occupied Doctors</h3>
                    <ul>
                        {occupiedDoctors.map(doctor => (
                            <li key={doctor._id} className="mb-2">
                                {doctor.name} - {doctor.speciality}
                                <button
                                    onClick={() => freeDoctor(doctor._id)}
                                    className="ml-2 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                >
                                    Free Doctor
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HospitalDashboard;
