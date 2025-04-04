const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
    ordersFrom: {
        type: String,
    },
    loginDetails:{
        type: String
    },
    addressDetails: {
        type: String
    },
    prodQuantity: {
        type: Number,
        default: 0
    },
    orderedProductsFromCart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "CartManagement",
        default: []
    },
    orderedProductsFromBuyNow: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "ElectronicProduct",
        default: []
    },
    totalAmountPayable: {
        type: Number
    },
    paymentMode: {
        type: String
    },
    dateTimeOfOrder: {
        type: String,
    },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);
module.exports = OrderHistory;