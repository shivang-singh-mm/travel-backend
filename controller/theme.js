const Theme = require('../models/Theme');
const log = require('../config/logger');

// CREATE a Theme
exports.createTheme = async (req, res) => {
    try {
        const { title, description, image_url, package_ids } = req.body;

        if (!title || !description || !image_url) {
            log('warn', 'Missing required fields in theme creation', req, 400);
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newTheme = new Theme({
            title,
            description,
            image_url,
            package_ids
        });

        const savedTheme = await newTheme.save();
        log('info', `Created theme with ID: ${savedTheme._id}`, req, 201);
        res.status(201).json(savedTheme);
    } catch (error) {
        log('error', 'Error creating theme', req, 500, error);
        res.status(500).json({ message: 'Error creating theme' });
    }
};

// GET All Themes
exports.getThemes = async (req, res) => {
    try {
        const themes = await Theme.find().populate('package_ids');
        log('info', 'Fetched all themes', req, 200);
        res.status(200).json(themes);
    } catch (error) {
        log('error', 'Error fetching all themes', req, 500, error);
        res.status(500).json({ message: 'Error fetching themes' });
    }
};

// GET Single Theme by ID
exports.getThemeById = async (req, res) => {
    const { id } = req.params;
    try {
        const theme = await Theme.findById(id).populate('package_ids');
        if (!theme) {
            log('warn', `Theme with ID ${id} not found`, req, 404);
            return res.status(404).json({ message: 'Theme not found' });
        }
        log('info', `Fetched theme with ID: ${id}`, req, 200);
        res.status(200).json(theme);
    } catch (error) {
        log('error', `Error fetching theme with ID ${id}`, req, 500, error);
        res.status(500).json({ message: 'Error fetching theme' });
    }
};

// UPDATE Theme
exports.updateTheme = async (req, res) => {
    const { id } = req.params;
    try {
        const { title, description, image_url, package_ids } = req.body;

        const updatedTheme = await Theme.findByIdAndUpdate(
            id,
            { title, description, image_url, package_ids },
            { new: true }
        );

        if (!updatedTheme) {
            log('warn', `Theme with ID ${id} not found`, req, 404);
            return res.status(404).json({ message: 'Theme not found' });
        }

        log('info', `Updated theme with ID: ${id}`, req, 200);
        res.status(200).json(updatedTheme);
    } catch (error) {
        log('error', `Error updating theme with ID ${id}`, req, 500, error);
        res.status(500).json({ message: 'Error updating theme' });
    }
};

// DELETE Theme
exports.deleteTheme = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTheme = await Theme.findByIdAndDelete(id);
        if (!deletedTheme) {
            log('warn', `Theme with ID ${id} not found`, req, 404);
            return res.status(404).json({ message: 'Theme not found' });
        }
        log('info', `Deleted theme with ID: ${id}`, req, 200);
        res.status(200).json({ message: 'Theme deleted successfully' });
    } catch (error) {
        log('error', `Error deleting theme with ID ${id}`, req, 500, error);
        res.status(500).json({ message: 'Error deleting theme' });
    }
};
