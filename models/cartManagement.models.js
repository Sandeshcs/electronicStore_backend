const mongoose = require("mongoose");

const cartManagementSchema = new mongoose.Schema({
    productInCart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ElectronicProduct"
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const CartManagement = mongoose.model("CartManagement", cartManagementSchema);
module.exports = CartManagement;