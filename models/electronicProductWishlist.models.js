const mongoose = require("mongoose");

const electronicWishlistSchema = new mongoose.Schema({
    productsInWishlist: {
        type: mongoose.Schema.Types.ObjectId, ref: "ElectronicProduct"
    }
});

const ElectronicWishlist = mongoose.model("ElectronicWishlist", electronicWishlistSchema);
module.exports = ElectronicWishlist;