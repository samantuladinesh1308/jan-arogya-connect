import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function InsertProduct() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [expiry, setExpiry] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !category ||
      !name ||
      quantity <= 0 ||
      threshold < 0 ||
      !expiry ||
      !supplierName
    ) {
      setError("*Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://jan-arogya-connect-backend-1.onrender.com/api/inventory/insertproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            name,
            quantity,
            threshold,
            expiry,
            supplierName,
          }),
        }
      );

      if (response.ok) {
        alert("Data Inserted");
        // Reset the form
        setCategory("");
        setName("");
        setQuantity(0);
        setThreshold(0);
        setExpiry("");
        setSupplierName("");
        navigate("/products");
      } else if (response.status === 422) {
        alert("Product is already added.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className='container-fluid p-5'>
    //     <h1 className='text-3xl font-bold'>Enter Product Information</h1>
    //     <form onSubmit={addProduct}>
    //         <div className="mt-5 col-lg-6 col-md-6 col-12">
    //             <label htmlFor="category" className="form-label fs-4 fw-bold">Category</label>
    //             <input type="text" onChange={(e) => setCategory(e.target.value)} value={category} className="form-control fs-5" id="category" placeholder="Enter Category" required />
    //         </div>
    //         <div className="mt-3 col-lg-6 col-md-6 col-12">
    //             <label htmlFor="name" className="form-label fs-4 fw-bold">Product Name</label>
    //             <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control fs-5" id="name" placeholder="Enter Product Name" required />
    //         </div>
    //         <div className="mt-3 col-lg-6 col-md-6 col-12">
    //             <label htmlFor="quantity" className="form-label fs-4 fw-bold">Quantity</label>
    //             <input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} className="form-control fs-5" id="quantity" placeholder="Enter Quantity" required />
    //         </div>
    //         <div className="mt-3 col-lg-6 col-md-6 col-12">
    //             <label htmlFor="threshold" className="form-label fs-4 fw-bold">Threshold</label>
    //             <input type="number" onChange={(e) => setThreshold(e.target.value)} value={threshold} className="form-control fs-5" id="threshold" placeholder="Enter Threshold" required />
    //         </div>
    //         <div className="mt-3 col-lg-6 col-md-6 col-12">
    //             <label htmlFor="expiry" className="form-label fs-4 fw-bold">Expiry Date</label>
    //             <input type="date" onChange={(e) => setExpiry(e.target.value)} value={expiry} className="form-control fs-5" id="expiry" required />
    //         </div>
    //         <div className="mt-3 col-lg-6 col-md-6 col-12">
    //             <label htmlFor="supplierName" className="form-label fs-4 fw-bold">Supplier Name</label>
    //             <input type="text" onChange={(e) => setSupplierName(e.target.value)} value={supplierName} className="form-control fs-5" id="supplierName" placeholder="Enter Supplier Name" required />
    //         </div>
    //         <div className='d-flex justify-content-center col-lg-6 col-md-6'>
    //             <NavLink to="/products" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
    //             <button type="submit" className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Inserting...' : 'Insert'}</button>
    //         </div>
    //         <div className="col text-center col-lg-6 ">
    //             {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
    //         </div>
    //     </form>
    // </div>
    // <div className="container-fluid p-5">
    //   <h1 className="text-3xl font-bold text-[#0F22A2] mb-6">
    //     Enter Product Information
    //   </h1>
    //   <form onSubmit={addProduct}>
    //     <div className="mt-5 col-lg-6 col-md-6 col-12">
    //       <label
    //         htmlFor="category"
    //         className="form-label text-[#0F22A2] fs-4 fw-bold"
    //       >
    //         Category
    //       </label>
    //       <input
    //         type="text"
    //         onChange={(e) => setCategory(e.target.value)}
    //         value={category}
    //         className="form-control fs-5 border-[#4256B9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
    //         id="category"
    //         placeholder="Enter Category"
    //         required
    //       />
    //     </div>
    //     <div className="mt-3 col-lg-6 col-md-6 col-12">
    //       <label
    //         htmlFor="name"
    //         className="form-label text-[#0F22A2] fs-4 fw-bold"
    //       >
    //         Product Name
    //       </label>
    //       <input
    //         type="text"
    //         onChange={(e) => setName(e.target.value)}
    //         value={name}
    //         className="form-control fs-5 border-[#4256B9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
    //         id="name"
    //         placeholder="Enter Product Name"
    //         required
    //       />
    //     </div>
    //     <div className="mt-3 col-lg-6 col-md-6 col-12">
    //       <label
    //         htmlFor="quantity"
    //         className="form-label text-[#0F22A2] fs-4 fw-bold"
    //       >
    //         Quantity
    //       </label>
    //       <input
    //         type="number"
    //         onChange={(e) => setQuantity(e.target.value)}
    //         value={quantity}
    //         className="form-control fs-5 border-[#4256B9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
    //         id="quantity"
    //         placeholder="Enter Quantity"
    //         required
    //       />
    //     </div>
    //     <div className="mt-3 col-lg-6 col-md-6 col-12">
    //       <label
    //         htmlFor="threshold"
    //         className="form-label text-[#0F22A2] fs-4 fw-bold"
    //       >
    //         Threshold
    //       </label>
    //       <input
    //         type="number"
    //         onChange={(e) => setThreshold(e.target.value)}
    //         value={threshold}
    //         className="form-control fs-5 border-[#4256B9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
    //         id="threshold"
    //         placeholder="Enter Threshold"
    //         required
    //       />
    //     </div>
    //     <div className="mt-3 col-lg-6 col-md-6 col-12">
    //       <label
    //         htmlFor="expiry"
    //         className="form-label text-[#0F22A2] fs-4 fw-bold"
    //       >
    //         Expiry Date
    //       </label>
    //       <input
    //         type="date"
    //         onChange={(e) => setExpiry(e.target.value)}
    //         value={expiry}
    //         className="form-control fs-5 border-[#4256B9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
    //         id="expiry"
    //         required
    //       />
    //     </div>
    //     <div className="mt-3 col-lg-6 col-md-6 col-12">
    //       <label
    //         htmlFor="supplierName"
    //         className="form-label text-[#0F22A2] fs-4 fw-bold"
    //       >
    //         Supplier Name
    //       </label>
    //       <input
    //         type="text"
    //         onChange={(e) => setSupplierName(e.target.value)}
    //         value={supplierName}
    //         className="form-control fs-5 border-[#4256B9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
    //         id="supplierName"
    //         placeholder="Enter Supplier Name"
    //         required
    //       />
    //     </div>
    //     <div className="d-flex justify-content-center mt-4">
    //       <NavLink
    //         to="/products"
    //         className="btn text-[#E8EAF5] bg-[#0F22A2] me-5 fs-4 rounded-md shadow-md hover:bg-[#0F22A2] transition duration-300"
    //       >
    //         Cancel
    //       </NavLink>
    //       <button
    //         type="submit"
    //         className="btn text-[#E8EAF5] bg-[#4256B9] fs-4 rounded-md shadow-md hover:bg-[#0F22A2] transition duration-300"
    //         disabled={loading}
    //       >
    //         {loading ? "Inserting..." : "Insert"}
    //       </button>
    //     </div>
    //     <div className="text-center mt-4">
    //       {error && (
    //         <div className="text-red-600 mt-3 fs-5 fw-bold">{error}</div>
    //       )}
    //     </div>
    //   </form>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#0F22A2] mb-6 text-center">
          Enter Product Information
        </h1>
        <form onSubmit={addProduct}>
          <div className="mb-4">
            <label htmlFor="category" className="block text-[#0F22A2] text-lg font-semibold mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-[#4256B9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
              placeholder="Enter Category"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#0F22A2] text-lg font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-[#4256B9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
              placeholder="Enter Product Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-[#0F22A2] text-lg font-semibold mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-[#4256B9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
              placeholder="Enter Quantity"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="threshold" className="block text-[#0F22A2] text-lg font-semibold mb-2">
              Threshold
            </label>
            <input
              type="number"
              id="threshold"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-full px-3 py-2 border border-[#4256B9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
              placeholder="Enter Threshold"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiry" className="block text-[#0F22A2] text-lg font-semibold mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              id="expiry"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full px-3 py-2 border border-[#4256B9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="supplierName" className="block text-[#0F22A2] text-lg font-semibold mb-2">
              Supplier Name
            </label>
            <input
              type="text"
              id="supplierName"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full px-3 py-2 border border-[#4256B9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4256B9] transition duration-300"
              placeholder="Enter Supplier Name"
              required
            />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <NavLink
              to="/products"
              className="btn text-white bg-[#4256B9] py-2 px-4 rounded-md shadow-md hover:bg-[#0F22A2] transition duration-300"
            >
              Cancel
            </NavLink>
            <button
              type="submit"
              className="btn text-white bg-[#4256B9] py-2 px-4 rounded-md shadow-md hover:bg-[#0F22A2] transition duration-300"
              disabled={loading}
            >
              {loading ? "Inserting..." : "Insert"}
            </button>
          </div>
          {error && (
            <div className="text-red-600 text-center mt-4 text-lg font-semibold">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
