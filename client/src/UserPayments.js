import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentTemplate from './PaymentTemplate';

const UserPayments = () => {
  const { address } = useParams(); // Get the address from the URL
  const [payments, setPayments] = useState([]);

  // Fetch payments based on the address
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:5001/payments/${address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, [address]);

  if (payments.length === 0) {
    return <div className="text-center mt-5">No payments found for this user.</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Payments for Address: {address}</h1>
      {payments.map((payment) => (
        <PaymentTemplate value={payment}/>
      ))}
    </div>
  );
};

export default UserPayments;
