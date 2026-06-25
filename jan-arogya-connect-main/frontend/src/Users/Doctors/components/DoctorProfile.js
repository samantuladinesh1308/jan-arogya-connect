import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DoctorProfile = () => {
  const { reg_no } = useParams(); // Extract reg_no from the URL
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctor/${reg_no}`);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [reg_no]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-3/5 justify-center my-16 mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="flex">
        {/* Left Section: Photo */}
        <div className="w-2/5 bg-green-200 flex items-center justify-center">
          <img
            className="w-24 h-24 rounded-full border-2 border-green-400"
            src="https://via.placeholder.com/100"
            alt="Doctor Profile"
          />
        </div>

        {/* Right Section: Information */}
        <div className="w-3/5 p-4">
          <h2 className="text-xl font-bold text-green-800">{doctor.name}</h2>
          <p className="text-green-600">{doctor.speciality}</p>
          <div className="mt-4">
            <h3 className="text-green-700 font-semibold">Contact Information</h3>
            <p className="text-green-600">Phone: {doctor.contact}</p>
            <p className="text-green-600">Registration Number: {doctor.reg_no}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-green-700 font-semibold">Experience</h3>
            <p className="text-green-600">{2024 - doctor.year_of_reg}+ Years</p>
          </div>
          <div className="mt-4">
            <h3 className="text-green-700 font-semibold">Education</h3>
            <p className="text-green-600">{doctor.education}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
