
// connectDB();

// const app = express();
// app.use(express.json());


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// ---
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");
const express = require('express');
const app = express();
const matchRoutes = require('./routes/matchRoutes');

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/v1', matchRoutes);
app.use("/api/resume", resumeRoutes);

// MongoDB connection
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Node.js server running on port ${PORT}`);
    });
})

