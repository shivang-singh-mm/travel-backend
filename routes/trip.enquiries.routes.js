const express = require("express");
const router = express.Router();
const userQueriesController = require("../controller/trip.enquiries");

router.get("/", userQueriesController.getAllQueries);
router.get("/:id", userQueriesController.getQueryById);
router.post("/", userQueriesController.createQuery);
router.put("/:id", userQueriesController.updateQuery);
router.delete("/:id", userQueriesController.deleteQuery);

module.exports = router;

