import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function BookingForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        seatingPreference: '',
        specialRequests: '',
        agreeToTerms: false
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setFormData({
            ...formData,
            agreeToTerms: checked
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Process form submission logic here
        navigate('/bookings');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-500">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <div className="border-b-2 border-blue-500 pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Restaurant Table Booking System</h1>
                    <p className="text-gray-600">Please fill in the details for your table reservation</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Guest Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Reservation Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Time</label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select time</option>
                                    <option value="12:00 PM">12:00 PM</option>
                                    <option value="1:00 PM">1:00 PM</option>
                                    <option value="2:00 PM">2:00 PM</option>
                                    <option value="3:00 PM">3:00 PM</option>
                                    <option value="4:00 PM">4:00 PM</option>
                                    <option value="5:00 PM">5:00 PM</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Number of Guests</label>
                                <select
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select number of guests</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Seating Preference</label>
                                <select
                                    name="seatingPreference"
                                    value={formData.seatingPreference}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select seating preference</option>
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                    <option value="Window Seat">Window Seat</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Special Requests</label>
                        <textarea
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            placeholder="Any special requests or dietary requirements?"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.agreeToTerms}
                                onChange={handleCheckboxChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2 text-gray-700">
                                I agree to the{' '}
                                <a href="#" className="text-blue-600">
                                    terms and conditions
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-blue-600">
                                    cancellation policy
                                </a>
                            </span>
                        </label>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md">
                            Confirm Reservation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookingForm;
