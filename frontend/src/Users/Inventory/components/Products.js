import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

export default function Products() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("https://jan-arogya-connect-backend-1.onrender.com/api/inventory/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch products.");
            }

            const data = await res.json();
            setProductData(data);
            console.log("Data Retrieved:", data); // Logging the data to check structure
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`https://jan-arogya-connect-backend-1.onrender.com/api/inventory/deleteproduct/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    console.log("Product deleted");
                    getProducts(); // Refresh product list after deletion
                } else {
                    console.log("Error deleting product");
                }
            } catch (err) {
                console.log("An error occurred while deleting the product.");
                console.error(err);
            }
        }
    };

    return (
        <div className='container-fluid p-5'>
            {/* <Navbar title="IMS" ></Navbar> */}
            {/* <h1>Products Inventory</h1> */}
            
            <div className="flex gap-4">
            <div className='add_button border'>
                <NavLink to="/InvoiceForm" className='btn btn-primary fs-5'>Go to Invoice Page</NavLink>
            </div>
            {/* <div className='add_button'>
                <NavLink to="/about-inventory" className='btn btn-primary fs-5'> + Update Quantity</NavLink>
            </div> */}
            <div className='add_button'>
                <NavLink to="/insertproduct" className='btn btn-primary fs-5'> + Add New Product</NavLink>
            </div>
            </div>
            
            <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : (
                    <table className="table table-striped table-hover mt-3 fs-5">
                        <thead>
                            <tr className="tr_color">
                                <th scope="col">ID</th>
                                <th scope="col">Category</th>
                                <th scope="col">Name of Inventory</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Threshold</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Supplier Name</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productData.map((element, index) => (
                                <tr key={element._id}>
                                    <td>{index + 1}</td> 
                                    <td>{element.category}</td>
                                    <td>{element.name}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.threshold}</td>
                                    <td>{new Date(element.expiry).toLocaleDateString()}</td> 
                                    <td>{element.supplierName}</td>
                                    <td>
                                        <NavLink to={`/updateproduct/${element._id}`} className="btn btn-primary">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </NavLink>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteProduct(element._id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}