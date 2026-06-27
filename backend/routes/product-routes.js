const express = require('express');
const router = express.Router();
const products = require('../models/product-model');

// Inserting (Creating) Data
router.post("/insertproduct", async (req, res) => {
    const { category, name, quantity, threshold, expiry, supplierName } = req.body;

    try {
        const pre = await products.findOne({ name: name });
        if (pre) {
            return res.status(422).json("Product is already added.");
        }
        const addProduct = new products({ category, name, quantity, threshold, expiry, supplierName });
        await addProduct.save();
        res.status(201).json(addProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

// Checking Unique Combination
router.post('/checkUniqueCombination', async (req, res) => {
    const { category, inventoryName } = req.body;

    try {
        const product = await products.findOne({ category, name: inventoryName });
        if (product) {
            return res.status(200).json({ isUnique: false });
        }
        res.status(200).json({ isUnique: true });
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

// Updating Inventory Quantity
router.put('/updateInventory', async (req, res) => {
    const { inventoryName, quantity } = req.body;

    try {
        const product = await products.findOneAndUpdate(
            { name: inventoryName },
            { $inc: { quantity: quantity } }, // Increment or decrement quantity
            { new: true }
        );
        if (!product) return res.status(404).json("Product not found.");
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

// Getting (Reading) Data
router.get('/products', async (req, res) => {
    try {
        const getProducts = await products.find({});
        res.status(200).json(getProducts);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

// Getting (Reading) individual Data
router.get('/products/:id', async (req, res) => {
    try {
        const getProduct = await products.findById(req.params.id);
        if (!getProduct) return res.status(404).json("Product not found.");
        res.status(200).json(getProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

// Editing (Updating) Data
router.put('/updateproduct/:id', async (req, res) => {
    const { category, name, quantity, threshold, expiry, supplierName } = req.body;

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { category, name, quantity, threshold, expiry, supplierName }, { new: true });
        if (!updateProducts) return res.status(404).json("Product not found.");
        res.status(200).json(updateProducts);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

// Deleting Data
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        if (!deleteProduct) return res.status(404).json("Product not found.");
        res.status(200).json(deleteProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
});

// router.put('/updateproduct/:id', async (req, res) => {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     try {
//         const product = await Products.findByIdAndUpdate(
//             id,
//             { quantity },
//             { new: true } // Return the updated product
//         );

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         return res.status(200).json({ message: 'Product quantity updated', product });
//     } catch (error) {
//         console.error('Error updating product quantity:', error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

// Generate bill
router.post('/generateBill', async (req, res) => {
    const { category, inventoryName, quantity, price, total } = req.body;

    const newBill = new Bill({
        category,
        inventoryName,
        quantity,
        price,
        total,
        createdAt: new Date(),
    });

    try {
        await newBill.save();
        return res.status(201).json({ message: 'Bill generated successfully', bill: newBill });
    } catch (error) {
        console.error('Error generating bill:', error);
        return res.status(500).json({ message: 'Error generating bill' });
    }
});

// Send bill (example endpoint, you need to implement the actual sending logic)
router.post('/sendBill', async (req, res) => {
    const { phoneNumber, billData } = req.body;

    try {
        // Here you would implement your logic to send the bill, e.g., via SMS or email
        console.log(`Sending bill to ${phoneNumber}:`, billData);
        return res.status(200).json({ message: 'Bill sent successfully' });
    } catch (error) {
        console.error('Error sending bill:', error);
        return res.status(500).json({ message: 'Error sending bill' });
    }
});


module.exports = router;