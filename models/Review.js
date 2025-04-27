const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    review: { type: String, required: true },
    star_number: { type: Number, required: true },
    url: { type: String }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
