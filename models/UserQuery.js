const mongoose = require('mongoose');

const userQuerySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    number: {
        type: String,
    },
    adults: {
        type: Number,
    },
    childs: {
        type: Number,
    },
    destination: {
        type: String,
    },
    description: {
        type: String,
    }
}, { timestamps: true });

const UserQuery = mongoose.model('UserQuery', userQuerySchema);

module.exports = UserQuery;
