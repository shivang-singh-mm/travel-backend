const Gallery = require("../models/Gallery");
const log = require("../config/logger");

// GET all gallery items
exports.getAllGalleryItems = async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        log("info", "Fetched all gallery items", req, 200);
        res.json(items);
    } catch (error) {
        log("error", "Error fetching gallery items", req, 500, error);
        res.status(500).json({ error: "Error fetching gallery items" });
    }
};

// GET a single gallery item by ID
exports.getGalleryItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Gallery.findById(id);

        if (!item) {
            log("warn", `Gallery item with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Gallery item not found" });
        }

        log("info", `Fetched gallery item with ID: ${id}`, req, 200);
        res.json(item);
    } catch (error) {
        log("error", `Error fetching gallery item with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching gallery item" });
    }
};

// CREATE a new gallery item
exports.createGalleryItem = async (req, res) => {
    const { title, description, image_url } = req.body;
    try {
        const newItem = new Gallery({ title, description, image_url });
        const savedItem = await newItem.save();

        log("info", `Created gallery item with ID: ${savedItem._id}`, req, 201);
        res.status(201).json(savedItem);
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
        const updatedItem = await Gallery.findByIdAndUpdate(
            id,
            { title, description, image_url },
            { new: true }
        );

        if (!updatedItem) {
            log("warn", `Gallery item with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Gallery item not found" });
        }

        log("info", `Updated gallery item with ID: ${id}`, req, 200);
        res.json(updatedItem);
    } catch (error) {
        log("error", `Error updating gallery item with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating gallery item" });
    }
};

// DELETE a gallery item
exports.deleteGalleryItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await Gallery.findByIdAndDelete(id);

        if (!deletedItem) {
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


