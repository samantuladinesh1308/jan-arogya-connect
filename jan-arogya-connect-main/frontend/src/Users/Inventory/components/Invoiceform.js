import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const [client, setClient] = useState("");
  const [number, setNumber] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  //   const [status, setStatus] = useState("draft");
  const [date, setDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [items, setItems] = useState([
    {
      inventoryName: "",
      category: "",
      quantity: 0,
      threshold: 0,
      supplier: "",
      total: 0,
    },
  ]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    // Calculate the sub total whenever items change
    const newSubTotal = items.reduce(
      (acc, item) => acc + parseFloat(item.total || 0),
      0
    );
    setSubTotal(newSubTotal.toFixed(2));
  }, [items]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Calculate total for each item (if needed, adjust logic as necessary)
    if (field === "quantity" || field === "threshold") {
      newItems[index].total = (
        newItems[index].quantity * newItems[index].threshold
      ).toFixed(2);
    }

    setItems(newItems);
    calculateSubTotal(newItems);
  };

  const calculateSubTotal = (items) => {
    const newSubTotal = items.reduce(
      (acc, item) => acc + parseFloat(item.total || 0),
      0
    );
    setSubTotal(newSubTotal.toFixed(2));
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        inventoryName: "",
        category: "",
        quantity: 0,
        threshold: 0,
        supplier: "",
        total: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      calculateSubTotal(newItems);
    }
  };

  const navigate = useNavigate();

  const handleGenerateInvoice = () => {
    // Check if all required fields are filled
    const allFieldsFilled =
      client.trim() !== "" &&
      items.every(
        (item) => item.item.trim() !== "" && item.quantity > 0 && item.price > 0
      );

    if (allFieldsFilled) {
      alert("Invoice Generated");
      navigate("/products");
    } else {
      alert("Please fill all required fields");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://jan-arogya-connect-backend-1.onrender.com/api/inventory/products?category=${items.category}&name=${items.inventoryName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.statusText}`);
      }

      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error in fetchProducts:", error.message || error);
      throw error; // Re-throw the error to be caught in the calling function
    }
  };

  const updateProductQuantity = async (productId, updatedQuantity) => {
    try {
      const updateResponse = await fetch(
        `https://jan-arogya-connect-backend-1.onrender.com/api/inventory/updateproduct/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: updatedQuantity }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(
          `Failed to update product quantity: ${updateResponse.statusText}`
        );
      }

      // const updatedProduct = await updateResponse.json(); // Optional: Retrieve updated product data if needed
      // return updatedProduct; // Return updated product data

      return updateResponse;
    } catch (error) {
      console.error("Error in updateProductQuantity:", error.message || error);
      throw error; // Re-throw the error to be caught in the calling function
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting billing form...");

    try {
      // Fetch products data
      console.log("Fetching products...");
      const products = await fetchProducts(); // Adjust this if the fetchProducts function returns a different structure
      console.log("Products fetched:", products);

      // Process each item
      for (const item of items) {
        // Find the corresponding product from the fetched data
        const product = products.find(
          (p) => p.name === item.inventoryName && p.category === item.category
        );

        if (!product) {
          alert(
            `Product with name "${item.inventoryName}" and category "${item.category}" not found.`
          );
          return;
        }

        const quantityInt = parseInt(item.quantity, 10);
        if (isNaN(quantityInt)) {
          alert(
            `Please enter a valid quantity for item "${item.inventoryName}".`
          );
          return;
        }

        if (product.quantity < quantityInt) {
          alert(
            `Not enough quantity in stock for item "${item.inventoryName}".`
          );
          return;
        }

        const updatedQuantity = product.quantity - quantityInt;
        console.log(
          `Updating product quantity for "${item.inventoryName}" to:`,
          updatedQuantity
        );

        await updateProductQuantity(product._id, updatedQuantity);
        alert(
          `Product quantity for "${item.inventoryName}" updated successfully.`
        );
      }

      // Reset form
      setItems([
        {
          inventoryName: "",
          category: "",
          quantity: 0,
          threshold: 0,
          supplier: "",
          total: 0,
        },
      ]);

      navigate("/products");
    } catch (error) {
      console.error("Error during billing process:", error.message || error);
      alert("Error generating bill. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-4 p-4 border rounded shadow-sm">
        {/* <nav className="flex justify-center items-center p-3 mb-8">
          <div className="text-center text-blue-500 font-bold text-2xl">
            Billing Invoice
          </div>
        </nav> */}
        <nav className="flex justify-between items-center p-3 mb-8">
          <a href="/products" className="flex items-center">
            <img src="/go-back.png" alt="Back" className="w-6 h-6" />
          </a>
          <div className="text-center text-blue-500 font-bold text-2xl flex-1">
            Billing Invoice
          </div>
        </nav>

        <div className="invoice-form flex flex-wrap gap-5 mb-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
              <span className="text-red-500 text-xs">*</span> Client:
              {/* Star for required field */}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
              <span className="text-red-500 text-xs">*</span> Invoice Number:
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
              <span className="text-red-500 text-xs">*</span> Year:
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          {/* <div className="flex-1 min-w-[150px]">
          <label className="block mb-1">Status:</label>
          <select
            value={status}
            className="w-full border rounded p-2"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
          </select>
        </div> */}
        </div>

        <div className="invoice-form flex flex-wrap gap-5 mb-12 ">
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
              <span className="text-red-500 text-xs">*</span>
              Date:
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
              <span className="text-red-500 text-xs">*</span>
              Expiry Date:
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-center font-bold text-xl mb-4">Invoice Items</h3>
          {items.map((item, index) => (
            <div key={index} className="flex flex-wrap gap-4 mb-2">
              <div className="flex-1 min-w-[150px]">
                <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
                  Item/Inventory Name:
                </label>
                <input
                  type="text"
                  value={item.inventoryName}
                  onChange={(e) =>
                    handleItemChange(index, "inventoryName", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
                  Category:
                </label>
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) =>
                    handleItemChange(index, "category", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={item.quantity}
                  min={0}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
                  Threshold:
                </label>
                <input
                  type="number"
                  value={item.threshold}
                  min={0}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "threshold",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
                  Supplier:
                </label>
                <input
                  type="text"
                  value={item.supplier}
                  onChange={(e) =>
                    handleItemChange(index, "supplier", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block mb-1 text-gray-700 font-medium text-sm pb-0.5">
                  Total:
                </label>
                <input
                  type="number"
                  value={item.total}
                  readOnly
                  className="w-full border border-gray-300 rounded p-1 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className=" text-white py-1 px-2 rounded mt-4 border"
                >
                  {/* Remove Item */}
                  <img src="/delete-red.png" alt="Remove" className="w-5 h-5" />
                  {/* <span>Remove Item</span> */}
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 mt-3 "
          >
            Add Item
          </button>
          <div className="">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-bold mr-2">Sub Total:</span>
                <span>${subTotal}</span>
              </div>
              <button
                type="button"
                onClick={handleGenerateInvoice}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 mt-3 "
              >
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 mt-3 mb-4"
        >
          Update Quantity
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
