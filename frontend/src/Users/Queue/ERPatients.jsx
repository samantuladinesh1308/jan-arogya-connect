import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ERPatients = () => {
    const [erPatients, setERPatients] = useState([]);

    useEffect(() => {
        fetchERPatients();
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

    return (
        <div>
            <h2>ER Patients</h2>
            <ul>
                {erPatients.map(bed => (
                    <li key={bed.bedID}>
                        {bed.patientID} (Bed: {bed.bedID})
                        <button onClick={() => dischargePatient(bed.bedID)}>Discharge</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ERPatients;