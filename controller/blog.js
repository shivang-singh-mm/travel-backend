const Blog = require("../models/Blog");
const log = require("../config/logger");

// GET all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        log("info", "Fetched all blogs", req, 200);
        res.json(blogs);
    } catch (error) {
        log("error", "Error fetching blogs", req, 500, error);
        res.status(500).json({ error: "Error fetching blogs" });
    }
};

// GET a single blog by ID
exports.getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            log("warn", `Blog with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Blog not found" });
        }
        log("info", `Fetched blog with ID: ${id}`, req, 200);
        res.json(blog);
    } catch (error) {
        log("error", `Error fetching blog with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error fetching blog" });
    }
};

// CREATE a new blog
exports.createBlog = async (req, res) => {
    const { title, description, url } = req.body;

    try {
        const newBlog = new Blog({ title, description, url });
        const savedBlog = await newBlog.save();
        log("info", `Created blog with ID: ${savedBlog._id}`, req, 201);
        res.status(201).json(savedBlog);
    } catch (error) {
        log("error", "Error creating blog", req, 500, error);
        res.status(500).json({ error: "Error creating blog" });
    }
};

// UPDATE an existing blog
exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, description, url },
            { new: true }
        );

        if (!updatedBlog) {
            log("warn", `Blog with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: "Blog not found" });
        }

        log("info", `Updated blog with ID: ${id}`, req, 200);
        res.json(updatedBlog);
    } catch (error) {
        log("error", `Error updating blog with ID ${id}`, req, 500, error);
        res.status(500).json({ error: "Error updating blog" });
    }
};

// DELETE a blog
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
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

