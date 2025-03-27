const express = require("express");
const router = express.Router();
const galleryController = require("../controller/gallery");

router.get("/", galleryController.getAllGalleryItems);
router.get("/:id", galleryController.getGalleryItemById);
router.post("/", galleryController.createGalleryItem);
router.put("/:id", galleryController.updateGalleryItem);
router.delete("/:id", galleryController.deleteGalleryItem);

module.exports = router;

