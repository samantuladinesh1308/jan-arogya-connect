import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination, useGlobalFilter, useFilters } from "react-table";
import axios from "axios";
import ManageQueues from "../../Queue/ManageQueues";
import HospitalDashboard from "../../Queue/HospitalDashboard";

// Custom filter UI component
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
    const count = preGlobalFilteredRows.length;
  
    return (
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder={'Search patients'}
        className="border border-[#115e59] px-4 py-2 mb-4 w-2/5 float-left"
      />
    );
  };
  

// Custom table component
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    preGlobalFilteredRows,
    state: { globalFilter },
  } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <div>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table className="w-full border border-[#115e59] border-separate border-spacing-0" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-[#115e59] text-white border-b border-[#115e59]"
              role={headerGroup.role}
              style={headerGroup.style}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className="border-r border-dashed border-[#115e59] px-4 py-2"
                  role={column.role}
                  style={column.style}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                className="border-b border-dashed border-[#115e59] bg-white"
                role={row.role}
                style={row.style}
              >
                {row.cells.map((cell) => (
                  <td
                    key={cell.column.id}
                    className="border-r border-dashed border-[#115e59] px-4 py-2"
                    role={cell.role}
                    style={cell.style}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-[#115e59] text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-[#115e59] text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

  
const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    patient_id: "",
    age: "",
    contact: "",
    weight: "",
    height: "",
    specialization: "",  // Changed from "doc_assigned"
    preferred_doctor: "", // Added for "Preferred Doctor Name"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (req,res) => {
    try {
      
      await axios.post("https://jan-arogya-connect-backend-1.onrender.com/api/patient/add-patient", formData);
      if(formData.specialization!='Emergency Medicine'){
        try {
          const payload = {
            patientId: formData.patient_id,  // correct to match backend
            doctorName: formData.preferred_doctor,  // correct to match backend
            speciality: formData.specialization,  // correct to match backend
        };
          const response = await axios.post('https://jan-arogya-connect-backend-1.onrender.com/api/queue/assign-patient', payload);
          //console.log(response.data.message);
          console.log('success');
        } catch (error) {
          console.log(error.response.data.message || 'An error occurred');
        }
      }
      else{
        
      }
      
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-[#115e59] text-xl font-semibold mb-4">Add Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter patient name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Patient ID:</label>
            <input
              type="text"
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter patient ID"
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
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Age:</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Height:</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter height"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Weight:</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter weight"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Specialization (Optional):</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter specialization"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Preferred Doctor Name (Optional):</label>
            <input
              type="text"
              name="preferred_doctor"
              value={formData.preferred_doctor}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter preferred doctor name"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#115e59] text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md ml-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


function ReceptionistDashboard() {
  const [patientNumber, setPatientNumber] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Patient Information",
        columns: [
          {
            Header: "S.NO",
            accessor: (row, i) => i + patientNumber,
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Patient ID",
            accessor: "patient_id",
          },
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Contact",
            accessor: "contact",
          },
          {
            Header: "Weight",
            accessor: "weight",
          },
          {
            Header: "Height",
            accessor: "height",
          },
          {
            Header: "Doctor Assigned",
            accessor: "doc_assigned",
          },
        ],
      },
    ],
    [patientNumber]
  );

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://jan-arogya-connect-backend-1.onrender.com/api/patient");
        setData(response.data);
        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (loadingData) {
      getData();
    }
  }, [loadingData]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // return (
  //   <div className="p-4">
  //     <div className="flex justify-between mb-4">
  //       <h1 className="text-2xl font-bold">Receptionist Dashboard</h1>
  //       <button
  //         className="bg-[#115e59] text-white px-4 py-2 rounded-md"
  //         onClick={handleOpenModal}
  //       >
  //         Add Patient
  //       </button>
  //     </div>
  //     {loadingData ? (
  //       <p>Loading data...</p>
  //     ) : (
  //       <Table columns={columns} data={data} />
  //     )}
  //     <Modal
  //       isOpen={isModalOpen}
  //       onClose={handleCloseModal}
  //     />
  //   </div>
  // );

  return (
    <div className="Dashboard">
      <h1 className="text-2xl font-medium text-[#115e59] mb-2">Receptionist Dashboard</h1>

      <div className="flex justify-between items-center mb-4 space-x-4">
        <div className="border border-[#115e59] p-4 rounded-md flex-1">
          <h3 className="text-lg font-medium text-[#115e59] mb-2">
            Bed Availability
          </h3>
          <p className="text-gray-700">Total beds: 85</p>
          <p className="text-gray-700">Occupied beds: 65</p>
          <p className="text-gray-700">Available beds: 20</p>
        </div>
        <div className="border border-[#115e59] p-4 rounded-md flex-1">
          <h3 className="text-lg font-medium text-[#115e59] mb-2">
            Today's Doctor
          </h3>
          <ManageQueues/>
        </div>
      </div>

      <div className="patientDetails border border-[#115e59] bg-white p-6 mb-4 rounded-md">
        <div className="header flex justify-between items-center mb-4">
          <h3 className="text-[#115e59] text-xl font-semibold">
            Patient Details
          </h3>
          <button
            className="bg-[#115e59] text-white px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Add Patient
          </button>
        </div>

        <div className="Footer">
          {loadingData ? (
            <p>Loading...</p>
          ) : (
            <Table columns={columns} data={data} />
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>

      {/* <div className="OtherHospitals border border-[#115e59] rounded-md">
        <h3>This shows the Real-Time Update of Other Hospitals</h3>
      </div> */}
      <HospitalDashboard/>
    </div>
  );
}

export default ReceptionistDashboard;