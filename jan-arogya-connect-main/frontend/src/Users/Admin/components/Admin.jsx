import React from 'react'
import AdminNavbar from './Navbar/AdminNavbar'
import BedInfoCard from './BedInfoCards'
import DoctorsTodayCard from './DoctorsTodayCard'


const Admin = () => {
  return (
    <div className="bg-green-100 min-h-screen">
    {/* Navbar */}
    <AdminNavbar />

    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-8 space-y-8 md:space-y-0 md:space-x-8">
      {/* First Column: Bed Information Card */}
      <div className="md:w-1/2 w-full">
        <BedInfoCard totalBeds={100} availableBeds={60} occupiedBeds={40} />
      </div>

      {/* Second Column: Doctors Today Card */}
      <div className="md:w-1/2 w-full">
        <DoctorsTodayCard
          doctors={[
            { time: '09:00 AM', name: 'Dr. Smith' },
            { time: '10:30 AM', name: 'Dr. Johnson' },
            { time: '12:00 PM', name: 'Dr. Brown' },
            { time: '02:00 PM', name: 'Dr. Taylor' },
          ]}
        />
      </div>
    </div>
  </div>
  )
}

export default Admin
