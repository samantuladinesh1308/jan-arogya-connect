import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ReceptionistNavbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Perform logout logic here (clear user session, tokens, etc.)
    console.log("User logged out");

    // Navigate to login page after logout
    navigate("/Users/Receptionist/components/auth/ReceptionistLogin"); // Change '/login' to your actual login route
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-green-800 text-white">
      {/* Site Name */}
      <div className="text-lg font-bold">MySiteName</div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default ReceptionistNavbar;
