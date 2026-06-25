

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const HomeNavbar = () => {
//   const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
//   const [isRegisterDropdownOpen, setIsRegisterDropdownOpen] = useState(false);
//   const location = useLocation();

//   // Close dropdowns on route change
//   useEffect(() => {
//     setIsLoginDropdownOpen(false);
//     setIsRegisterDropdownOpen(false);
//   }, [location]);

//   // Handle dropdown toggles
//   const handleLoginDropdownToggle = () => {
//     setIsLoginDropdownOpen(!isLoginDropdownOpen);
//   };

//   const handleRegisterDropdownToggle = () => {
//     setIsRegisterDropdownOpen(!isRegisterDropdownOpen);
//   };

//   // Close dropdowns if clicking outside (optional)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (event.target.closest('.dropdown') === null) {
//         setIsLoginDropdownOpen(false);
//         setIsRegisterDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="bg-[#4256B9] p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white font-bold text-xl">
//           <Link to="/">Jan Aarogya Connect</Link>
//         </div>
//         <div className="space-x-4 flex items-center">
//           {/* Register Dropdown */}
//           <div className="relative inline-block text-left dropdown">
//             <button
//               onClick={handleRegisterDropdownToggle}
//               className="bg-white text-[#4256B9] font-semibold py-2 px-4 rounded-md hover:bg-[#E8EAF5] hover:text-[#0F22A2] transition duration-300"
//             >
//               Register
//             </button>
//             <div
//               className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${isRegisterDropdownOpen ? 'block' : 'hidden'}`}
//             >
//               <div className="py-1">
//                 <Link
//                   to="/Users/Admin/components/auth/Signup"
//                   className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
//                   onClick={() => setIsRegisterDropdownOpen(false)} // Close dropdown on click
//                 >
//                   Admin
//                 </Link>
//                 <Link
//                   to="/Users/Receptionist/components/auth/ReceptionistRegister"
//                   className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
//                   onClick={() => setIsRegisterDropdownOpen(false)} // Close dropdown on click
//                 >
//                   Receptionist
//                 </Link>
//                 <Link
//                   to="/Users/Inventory/components/auth/InventoryRegister"
//                   className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
//                   onClick={() => setIsRegisterDropdownOpen(false)} // Close dropdown on click
//                 >
//                   Inventory
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Login Dropdown */}
//           <div className="relative inline-block text-left dropdown">
//             <button
//               onClick={handleLoginDropdownToggle}
//               className="bg-white text-[#4256B9] font-semibold py-2 px-4 rounded-md hover:bg-[#E8EAF5] hover:text-[#0F22A2] transition duration-300"
//             >
//               Login
//             </button>
//             <div
//               className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${isLoginDropdownOpen ? 'block' : 'hidden'}`}
//             >
//               <div className="py-1">
//                 <Link
//                   to="/Users/Admin/components/auth/Login"
//                   className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
//                   onClick={() => setIsLoginDropdownOpen(false)} // Close dropdown on click
//                 >
//                   Admin
//                 </Link>
//                 <Link
//                   to="/Users/Receptionist/components/auth/ReceptionistLogin"
//                   className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
//                   onClick={() => setIsLoginDropdownOpen(false)} // Close dropdown on click
//                 >
//                   Receptionist
//                 </Link>
//                 <Link
//                   to="/Users/Inventory/components/auth/InventoryLogin"
//                   className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
//                   onClick={() => setIsLoginDropdownOpen(false)} // Close dropdown on click
//                 >
//                   Inventory
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default HomeNavbar;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HomeNavbar = () => {
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isRegisterDropdownOpen, setIsRegisterDropdownOpen] = useState(false);
  const location = useLocation();

  // Close dropdowns on route change
  useEffect(() => {
    setIsLoginDropdownOpen(false);
    setIsRegisterDropdownOpen(false);
  }, [location]);

  // Handle dropdown toggles
  const handleLoginDropdownToggle = () => {
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
    if (isRegisterDropdownOpen) {
      setIsRegisterDropdownOpen(false); // Close Register dropdown when Login is toggled
    }
  };

  const handleRegisterDropdownToggle = () => {
    setIsRegisterDropdownOpen(!isRegisterDropdownOpen);
    if (isLoginDropdownOpen) {
      setIsLoginDropdownOpen(false); // Close Login dropdown when Register is toggled
    }
  };

  // Close dropdowns if clicking outside (optional)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.dropdown') === null) {
        setIsLoginDropdownOpen(false);
        setIsRegisterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#4256B9] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">Jan Aarogya Connect</Link>
        </div>
        <div className="space-x-4 flex items-center">
          {/* Register Dropdown */}
          <div className="relative inline-block text-left dropdown">
            <button
              onClick={handleRegisterDropdownToggle}
              className="bg-white text-[#4256B9] font-semibold py-2 px-4 rounded-md hover:bg-[#E8EAF5] hover:text-[#0F22A2] transition duration-300"
            >
              Register
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${isRegisterDropdownOpen ? 'block' : 'hidden'}`}
            >
              <div className="py-1">
                <Link
                  to="/Users/Admin/components/auth/Signup"
                  className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
                  onClick={() => setIsRegisterDropdownOpen(false)} // Close dropdown on click
                >
                  Admin
                </Link>
                <Link
                  to="/Users/Receptionist/components/auth/ReceptionistRegister"
                  className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
                  onClick={() => setIsRegisterDropdownOpen(false)} // Close dropdown on click
                >
                  Receptionist
                </Link>
                <Link
                  to="/Users/Inventory/components/auth/InventoryRegister"
                  className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
                  onClick={() => setIsRegisterDropdownOpen(false)} // Close dropdown on click
                >
                  Inventory
                </Link>
              </div>
            </div>
          </div>

          {/* Login Dropdown */}
          <div className="relative inline-block text-left dropdown">
            <button
              onClick={handleLoginDropdownToggle}
              className="bg-white text-[#4256B9] font-semibold py-2 px-4 rounded-md hover:bg-[#E8EAF5] hover:text-[#0F22A2] transition duration-300"
            >
              Login
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${isLoginDropdownOpen ? 'block' : 'hidden'}`}
            >
              <div className="py-1">
                <Link
                  to="/Users/Admin/components/auth/Login"
                  className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
                  onClick={() => setIsLoginDropdownOpen(false)} // Close dropdown on click
                >
                  Admin
                </Link>
                <Link
                  to="/Users/Receptionist/components/auth/ReceptionistLogin"
                  className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
                  onClick={() => setIsLoginDropdownOpen(false)} // Close dropdown on click
                >
                  Receptionist
                </Link>
                <Link
                  to="/Users/Inventory/components/auth/InventoryLogin"
                  className="block px-4 py-2 text-sm text-[#0F22A2] hover:bg-[#BBC4E8]"
                  onClick={() => setIsLoginDropdownOpen(false)} // Close dropdown on click
                >
                  Inventory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
