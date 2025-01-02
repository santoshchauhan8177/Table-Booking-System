import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConfirmationPage() {
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [phone, setPhone] = useState(''); // State to store phone number
    const [successMessage, setSuccessMessage] = useState(null); // For success message
    const [deleteError, setDeleteError] = useState(null); // For delete error message
    const navigate = useNavigate();

    // Fetch booking details using phone number
    const fetchBookingDetails = async (phone) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/get-booking?phone=${phone}`);
            setBookingDetails(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error: Could not fetch booking details');
            setLoading(false);
        }
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleFetchClick = () => {
        if (phone) {
            fetchBookingDetails(phone);
        } else {
            setError('Please enter a valid phone number.');
        }
    };

    // Handle booking deletion
    const handleDeleteBooking = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/delete-booking?phone=${phone}`);
            setSuccessMessage(response.data.message); // Set success message
            setBookingDetails(null); // Clear booking details from state
        } catch (err) {
            setDeleteError('Error: Could not delete the booking');
        }
    };

    // Navigate back to home
    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-500">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Confirmation</h2>

                {/* Success message for deletion */}
                {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
                
                {/* Delete error message */}
                {deleteError && <p className="text-red-600 text-center">{deleteError}</p>}

                {/* Button to navigate to the home page */}
                <div className="flex justify-center">
                    <button
                        onClick={handleBackToHome}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md mb-4"
                    >
                        Back to Home
                    </button>
                </div>

                {/* Input field for phone number */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter Phone Number"
                        className="border px-4 py-2 rounded-md w-full"
                    />
                </div>

                {/* Button to fetch booking details */}
                <div className="flex justify-center">
                    <button
                        onClick={handleFetchClick}
                        className="bg-green-600 text-white px-6 py-2 rounded-md mb-4"
                    >
                        Fetch Booking Details
                    </button>
                </div>

                {/* Displaying error message */}
                {error && <p className="text-red-600 text-center mt-4">{error}</p>}

                {/* Display loading state */}
                {loading && <p className="text-center text-yellow-600">Loading...</p>}

                {/* Display booking details */}
                {bookingDetails && (
                    <div className="mt-6">
                        <p className="text-lg font-semibold">Booking Details</p>
                        <div className="mb-4">
                            <p><strong>Guest Name:</strong> {bookingDetails.firstName} {bookingDetails.lastName}</p>
                            <p><strong>Email:</strong> {bookingDetails.email}</p>
                            <p><strong>Phone:</strong> {bookingDetails.phone}</p>
                            <p><strong>Date:</strong> {bookingDetails.date}</p>
                            <p><strong>Time:</strong> {bookingDetails.time}</p>
                            <p><strong>Guests:</strong> {bookingDetails.guests}</p>
                            <p><strong>Seating Preference:</strong> {bookingDetails.seatingPreference}</p>
                            <p><strong>Special Requests:</strong> {bookingDetails.specialRequests}</p>
                        </div>

                        {/* Delete Booking Button below Fetch Booking Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleDeleteBooking}
                                className="bg-red-600 text-white px-6 py-2 rounded-md"
                            >
                                Delete Booking
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConfirmationPage;
