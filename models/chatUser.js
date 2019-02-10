const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        minlength: 8,
        trim: true,
        required: true,
        unique: true,
        validate: {
            // add a validator call
        }
    },
    password: {
        type: String,
        minlength: 8,
        trim: true,
        required: true,
        unique: false
    },
    email: {
        type: String,
		minlength: 1,
		trim: true,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Override toJSON method
