import React, { useState } from 'react';
import axios from 'axios';
import HomeNavbar from '../../../Admin/components/Navbar/HomeNavbar';
import { useNavigate } from 'react-router';

const InventoryRegister = () => {
  // State to manage form input values
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://jan-arogya-connect-backend-1.onrender.com/api/auth/inventory-register', {
        employee_id: employeeId,
        name: name,
        password: password,
      });


      setSuccess('Registration Successfull');
      //alert(success)
      navigate('/Users/Inventory/components/auth/InventoryLogin')
      setError('');
    } catch (error) {
      setError('Something went wrong');
      setSuccess('');
    }
  };

  return (
    <>
    <HomeNavbar/>
    {/* <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Inventory Register</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-green-700 font-semibold mb-2 text-left " htmlFor="employee_id">
              Employee ID
            </label>
            <input
              type="text"
              id="employee_id"
              name="employee_id"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your Employee ID"
            />
          </div>

         
          <div className="mb-4">
            <label className="block text-green-700 font-semibold mb-2 text-left" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your Name"
            />
          </div>

          
          <div className="mb-6">
            <label className="block text-green-700 font-semibold mb-2 text-left" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your Password"
            />
          </div>

         
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div> */}
    <div className="min-h-screen flex items-center justify-center bg-[#E8EAF5]">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h2 className="text-2xl font-bold text-[#0F22A2] mb-6 text-center">Inventory Register</h2>
    <form onSubmit={handleSubmit}>
      {/* Employee ID Field */}
      <div className="mb-4">
        <label className="block text-[#0F22A2] font-semibold mb-2 text-left" htmlFor="employee_id">
          Employee ID
        </label>
        <input
          type="text"
          id="employee_id"
          name="employee_id"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
          placeholder="Enter your Employee ID"
        />
      </div>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-[#0F22A2] font-semibold mb-2 text-left" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
          placeholder="Enter your Name"
        />
      </div>

      {/* Password Field */}
      <div className="mb-6">
        <label className="block text-[#0F22A2] font-semibold mb-2 text-left" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
          placeholder="Enter your Password"
        />
      </div>

      {/* Error and Success Messages */}
      {error && <p className="text-[#854C5D] text-center mb-4">{error}</p>}
      {success && <p className="text-[#659AC6] text-center mb-4">{success}</p>}

      {/* Register Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-[#4256B9] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0F22A2] focus:outline-none focus:ring-2 focus:ring-[#4256B9] focus:ring-opacity-50 w-full"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  );
}

export default InventoryRegister;
