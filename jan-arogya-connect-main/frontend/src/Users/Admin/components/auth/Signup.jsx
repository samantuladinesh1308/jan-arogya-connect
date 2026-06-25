// import React from 'react'


// const Signup = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100">
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//       <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Admin Register</h2>
//       <form>
//          {/* Employee ID Field */}
//          <div className="mb-4">
//           <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="name">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
//             placeholder="Enter your Hospital Name"
//           />
//         </div>
//         {/* HRN Field */}
//         <div className="mb-4">
//           <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="hrn">
//             HRN Number
//           </label>
//           <input
//             type="text"
//             id="hrn"
//             name="hrn"
//             className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
//             placeholder="Enter your HRN number"
//           />
//         </div>

//         {/* address */}
//         <div className="mb-6">
//           <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="address">
//             Address
//           </label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
//             placeholder="Enter your Address"
//           />
//         </div>

//         {/* Contact Field */}
//         <div className="mb-6">
//           <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="contact">
//             Contact
//           </label>
//           <input
//             type="text"
//             id="contact"
//             name="contact"
//             className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
//             placeholder="Enter your Contact"
//           />
//         </div>

//         {/* email Field */}
//         <div className="mb-6">
//           <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="email">
//             Email
//           </label>
//           <input
//             type="text"
//             id="email"
//             name="email"
//             className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-6">
//           <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="password">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
//             placeholder="Enter your Password"
//           />
//         </div>

//         {/* Login Button */}
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#4256B9] focus:ring-opacity-50 w-full"
//           >
//             Register
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
//   )
// }

// export default Signup


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../Navbar/HomeNavbar';

const Signup = () => {
  const [name, setName] = useState('');
  const [hrn, setHrn] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://jan-arogya-connect-backend-1.onrender.com/api/auth/admin-register', {
        name,
        hrn,
        address,
        contact,
        email,
        password,
      });

      alert(response.data.message);
      navigate('/Users/Admin/components/auth/Login'); 
      
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <HomeNavbar />
      <div className="min-h-screen flex items-center justify-center bg-[#E8EAF5]  ">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#0F22A2]  mb-6 text-center">Admin Register</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#0F22A2] font-semibold mb-2 text-left" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
                placeholder="Enter your Hospital Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="hrn">
                HRN Number
              </label>
              <input
                type="text"
                id="hrn"
                name="hrn"
                className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
                placeholder="Enter your HRN number"
                value={hrn}
                onChange={(e) => setHrn(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="contact">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
                placeholder="Enter your Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#0F22A2]  font-semibold mb-2 text-left" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#4256B9] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0F22A2]  focus:outline-none focus:ring-2 focus:ring-[#4256B9] focus:ring-opacity-50 w-full"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
