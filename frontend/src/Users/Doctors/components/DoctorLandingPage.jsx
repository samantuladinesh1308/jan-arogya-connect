import React, { useState, useEffect, useCallback } from 'react';
import SearchField from './SearchField'; // Import your SearchField component
import './DoctorList.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from './DoctorNavbar';
import axios from 'axios';

// Function to fetch doctors from the API
const fetchDoctors = async () => {
  try {
    const response = await fetch('https://jan-arogya-connect-backend-1.onrender.com/api/doctor'); // Replace with your API URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return []; // Return an empty array or handle the error as needed
  }
};

const getMatchedDoctors = (searchText, doctorList) => {
  if (!searchText) return doctorList;
  return doctorList.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

// const DoctorList = ({ list, navigateToDoctorDetails }) => (
//   <div className="doctor-carousel">
//     <div className="carousel-header">
//       <h2>Our Doctors</h2>
//     </div>
//     <div className="carousel-body">
//       {list.map((doctor, index) => (
//         <div key={index} className="doctor-card">
//           <div className="doctor-card-content">
//             <h3 className="doctor-name">{doctor.name}</h3>
//             <p className="doctor-specialization">{doctor.speciality}</p>
//           </div>
//           <div className="doctor-card-footer">
//             <button onClick={navigateToDoctorDetails} className="details-button">Details</button>
//             <button className="contact-button">Contact</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// latest commited
const DoctorList = ({ list, navigateToDoctorDetails }) =>(
  <div className="doctor-carousel overflow-hidden">
    <div className="carousel-header">
      <h2>Our Doctors</h2>
    </div>
    <div className="carousel-body ml-5">
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

// const DoctorList = ({ list, navigateToDoctorDetails }) => (
//   <div className="doctor-carousel">
//     <div className="carousel-header">
//       <h2>Our Doctors</h2>
//     </div>
//     <div className="carousel-body ml-5">
//       {list.map((doctor) => (
//         <div key={doctor.reg_no} className="doctor-card">
//           <div className="doctor-card-content">
//             <h3 className="doctor-name">{doctor.name}</h3>
//             <p className="doctor-specialization">{doctor.speciality}</p>
//           </div>
//           <div className="doctor-card-footer">
//             {/* Use the navigateToDoctorDetails prop to handle navigation */}
//             <button 
//               onClick={() => navigateToDoctorDetails(doctor._id)}
//               className="details-button"
//             >
//               Details
//             </button>
//             <button className="contact-button">Contact</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default DoctorList;


const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    reg_no: "",
    contact: "",
    year_of_reg: "",
    speciality: "",
    qualification: "",
    education: "",
    gender: "",
    dob: "",
    salary: "",
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (day, index, value) => {
    setFormData((prevData) => ({
      ...prevData,
      availability: {
        ...prevData.availability,
        [day]: prevData.availability[day].map((time, i) =>
          i === index ? value : time
        ),
      },
    }));
  };

  const addAvailabilitySlot = (day) => {
    setFormData((prevData) => ({
      ...prevData,
      availability: {
        ...prevData.availability,
        [day]: [...prevData.availability[day], ""],
      },
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post("https://jan-arogya-connect-backend-1.onrender.com/api/doctor/add-doctor", formData);
      alert("Doctor added successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving doctor data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed h-max overflow-auto p-4 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-screen overflow-auto pb-8 p-6 rounded-md shadow-md w-2/5">
        <h2 className="text-[#115e59] text-xl font-semibold mb-4">Add Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter doctor name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Reg. No:</label>
            <input
              type="text"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter registration number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter contact no."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Year of Registration:</label>
            <input
              type="text"
              name="year_of_reg"
              value={formData.year_of_reg}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter year of registration"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Speciality:</label>
            <input
              type="text"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter speciality"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Qualification:</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter qualification"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Education:</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter education"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter gender"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Salary:</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter salary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Availability:</label>
            {Object.keys(formData.availability).map((day) => (
              <div key={day} className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">{day}:</label>
                {formData.availability[day].map((slot, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={slot}
                      onChange={(e) =>
                        handleAvailabilityChange(day, index, e.target.value)
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter time slot"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addAvailabilitySlot(day)}
                  className="text-blue-500 text-sm"
                >
                  + Add Slot
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#659AC6] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-[#4256B9] text-white px-4 py-2 rounded-md ml-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Newdashboard = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [filteredDoctorList, setFilteredDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleClick = async(id) => {    
    navigate(`/doctor-profile/${id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctors = await fetchDoctors();
        setDoctorList(doctors);
        setFilteredDoctorList(doctors);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Failed to load doctors');
      }
    };
    fetchData();
  }, []);

  const onDoctorSearch = useCallback((value) => {
    const filteredDoctors = getMatchedDoctors(value, doctorList);
    setFilteredDoctorList(filteredDoctors);
  }, [doctorList]);


  const navigateToDoctorDetails = (regNo) => {
    navigate(`/doctor-profile/${regNo}`); // Use the doctor ID to navigate
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
       <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* <DoctorNavbar onDoctorSearch={onDoctorSearch}/> */}
      <nav className="flex justify-between items-center p-4 bg-green-800 text-white w-full overflow-hidden">
      {/* Website Name */}
      <div className="text-lg font-bold">
        Jan Arogya Connect
      </div>

      {/* Search Bar and Add Doctor Button */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <SearchField
          placeholder="Search doctor"
          onChange={onDoctorSearch}
        />

        {/* Add Doctor Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Doctor
        </button>
      </div>
    </nav>
      <div className="flex w-full justify-center">
        {/* <h3>Doctor Availability</h3>
        <SearchField
          placeholder="Search doctor"
          onChange={onDoctorSearch}
        /> */}
        <DoctorList 
          list={filteredDoctorList} 
          navigateToDoctorDetails={navigateToDoctorDetails} // Pass the function as a prop
        />
       
      </div>
      
    </div>
  );
};

export default Newdashboard;



// const Newdashboard = () => {
//   const [doctorList, setDoctorList] = useState([]);
//   const [filteredDoctorList, setFilteredDoctorList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const doctors = await fetchDoctors();
//         setDoctorList(doctors);
//         setFilteredDoctorList(doctors);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         setError('Failed to load doctors');
//       }
//     };
//     fetchData();
//   }, []);

//   const onDoctorSearch = useCallback((value) => {
//     const filteredDoctors = getMatchedDoctors(value, doctorList);
//     setFilteredDoctorList(filteredDoctors);
//   }, [doctorList]);

//   const navigateToDoctorDetails = () => {
//     navigate('/doctor-profile/:reg_no');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="react-search-field-demo container">
//       <div>
//         <h3>Doctor Availability</h3>
//         <SearchField
//           placeholder="Search doctor"
//           onChange={onDoctorSearch}
//         />
//         <DoctorList 
//           list={filteredDoctorList} 
//           navigateToDoctorDetails={navigateToDoctorDetails} // Pass the function as a prop
//         />
//       </div>
//     </div>
//   );
// };

// export default Newdashboard;

