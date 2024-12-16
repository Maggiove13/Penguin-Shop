const express = require("express");
const dotenv = require("dotenv");
const createAdmin = require("./controllers/Admin");
const router = require("./routes/routes");
const path = require('path');
const databaseConnection = require("./config/config");
const session = require("express-session");
const MongoStore = require('connect-mongo');
dotenv.config();

const app = express();

// Config pug for engine 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});