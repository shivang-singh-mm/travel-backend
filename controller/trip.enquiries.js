const pool = require("../config/db");
const log = require("../config/logger");
const { v4: uuidv4 } = require("uuid");

// GET all user queries
exports.getAllQueries = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM user_queries");
        log("info", "Fetched all user queries", req, 200);
        res.json(result.rows);
    } catch (error) {
        log("error", "Error fetching user queries", req, 500, error);
        res.status(500).json({ error: "Error fetching user queries" });
    }
};

// GET a single query by ID
exports.getQueryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM user_queries WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            log("warn", `Query with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Query not found" });
        }

        log("info", `Fetched query with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error fetching query with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching query" });
    }
};

// CREATE a new user query
exports.createQuery = async (req, res) => {
    const { name, email, number, number_of_persons, destination, information } = req.body;
    const id = uuidv4();
    try {
        const result = await pool.query(
            "INSERT INTO user_queries (id, name, email, number, number_of_persons, destination, information) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [id, name, email, number, number_of_persons, destination, information]
        );

        log("info", `Created query with ID: ${id}`, req, 201);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        log("error", "Error creating user query", req, 500, error);
        res.status(500).json({ error: "Error creating user query" });
    }
};

// UPDATE an existing query
exports.updateQuery = async (req, res) => {
    const { id } = req.params;
    const { name, email, number, number_of_persons, destination, information } = req.body;
    try {
        const result = await pool.query(
            "UPDATE user_queries SET name = $1, email = $2, number = $3, number_of_persons = $4, destination = $5, information = $6 WHERE id = $7 RETURNING *",
            [name, email, number, number_of_persons, destination, information, id]
        );

        if (result.rows.length === 0) {
            log("warn", `Query with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Query not found" });
        }

        log("info", `Updated query with ID: ${id}`, req, 200);
        res.json(result.rows[0]);
    } catch (error) {
        log("error", `Error updating query with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating query" });
    }
};

// DELETE a query
exports.deleteQuery = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM user_queries WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            log("warn", `Query with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Query not found" });
        }

        log("info", `Deleted query with ID: ${id}`, req, 200);
        res.json({ message: "Query deleted" });
    } catch (error) {
        log("error", `Error deleting query with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error deleting query" });
    }
};

