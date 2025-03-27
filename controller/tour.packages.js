const pool = require("../config/db");
const log = require("../config/logger");

// GET all tour packages
exports.getAllTourPackages = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tour_packages ORDER BY id DESC");
        log("info", "Fetched all tour packages", req, 200);
        res.json(result.rows);
    } catch (error) {
        log("error", "Error fetching tour packages", req, 500, error);
        res.status(500).json({ error: "Error fetching tour packages" });
    }
};

// GET a single tour package by ID
exports.getTourPackageById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM tour_packages WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            log("warn", `Tour package with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Tour package not found" });
        }

        log("info", `Fetched tour package with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error fetching tour package with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching tour package" });
    }
};

// CREATE a new tour package
exports.createTourPackage = async (req, res) => {
    const { city, coverUrl, description, pricing, included, destinations_covered, hotel_facilities, cab_available, hotel_url, destination_url, cab_url, popular_package } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO "public"."tour_packages" (city, cover_url, description, pricing, included, destinations_covered, hotel_facilities, cab_available, hotel_url, destination_url, cab_url, popular_package) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [city, coverUrl, description, pricing, included, destinations_covered, hotel_facilities, cab_available, hotel_url, destination_url, cab_url, popular_package]
        );

        log("info", `Created tour package with ID: ${result.rows[0].id}`, req, 201);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        log("error", "Error creating tour package", req, 500, error);
        res.status(500).json({ error: "Error creating tour package" });
    }
};

// UPDATE an existing tour package
exports.updateTourPackage = async (req, res) => {
    const { id } = req.params;
    const { city, coverUrl, description, pricing, included, destinations_covered, hotel_facilities, cab_available, hotel_url, destination_url, cab_url, popular_package } = req.body;

    try {
        const result = await pool.query(
            `UPDATE tour_packages 
       SET city = $1, coverUrl = $2, description = $3, pricing = $4, included = $5, destinations_covered = $6, hotel_facilities = $7, cab_available = $8, 
           hotel_url = $9, destination_url = $10, cab_url = $11, popular_package = $12 
       WHERE id = $13 RETURNING *`,
            [city, coverUrl, description, pricing, included, destinations_covered, hotel_facilities, cab_available, hotel_url, destination_url, cab_url, popular_package, id]
        );

        if (result.rows.length === 0) {
            log("warn", `Tour package with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Tour package not found" });
        }

        log("info", `Updated tour package with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error updating tour package with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating tour package" });
    }
};

// DELETE a tour package
exports.deleteTourPackage = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM tour_packages WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            log("warn", `Tour package with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Tour package not found" });
        }

        log("info", `Deleted tour package with ID: ${id}`, req, 200);
        res.json({ message: "Tour package deleted" });
    } catch (error) {
        log("error", `Error deleting tour package with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error deleting tour package" });
    }
};

