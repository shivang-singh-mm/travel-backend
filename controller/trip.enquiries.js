const UserQuery = require("../models/UserQuery");
const log = require("../config/logger");

// GET all user queries
exports.getAllQueries = async (req, res) => {
    try {
        const queries = await UserQuery.find().sort({ _id: -1 });
        log("info", "Fetched all user queries", req, 200);
        res.json(queries);
    } catch (error) {
        log("error", "Error fetching user queries", req, 500, error);
        res.status(500).json({ error: "Error fetching user queries" });
    }
};

// GET a single query by ID
exports.getQueryById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = await UserQuery.findById(id);

        if (!query) {
            log("warn", `Query with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Query not found" });
        }

        log("info", `Fetched query with ID: ${id}`, req, 200);
        res.json(query);
    } catch (error) {
        log("error", `Error fetching query with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching query" });
    }
};

// CREATE a new user query
exports.createQuery = async (req, res) => {
    try {
        const newQuery = new UserQuery(req.body);
        const savedQuery = await newQuery.save();

        log("info", "Created query", req, 201);
        res.status(201).json(savedQuery);
    } catch (error) {
        log("error", "Error creating user query", req, 500, error);
        res.status(500).json({ error: "Error creating user query" });
    }
};

// UPDATE an existing query
exports.updateQuery = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedQuery = await UserQuery.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedQuery) {
            log("warn", `Query with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Query not found" });
        }

        log("info", `Updated query with ID: ${id}`, req, 200);
        res.json(updatedQuery);
    } catch (error) {
        log("error", `Error updating query with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating query" });
    }
};

// DELETE a query
exports.deleteQuery = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQuery = await UserQuery.findByIdAndDelete(id);

        if (!deletedQuery) {
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


