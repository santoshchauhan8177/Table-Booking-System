
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import BookingForm from './BookingForm';
import BookingList from './BookingList';
import ConfirmationPage from './ConfirmationPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookingForm />} />
                <Route path="/bookings" element={<BookingList />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
