
import Admin from "./Users/Admin/components/Admin";
import ReceptionistLogin from "./Users/Receptionist/components/auth/ReceptionistLogin";
import Login from "./Users/Admin/components/auth/Login";
import Signup from "./Users/Admin/components/auth/Signup";
import HomeNavbar from "./Users/Admin/components/Navbar/HomeNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryLogin from "./Users/Inventory/components/auth/InventoryLogin";
import DoctorProfile from "./Users/Doctors/components/DoctorProfile.js"
import ReceptionistDashboard from "./Users/Receptionist/components/ReceptionistDashboard";
import ManageQueues from "./Users/Queue/ManageQueues";
import PatientAssignment from "./Users/Queue/PatientAssignment";


import MainLandingPage from "./MainLandingPage";
import InventoryRegister from "./Users/Inventory/components/auth/InventoryRegister";
import ReceptionistRegister from "./Users/Receptionist/components/auth/ReceptionistRegister";

import ERPatients from "./Users/Queue/ERPatients";
import OccupiedDoctors from "./Users/Queue/OccupiedDoctors";
import Newdashboard from "./Users/Doctors/components/DoctorLandingPage.jsx";
import InventoryHome from "./Users/Inventory/components/InventoryHome";

import HospitalDashboard from "./Users/Queue/HospitalDashboard.jsx"


import Products from "./Users/Inventory/components/Products";
import InsertProduct from "./Users/Inventory/components/InsertProduct";
import UpdateProduct from "./Users/Inventory/components/UpdateProduct";
import About from "./Users/Inventory/components/About";

import "./App.css";
import InvoiceForm from "./Users/Inventory/components/Invoiceform.js";



function App() {
  return (
    <Router>
      <div className="App">
        {/* <HomeNavbar /> */}
        <Routes >
          <Route path="/" element={<MainLandingPage/>}/>
          <Route path="Users/Admin/components/auth/Login" element={<Login/>}/>
          <Route path="Users/Admin/components/Admin" element={<Admin/>}/>
          <Route path="Users/Admin/components/auth/Signup" element={<Signup/>}/>
          <Route path="Users/Inventory/components/auth/InventoryLogin" element={<InventoryLogin/>}/>
          <Route path="Users/Receptionist/components/auth/ReceptionistLogin" element={<ReceptionistLogin/>}/>
          <Route path="/inventory-home" element={<InventoryHome/>}/>
          <Route path="Users/Inventory/components/auth/InventoryRegister" element={<InventoryRegister/>}/>
          <Route path="Users/Receptionist/components/auth/ReceptionistRegister" element={<ReceptionistRegister/>}/>
          <Route path="/receptionist-dashboard" element={<ReceptionistDashboard/>}/>
          <Route path="/doctor-profile/:reg_no" element={<DoctorProfile/>} />
          <Route path="/Users/Doctors/components/DoctorLandingPage" element={<Newdashboard/>}/>
          <Route path="/products" element={<Products />} />
          <Route path="/insertproduct" element={<InsertProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="about-inventory" element={<About/>} />
          <Route path="InvoiceForm" element={<InvoiceForm/>}/>
        </Routes>
        {/* <Admin />
        <ReceptionistLogin />
        <Login />
        <Signup /> */}


        {/* <HospitalDashboard/> */}

      </div>
    </Router>
  );
}

export default App;
