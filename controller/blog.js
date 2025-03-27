const pool = require("../config/db");
const log = require("../config/logger");

// GET all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM blog ORDER BY id DESC");
        log("info", "Fetched all blogs", req, 200);
        res.json(result.rows);
    } catch (error) {
        log("error", "Error fetching blogs", req, 500, error);
        res.status(500).json({ error: "Error fetching blogs" });
    }
};

// GET a single blog by ID
exports.getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM blog WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            log("warn", `Blog with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Blog not found" });
        }

        log("info", `Fetched blog with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error fetching blog with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching blog" });
    }
};

// CREATE a new blog
exports.createBlog = async (req, res) => {
    const { title, description, url } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO blog (title, description, url) 
       VALUES ($1, $2, $3) RETURNING *`,
            [title, description, url]
        );

        log("info", `Created blog with ID: ${result.rows[0].id}`, req, 201);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        log("error", "Error creating blog", req, 500, error);
        res.status(500).json({ error: "Error creating blog" });
    }
};

// UPDATE an existing blog
exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const result = await pool.query(
            `UPDATE blog 
       SET title = $1, description = $2
       WHERE id = $3 RETURNING *`,
            [title, description, id]
        );

        if (result.rows.length === 0) {
            log("warn", `Blog with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Blog not found" });
        }

        log("info", `Updated blog with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error updating blog with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating blog" });
    }
};

// DELETE a blog
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM blog WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            log("warn", `Blog with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Blog not found" });
        }

        log("info", `Deleted blog with ID: ${id}`, req, 200);
        res.json({ message: "Blog deleted" });
    } catch (error) {
        log("error", `Error deleting blog with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error deleting blog" });
    }
};
