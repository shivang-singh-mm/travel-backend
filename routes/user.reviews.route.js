const express = require("express");
const router = express.Router();
const reviewsController = require("../controller/user.reviews");

router.get("/", reviewsController.getAllReviews);
router.get("/:id", reviewsController.getReviewById);
router.post("/", reviewsController.createReview);
router.put("/:id", reviewsController.updateReview);
router.delete("/:id", reviewsController.deleteReview);

module.exports = router;

