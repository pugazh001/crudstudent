const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const studentRoutes = require('./routes/student'); // Import student routes

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to the database
//connectToDatabase();

// Routes
app.use('/api/students', studentRoutes); // Mount student routes at /api/students

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000; // Set the port to 3000 or from environment variables
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
