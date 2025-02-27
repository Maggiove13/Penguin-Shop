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

// Call the function to connect to the MongoDB
databaseConnection().then(async () => {
    await createAdmin(); 
}).catch(err => {
    console.error('Error creating the admin', err);
});

//Config to read json
app.use(express.json());
//Config to process html requests
app.use(express.urlencoded({extended: true}));
// Config to handle the routes of images or css files
app.use(express.static(path.join(__dirname, 'public')));

// Config express-session
app.use(session({
    key: "session_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

//Config the router
app.use(router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});