import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const BillingForm = () => {
    const [category, setCategory] = useState('');
    const [inventoryName, setInventoryName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate()
    const fetchProduct = async () => {
        const response = await fetch(`https://jan-arogya-connect-backend-1.onrender.com/api/inventory/products?category=${category}&name=${inventoryName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching product: ${response.statusText}`);
        }

        const product = await response.json();
        return product;
    };

    const updateProductQuantity = async (productId, updatedQuantity) => {
        const updateResponse = await fetch(`https://jan-arogya-connect-backend-1.onrender.com/api/inventory/updateproduct/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: updatedQuantity }),
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to update product quantity.');
        }

        return updateResponse;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting billing form...');

        try {
            console.log('Fetching product...');
            const product = await fetchProduct();
            console.log('Product fetched:', product);

            console.log(product[0].name);
            console.log(product[0].category);
            console.log(product[0]._id);

            // if (!product || !product._id) {
            //     alert('Product not found.');
            //     return;
            // }

            const quantityInt = parseInt(quantity, 10);
            if (isNaN(quantityInt)) {
                alert('Please enter a valid quantity.');
                return;
            }

            if (product.quantity < quantityInt) {
                alert('Not enough quantity in stock.');
                return;
            }

            const updatedQuantity = product[0].quantity - quantityInt;
            console.log('Updating product quantity to:', updatedQuantity);

            await updateProductQuantity(product[0]._id, updatedQuantity);
            alert('Product quantity updated successfully.');

            // Reset form
            setCategory('');
            setInventoryName('');
            setQuantity(0);
            setPrice(0);
            setPhoneNumber('');

            navigate('/products')
        } catch (error) {
            console.error('Error during billing process:', error.message || error);
            alert('Error generating bill. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Medicine Billing Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="inventoryName" className="block text-sm font-medium text-gray-700">Inventory Name</label>
                    <input
                        type="text"
                        id="inventoryName"
                        name="inventoryName"
                        value={inventoryName}
                        onChange={(e) => setInventoryName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Threshold</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                    Update Quantity
                </button>
            </form>
        </div>
    );
};

export default BillingForm;