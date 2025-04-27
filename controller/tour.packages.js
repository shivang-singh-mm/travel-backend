const Package = require('../models/TourPackage');
const log = require('../config/logger');

// CREATE a package
exports.createPackage = async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        const savedPackage = await newPackage.save();
        log('info', `Created package with ID: ${savedPackage._id}`, req, 201);
        res.status(201).json(savedPackage);
    } catch (error) {
        log('error', 'Error creating package', req, 500, error);
        res.status(500).json({ error: 'Error creating package' });
    }
};

// GET all packages
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find().sort({ _id: -1 });
        log('info', 'Fetched all packages', req, 200);
        res.json(packages);
    } catch (error) {
        log('error', 'Error fetching all packages', req, 500, error);
        res.status(500).json({ error: 'Error fetching packages' });
    }
};

// GET single package
exports.getPackageById = async (req, res) => {
    const { id } = req.params;
    try {
        const packageItem = await Package.findById(id);
        if (!packageItem) {
            log('warn', `Package with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: 'Package not found' });
        }
        log('info', `Fetched package with ID: ${id}`, req, 200);
        res.json(packageItem);
    } catch (error) {
        log('error', `Error fetching package with ID ${id}`, req, 500, error);
        res.status(500).json({ error: 'Error fetching package' });
    }
};

// UPDATE package
exports.updatePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPackage = await Package.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPackage) {
            log('warn', `Package with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: 'Package not found' });
        }
        log('info', `Updated package with ID: ${id}`, req, 200);
        res.json(updatedPackage);
    } catch (error) {
        log('error', `Error updating package with ID ${id}`, req, 500, error);
        res.status(500).json({ error: 'Error updating package' });
    }
};

// DELETE package
exports.deletePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPackage = await Package.findByIdAndDelete(id);
        if (!deletedPackage) {
            log('warn', `Package with ID ${id} not found`, req, 404);
            return res.status(404).json({ error: 'Package not found' });
        }
        log('info', `Deleted package with ID: ${id}`, req, 200);
        res.json({ message: 'Package deleted' });
    } catch (error) {
        log('error', `Error deleting package with ID ${id}`, req, 500, error);
        res.status(500).json({ error: 'Error deleting package' });
    }
};


