import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dashboard from '../img/dashboard.png'
import doctor from '../img/doctor.png'
import inventory from '../img/inventory.png'

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dashboardRef = useRef(null);
  const navigate = useNavigate();

  const toggleDashboard = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  
  const handleLogout = () => {
    // Clear user authentication data (e.g., remove JWT token)
    localStorage.removeItem('token'); // Adjust this based on where your token is stored

    // Redirect to login page
    navigate('/Users/Admin/components/auth/Login');
  };


  // const navigateToDoctor = () => {
  //   // Clear user authentication data (e.g., remove JWT token)
  //   // localStorage.removeItem('token'); // Adjust this based on where your token is stored

  //   // Redirect to login page
  //   navigate('/Users/Doctors/components/DoctorLandingPage');
  // };

  return (
 
    <div>
    <nav className="bg-[#4256B9] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Jan Arogya Connect</h1>
        <button
            onClick={toggleDashboard}
            className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200"
          >
            <img 
              src={dashboard}  // Replace with your image path
              alt="Open Dashboard"
              className="w-6 h-6" // Adjust the size of the image
            />
          </button>
        {/* <button
          onClick={toggleDashboard}
          className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200"
        >
          Open Dashboard
        </button> */}
      </div>
    </nav>

    <div
      ref={dashboardRef}
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-[#0F22A2]">Visit...</h2>
        <ul>
          <li className="mb-2  flex items-center">
          <img 
                src={doctor} // Replace with your image path
                alt="Doctor"
                className="w-4 h-4 mr-2" // Adjust the size of the icon
              />
            <Link
              to="/Users/Doctors/components/DoctorLandingPage"
              className="text-[#0F22A2] hover:underline"
              onClick={() => setIsOpen(false)} // Close dashboard on click
            >
              Doctor
            </Link>
          </li>
          <li className="mb-2 flex items-center">
          <img 
                src={inventory} // Replace with your image path
                alt="Doctor"
                className="w-4 h-4 mr-2" // Adjust the size of the icon
              />
            <Link
              to="/products"
              className="text-[#0F22A2] hover:underline"
              onClick={() => setIsOpen(false)} // Close dashboard on click
            >
              Inventory
            </Link>
          </li>
          <li className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-16 py-2 rounded hover:bg-red-700 w-full text-left"
              >
                Logout
              </button>
            </li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default AdminNavbar;
