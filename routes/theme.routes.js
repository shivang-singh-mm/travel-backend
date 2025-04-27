const express = require('express');
const router = express.Router();
const themeController = require('../controller/theme');

// POST /api/themes
router.post('/', themeController.createTheme);

// GET /api/
router.get('/', themeController.getThemes);

// GET /api//:id
router.get('/:id', themeController.getThemeById);

// PUT /api//:id
router.put('/:id', themeController.updateTheme);

// DELETE /api//:id
router.delete('/:id', themeController.deleteTheme);

module.exports = router;
