const mongoose = require('mongoose');
const { Schema } = mongoose;

const ThemeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image_url: {
        type: String,
        required: true
    },
    package_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Theme', ThemeSchema);
