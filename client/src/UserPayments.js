import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPayments = () => {
  const { address } = useParams(); // Get the address from the URL
  const [payments, setPayments] = useState([]);

  // Fetch payments based on the address
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/payments/${address}`);
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
        <div className="card shadow-lg border-0 mb-4" key={payment.id}>
          <div className="card-body p-4">
            <div className="row mb-3">
              <div className="col-md-6">
                <h5 className="mb-1 text-muted">Payment Reference</h5>
                <h2 className="fw-bold">{payment.reference}</h2>
              </div>
              <div className="col-md-6 text-md-end">
                <h5 className="mb-1 text-muted">Amount</h5>
                <h2 className="fw-bold">${payment.amount}</h2>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              {payment.paid === 0 ? (
                <button className="btn btn-primary btn-lg">Pay</button>
              ) : (
                <button className="btn btn-success btn-lg">Release Payment</button>
              )}
              <Link to={`/payment/${payment.id}`} className="btn btn-info btn-lg">
                View Payment
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPayments;
