import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);  // For error handling
    const [loading, setLoading] = useState(true);  // For loading state

    // Fetch bookings on component mount
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-booking');
                setBookings(response.data);
            } catch (err) {
                setError('Error fetching bookings.');
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete-booking/${id}`);
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
        } catch (err) {
            setError('Error deleting booking.');
            console.error('Error deleting booking:', err);
        }
    };

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    return (
        <div>
            <h2>Booking List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <li key={booking.id}>
                            {booking.firstName} {booking.lastName} ({booking.date} at {booking.time})
                            <button onClick={() => handleDelete(booking.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </ul>
        </div>
    );
};

export default BookingList;

