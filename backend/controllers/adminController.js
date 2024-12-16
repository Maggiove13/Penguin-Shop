const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config()


exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password not provided', message: err.message });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: 'Email doesent`t exists'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid Password'});
        }
        
        const JWT_SECRET = process.env.JWT_SECRET;
        const tokenPayload = { userId: user._id, username: user.username, email: user.email, role: user.role };

        const token = jwt.sign( tokenPayload, JWT_SECRET, { expiresIn: '3h' } );
        req.session.token = token;

        console.log("The token created is:", token);
        
        res.redirect('/login/dashboard');

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: error.message });
    }
};



exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out', message: err.message });
        }
        res.clearCookie('session_id');
        res.redirect('/login');
    });
};


exports.getDashboard = (req, res) => {
    res.render('dashboard', { username: req.user.username });
};


exports.renderLoginPage = async (req, res) => {
    res.render('login');
}

exports.renderIndexPage = async (req, res) => {
    res.render('index');
}