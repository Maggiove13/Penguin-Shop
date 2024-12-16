const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }, 
        role: {
            type: String,
            required: true,
            default: 'user'
        }
    },
    {
        timestamps: true
    },
);

module.exports = mongoose.model('User', userSchema) 