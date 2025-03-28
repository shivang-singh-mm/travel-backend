const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const tourPackage = require("./routes/tour.packages.routes");
const gallery = require("./routes/gallery.routes");
const review = require("./routes/user.reviews.route");
const blog = require("./routes/blog.routes");

// const listingsRoutes = require("./routes/listingsRoutes");
const pool = require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

pool.connect()
    .then(() => console.log("Connected to PostgreSQL successfully."))
    .catch((err) => console.error("Error connecting to PostgreSQL:", err));

// app.use("/listings", listingsRoutes);
app.use("/api/tour", tourPackage);
app.use("/api/gallery", gallery);
app.use("/api/review", review);
app.use("/api/blog", blog);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app
