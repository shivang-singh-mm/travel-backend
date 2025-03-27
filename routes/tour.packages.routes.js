const express = require("express");
const router = express.Router();
const tourPackagesController = require("../controller/tour.packages");

router.get("/", tourPackagesController.getAllTourPackages);
router.get("/:id", tourPackagesController.getTourPackageById);
router.post("/", tourPackagesController.createTourPackage);
router.put("/:id", tourPackagesController.updateTourPackage);
router.delete("/:id", tourPackagesController.deleteTourPackage);

module.exports = router;

