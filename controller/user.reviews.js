const Review = require("../models/Review");
const log = require("../config/logger");

// GET all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ _id: -1 });
        log("info", "Fetched all reviews", req, 200);
        res.json(reviews);
    } catch (error) {
        log("error", "Error fetching reviews", req, 500, error);
        res.status(500).json({ error: "Error fetching reviews" });
    }
};

// GET a single review by ID
exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);

        if (!review) {
            log("warn", `Review with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Review not found" });
        }

        log("info", `Fetched review with ID: ${id}`, req, 200);
        res.json(review);
    } catch (error) {
        log("error", `Error fetching review with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching review" });
    }
};

// CREATE a new review
exports.createReview = async (req, res) => {
    const { name, occupation, review, star_number, url } = req.body;

    try {
        const newReview = new Review({ name, occupation, review, star_number, url });
        const savedReview = await newReview.save();

        log("info", `Created review with ID: ${savedReview._id}`, req, 201);
        res.status(201).json(savedReview);
    } catch (error) {
        log("error", "Error creating review", req, 500, error);
        res.status(500).json({ error: "Error creating review" });
    }
};

// UPDATE an existing review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { name, occupation, review, star_number, url } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { name, occupation, review, star_number, url },
            { new: true }
        );

        if (!updatedReview) {
            log("warn", `Review with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Review not found" });
        }

        log("info", `Updated review with ID: ${id}`, req, 200);
        res.json(updatedReview);
    } catch (error) {
        log("error", `Error updating review with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating review" });
    }
};

// DELETE a review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            log("warn", `Review with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Review not found" });
        }

        log("info", `Deleted review with ID: ${id}`, req, 200);
        res.json({ message: "Review deleted" });
    } catch (error) {
        log("error", `Error deleting review with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error deleting review" });
    }
};
