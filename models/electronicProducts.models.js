const mongoose = require("mongoose");

const electronicProductSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    price: {
        type: String
    },
    ram: {
        type: String
    },
    rom: {
        type: String
    },
    freeDelivery: {
        type: Boolean,
        default: true,
    },
    returnTime: {
        type: Number,
        min: 1,
        max: 7,
        default: 7,
    },
    details: {
        type: String
    },
    productImage: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
});

const ElectronicProduct = mongoose.model("ElectronicProduct", electronicProductSchema);
module.exports = ElectronicProduct;