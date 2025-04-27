const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image_url: String,
}, { timestamps: true });

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery
