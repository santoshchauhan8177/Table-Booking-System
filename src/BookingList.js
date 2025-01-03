import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null); // For error handling
    const [loading, setLoading] = useState(true); // For loading state

    // Fetch bookings on component mount
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://backend-table-booking-zeta.vercel.app/get-booking/');
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
            await axios.delete(`https://backend-table-booking-zeta.vercel.app/delete-booking/${id}`);
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
        } catch (err) {
            setError('Error deleting booking.');
            console.error('Error deleting booking:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg text-gray-600">Loading bookings...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Booking List</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
                {bookings.length > 0 ? (
                    <ul className="space-y-4">
                        {bookings.map((booking) => (
                            <li
                                key={booking._id}
                                className="flex justify-between items-center p-4 border border-gray-200 rounded-md"
                            >
                                <div>
                                    <p className="text-gray-800 font-medium">
                                        {booking.firstName} {booking.lastName}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {booking.date} at {booking.time}
                                    </p>
                                </div>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    onClick={() => handleDelete(booking._id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default BookingList;
