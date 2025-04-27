const express = require('express');
const router = express.Router();
const packageController = require('../controller/tour.packages');

// Create
router.post('/', packageController.createPackage);
// Read all
router.get('/', packageController.getAllPackages);
// Read one
router.get('/:id', packageController.getPackageById);
// Update
router.put('/:id', packageController.updatePackage);
// Delete
router.delete('/:id', packageController.deletePackage);

module.exports = router;


