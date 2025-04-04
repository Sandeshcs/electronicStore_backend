const mongoose = require("mongoose");

const errorCheckingSchema = new mongoose.Schema({
    name:{
        type: String
    },
    phone: {
        type: Number
    }
});

const ErrorChecking = mongoose.model("ErrorChecking", errorCheckingSchema);
module.exports = ErrorChecking;