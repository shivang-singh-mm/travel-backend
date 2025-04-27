const mongoose = require('mongoose');

const ItineraryItemSchema = new mongoose.Schema({
    title: String,
    details: String,
});

const Form4ItemSchema = new mongoose.Schema({
    name: String,
    input1: String,
    input2: String,
});

const PackageSchema = new mongoose.Schema({
    title1: String,
    title2: String,
    description1: String,
    image1: String, // Will store base64 or URL

    images: [String], // Section 2 multiple images
    description2: String,
    placesCovered: String,
    travelTip: String,

    itineraryItems: [ItineraryItemSchema], // Itinerary section

    form4Items: [Form4ItemSchema], // Destination, Duration, Price

    inclusionList: [String], // Inclusions
    specialAttentionList: [String], // Special Attention
}, { timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);
