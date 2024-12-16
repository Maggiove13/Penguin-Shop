const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config();

const DB_URI = process.env.MONGO_URI;

async function databaseConnection() {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error("Error connecting to the MongoDb. Error:", error);
    }
}

module.exports = databaseConnection;