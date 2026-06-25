// import React from 'react'

// const Login = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100">
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//       <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Admin Login</h2>
//       <form>
//         {/* Employee ID Field */}
//         <div className="mb-4">
//           <label className="block text-green-700 font-semibold mb-2 text-left" htmlFor="email">
//             Email ID
//           </label>
//           <input
//             type="text"
//             id="email"
//             name="email"
//             className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             placeholder="Enter your Email ID"
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-6">
//           <label className="block text-green-700 font-semibold mb-2 text-left" htmlFor="password">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             placeholder="Enter your Password"
//           />
//         </div>

//         {/* Login Button */}
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full"
//           >
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
//   )
// }

// export default Login


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../Navbar/HomeNavbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://jan-arogya-connect-backend-1.onrender.com/api/auth/admin-login",
        { email, password }
      );

      if (response.status===200) {
        // Handle successful login, store token, and redirect to home page
        localStorage.setItem("token", response.data.token); // Assuming token is returned
        navigate("/Users/Admin/components/Admin"); // Update to the correct path
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <HomeNavbar />
      {/* <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Admin Login
          </h2>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-green-700 font-semibold mb-2 text-left"
                htmlFor="email"
              >
                Email ID
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-green-700 font-semibold mb-2 text-left"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div> */}
      <div className="min-h-screen flex items-center justify-center bg-[#E8EAF5]">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h2 className="text-2xl font-bold text-[#0F22A2] mb-6 text-center">
      Admin Login
    </h2>
    {error && (
      <div className="text-[#854C5D] text-center mb-4">{error}</div>
    )}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-[#0F22A2] font-semibold mb-2 text-left"
          htmlFor="email"
        >
          Email ID
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-[#BBC4E8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4256B9]"
          placeholder="Enter your Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-[#0F22A2] font-semibold mb-2 text-left"
          htmlFor="password"
        >
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
          Login
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  );
};

export default Login;
