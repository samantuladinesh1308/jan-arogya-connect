import React, { useState, useEffect, useCallback } from 'react';
import SearchField from './SearchField';
import { useNavigate } from 'react-router-dom';

const DoctorNavbar = ({ onSearch, onAddDoctor }) => {

    const [doctorList, setDoctorList] = useState([]);
    const [filteredDoctorList, setFilteredDoctorList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getMatchedDoctors = (searchText, doctorList) => {
        if (!searchText) return doctorList;
        return doctorList.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchText.toLowerCase())
        );
      };
      
  

    const DoctorList = ({ list, navigateToDoctorDetails }) => (
        <div className="doctor-carousel">
          <div className="carousel-header">
            <h2>Our Doctors</h2>
          </div>
          <div className="carousel-body">
            {list.map((doctor) => (
              <div key={doctor.reg_no} className="doctor-card">
                <div className="doctor-card-content">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialization">{doctor.speciality}</p>
                </div>
                <div className="doctor-card-footer">
                  <button 
                    onClick={() => navigateToDoctorDetails(doctor.reg_no)} // Pass the doctor ID
                    className="details-button"
                  >
                    Details
                  </button>
                  <button className="contact-button">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    const onDoctorSearch = useCallback((value) => {
        const filteredDoctors = getMatchedDoctors(value, doctorList);
        setFilteredDoctorList(filteredDoctors);
      }, [doctorList]);
      

  return (
    <nav className="flex justify-between items-center p-4 bg-[#4256B9] text-white w-full overflow-hidden">
      {/* Website Name */}
      <div className="text-lg font-bold">
        Jan Arogya Connect
      </div>

      {/* Search Bar and Add Doctor Button */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <SearchField
          placeholder="Search doctor"
          onChange={onSearch}
        />

        {/* Add Doctor Button */}
        <button
          onClick={onAddDoctor}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Doctor
        </button>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
