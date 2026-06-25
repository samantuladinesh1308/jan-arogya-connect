import React from 'react';
import ManageQueues from '../../Queue/ManageQueues';

const DoctorsTodayCard = ({ doctors }) => {
  return (<><ManageQueues/>
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">Doctors Today</h2>
      <div className="grid grid-cols-2 gap-4">
        
      </div>
    </div>
    </>
  );
};

export default DoctorsTodayCard;
