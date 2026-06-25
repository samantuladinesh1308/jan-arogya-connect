const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    threshold: {
        type: Number,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    supplierName: {
        type: String,
        required: true,
    },
});

const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;