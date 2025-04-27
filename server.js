const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const tourPackage = require("./routes/tour.packages.routes");
const gallery = require("./routes/gallery.routes");
const review = require("./routes/user.reviews.route");
const blog = require("./routes/blog.routes");
const enquery = require("./routes/trip.enquiries.routes");
const offer = require("./routes/offer.routes");
const theme = require("./routes/theme.routes");

// const listingsRoutes = require("./routes/listingsRoutes");
const pool = require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// pool.connect()
//     .then(() => console.log("Connected to PostgreSQL successfully."))
//     .catch((err) => console.error("Error connecting to PostgreSQL:", err));

// app.use("/listings", listingsRoutes);
app.get('/health', (req, res) => {
    res.send("working fine")
})
app.use("/api/tour", tourPackage);
app.use("/api/gallery", gallery);
app.use("/api/review", review);
app.use("/api/blog", blog);
app.use("/api/enquiry", enquery);
app.use("/api/offer", offer);
app.use("/api/theme", theme);


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydb", {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("MongoDB connected")
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error("MongoDB error:", err));

