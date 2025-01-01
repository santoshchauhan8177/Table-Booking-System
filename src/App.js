
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import BookingList from './BookingList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookingForm />} />
                <Route path="/bookings" element={<BookingList />} />
            </Routes>
        </Router>
    );
}

export default App;
