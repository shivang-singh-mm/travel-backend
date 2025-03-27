const pool = require("../config/db");
const log = require("../config/logger");

// GET all gallery items
exports.getAllGalleryItems = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM gallery ORDER BY id DESC");
        log("info", "Fetched all gallery items", req, 200);
        res.json(result.rows);
    } catch (error) {
        log("error", "Error fetching gallery items", req, 500, error);
        res.status(500).json({ error: "Error fetching gallery items" });
    }
};

// GET a single gallery item by ID
exports.getGalleryItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM gallery WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            log("warn", `Gallery item with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Gallery item not found" });
        }

        log("info", `Fetched gallery item with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error fetching gallery item with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching gallery item" });
    }
};

// CREATE a new gallery item
exports.createGalleryItem = async (req, res) => {
    const { title, description, image_url } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO gallery (title, description, image_url) VALUES ($1, $2, $3) RETURNING *",
            [title, description, image_url]
        );

        log("info", `Created gallery item with ID: ${result.rows[0].id}`, req, 201);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        log("error", "Error creating gallery item", req, 500, error);
        res.status(500).json({ error: "Error creating gallery item" });
    }
};

// UPDATE an existing gallery item
exports.updateGalleryItem = async (req, res) => {
    const { id } = req.params;
    const { title, description, image_url } = req.body;
    try {
        const result = await pool.query(
            "UPDATE gallery SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *",
            [title, description, image_url, id]
        );

        if (result.rows.length === 0) {
            log("warn", `Gallery item with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Gallery item not found" });
        }

        log("info", `Updated gallery item with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error updating gallery item with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating gallery item" });
    }
};

// DELETE a gallery item
exports.deleteGalleryItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM gallery WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            log("warn", `Gallery item with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Gallery item not found" });
        }

        log("info", `Deleted gallery item with ID: ${id}`, req, 200);
        res.json({ message: "Gallery item deleted" });
    } catch (error) {
        log("error", `Error deleting gallery item with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error deleting gallery item" });
    }
};

