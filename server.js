
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();  // Load environment variables from .env file



// Enable CORS for all origins
const app = express();
const port = process.env.PORT || 5000;  // Use port from .env or default to 5000

// Body parser middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schema and Model for Booking
const bookingSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    guests: Number,
    seatingPreference: String,
    specialRequests: String
});

const Booking = mongoose.model('Booking', bookingSchema);

// POST route to create a booking
app.post('/create-booking', async (req, res) => {
    const { firstName, lastName, email, phone, date, time, guests, seatingPreference, specialRequests } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !date || !time) {
        return res.status(400).json({ message: 'Please provide required fields: firstName, lastName, email, date, time' });
    }

    try {
        const newBooking = new Booking({
            firstName,
            lastName,
            email,
            phone,
            date,
            time,
            guests,
            seatingPreference,
            specialRequests
        });

        await newBooking.save();  // Save to MongoDB
        return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (err) {
        return res.status(500).json({ message: 'Error creating booking', error: err });
    }
});

// GET route to retrieve a booking by ID
app.get('/get-booking/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        const booking = await Booking.findById(bookingId);  // Find booking by ID in MongoDB

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.status(200).json(booking);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching booking', error: err });
    }
});

// DELETE route to delete a booking by ID
app.delete('/delete-booking/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        const booking = await Booking.findByIdAndDelete(bookingId);  // Find and delete booking by ID

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting booking', error: err });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
