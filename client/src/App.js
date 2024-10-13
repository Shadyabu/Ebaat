import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransferForm from './TransferForm';
import PaymentPage from './PaymentPage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import UserPayments from './UserPayments';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TransferForm />} />
        {/* Dynamic PaymentPage route */}
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/payments/:address" element={<UserPayments />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
