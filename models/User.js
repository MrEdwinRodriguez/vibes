const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {type: String, enum: ['Inactive', 'Active'], default: "Active"}, 
    is_admin: {type: Boolean, default: false},
    reset_password_token: {type: String, default: null},
    reset_password_expires: {type: Date, default: null},
    last_login: {type: Date, default: null},
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
