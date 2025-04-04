const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;
const connectToDb = async () => {
    await mongoose
    .connect(mongoUri)
    .then(() => console.log('db connected.'))
    .catch((error) => console.log('error while connecting to db, ', error));
}
module.exports = {connectToDb};