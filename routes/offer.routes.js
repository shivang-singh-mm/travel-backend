const express = require("express");
const router = express.Router();
const offerController = require("../controller/offer");

router.get("/", offerController.getAllOffers);
router.get('/:id', offerController.getOfferById)
router.post("/", offerController.createOffer);
router.delete("/:id", offerController.deleteOffer);
router.put('/:id', offerController.updateOffer);

module.exports = router;