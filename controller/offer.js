const Offer = require("../models/Offer");
const log = require("../config/logger");

exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().sort({ createdAt: -1 });
        log("info", "Fetched all offers", req, 200);
        // console.log(offers, "")
        res.json(offers);
    } catch (error) {
        log("error", "Error fetching offers", req, 500, error);
        res.status(500).json({ error: "Error fetching offers" });
    }
};


exports.getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ error: "Offer not found" });
        }
        log("info", `Fetched offer with ID: ${req.params.id}`, req, 200);
        res.json(offer);
    } catch (error) {
        log("error", "Error fetching offer by ID", req, 500, error);
        res.status(500).json({ error: "Error fetching offer" });
    }
};



exports.createOffer = async (req, res) => {
    const {
        title,
        description,
        title1,
        url1,
        description1,
        title2,
        url2,
        description2,
        title3,
        url3,
        description3,
    } = req.body;

    try {
        console.log(req.body)
        const newOffer = new Offer({
            title,
            description,
            extras: [
                { title: title1, url: url1, description: description1 },
                { title: title2, url: url2, description: description2 },
                { title: title3, url: url3, description: description3 },
            ].filter(item => item.title || item.url || item.description),
        });

        const savedOffer = await newOffer.save();
        log("info", `Created offer with ID: ${savedOffer._id}`, req, 201);
        res.status(201).json(savedOffer);
    } catch (error) {
        log("error", "Error creating offer", req, 500, error);
        res.status(500).json({ error: "Error creating offer" });
    }
};

exports.deleteOffer = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Offer.findByIdAndDelete(id);

        if (!deleted) {
            log("warn", `Offer with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Offer not found" });
        }

        log("info", `Deleted offer with ID: ${id}`, req, 200);
        res.json({ message: "Offer deleted" });
    } catch (error) {
        log("error", `Error deleting offer with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error deleting offer" });
    }
};


exports.updateOffer = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        title1,
        url1,
        description1,
        title2,
        url2,
        description2,
        title3,
        url3,
        description3,
    } = req.body;

    try {
        const updatedOffer = await Offer.findByIdAndUpdate(
            id,
            {
                title,
                description,
                extras: [
                    { title: title1, url: url1, description: description1 },
                    { title: title2, url: url2, description: description2 },
                    { title: title3, url: url3, description: description3 },
                ].filter(item => item.title || item.url || item.description),
            },
            { new: true } // Return the updated document
        );

        if (!updatedOffer) {
            log("warn", `Offer with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Offer not found" });
        }

        log("info", `Updated offer with ID: ${id}`, req, 200);
        res.json(updatedOffer);
    } catch (error) {
        log("error", `Error updating offer with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating offer" });
    }
};
