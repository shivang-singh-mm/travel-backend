const pool = require("../config/db");
const log = require("../config/logger");

// GET all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM reviews ORDER BY id DESC");
        log("info", "Fetched all reviews", req, 200);
        res.json(result.rows);
    } catch (error) {
        log("error", "Error fetching reviews", req, 500, error);
        res.status(500).json({ error: "Error fetching reviews" });
    }
};

// GET a single review by ID
exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            log("warn", `Review with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Review not found" });
        }

        log("info", `Fetched review with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error fetching review with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching review" });
    }
};

// CREATE a new review
exports.createReview = async (req, res) => {
    const { name, occupation, review, star_number, url } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO reviews (name, occupation, review, star_number, url) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, occupation, review, star_number, url]
        );

        log("info", `Created review with ID: ${result.rows[0].id}`, req, 201);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        log("error", "Error creating review", req, 500, error);
        res.status(500).json({ error: "Error creating review" });
    }
};

// UPDATE an existing review
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { name, occupation, review, star_number } = req.body;

    try {
        const result = await pool.query(
            `UPDATE reviews 
       SET name = $1, occupation = $2, review = $3, star_number = $4 
       WHERE id = $5 RETURNING *`,
            [name, occupation, review, star_number, id]
        );

        if (result.rows.length === 0) {
            log("warn", `Review with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Review not found" });
        }

        log("info", `Updated review with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error updating review with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating review" });
    }
};

// DELETE a review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM reviews WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
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

