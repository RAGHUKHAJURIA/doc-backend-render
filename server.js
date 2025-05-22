const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load env vars
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ activeStatus: true, error: false });
});

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// DB Connection
connectDB();

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgCyan.white);
});
