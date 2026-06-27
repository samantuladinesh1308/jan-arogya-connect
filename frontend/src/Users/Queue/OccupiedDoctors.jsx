import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OccupiedDoctors = () => {
    const [occupiedDoctors, setOccupiedDoctors] = useState([]);

    useEffect(() => {
        fetchOccupiedDoctors();
    }, []);

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
        <div>
            <h2>Occupied Doctors</h2>
            <ul>
                {occupiedDoctors.map(doctor => (
                    <li key={doctor._id}>
                        {doctor.name} - {doctor.speciality}
                        <button onClick={() => freeDoctor(doctor._id)}>Free Doctor</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OccupiedDoctors;