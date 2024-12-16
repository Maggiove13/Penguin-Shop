const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config()

const CreateAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
        const existingUser = await User.findOne({ email: adminEmail });
        if (existingUser) {
            console.log('Admin user already exists');
            return;
        }

        const passwordHashed = await bcrypt.hash(adminPassword, 10);
        const adminUser = await User.create({
            username: 'Paula',
            email: adminEmail,
            password: passwordHashed,
            role: 'admin'
        });

        console.log('Admin user created successfully', adminUser);

    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

module.exports = CreateAdmin;
