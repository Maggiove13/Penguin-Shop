const dotenv = require("dotenv");
const mongoose = require('mongoose')

dotenv.config();

const DB_URI = process.env.DB_URI

async function databaseConnection(){
    try {
        await mongoose.connect(DB_URI);
    } catch (error) {
        console.error("Error connecting to the MongoDb. Error:", error);
    }
}

module.exports = databaseConnection;