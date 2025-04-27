const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        extras: [
            {
                title: String,
                url: String,
                description: String,
            },
        ],
    },
    { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer
