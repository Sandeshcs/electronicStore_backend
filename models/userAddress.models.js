const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    phNo:{
        type: Number,
        required: true
    },
    pincode:{
        type: Number,
        required: true 
    },
    locality:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cityDistrictTown: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    alternatePhNo: {
        type: Number
    },
    selected: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const UserAddress = mongoose.model("UserAddress", userAddressSchema);
module.exports = UserAddress;