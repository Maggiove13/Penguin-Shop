const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');


dotenv.config()

exports.authorization = (req, res, next) => {
    const token = req.session.token

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, JWT_SECRET); 
        req.user = { id: decoded._id, username: decoded.username, email: decoded.email, role: decoded.role };
        next(); 
    } catch (error) {
        console.error("JWT verification failed: ", error);
        req.session.destroy();
        return res.status(403).json({ message: 'Invalid token' });
    }
};






