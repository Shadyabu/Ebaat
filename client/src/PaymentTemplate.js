import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const PaymentTemplate = ({ value, onPaymentUpdate }) => {

  const handlePayClick = async () => {
    try {
      const response = await fetch(`http://localhost:5001/payment/${value.id}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onPaymentUpdate(); // Call parent function to update the payment status
      } else {
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.reload();
  };

  const handleReleaseClick = async () => {
    try {
      const response = await fetch(`http://localhost:5001/payment/${value.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onPaymentUpdate(); // Refresh or navigate after deletion
      } else {
        console.error('Failed to delete payment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    window.location.reload();

  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h1 className="text-center mb-4">Payment Details</h1>
          <Link key={value.id} to={`/payment/${value.id}`}>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="mb-1 text-muted">Payment Reference</h5>
              <h2 className="fw-bold">{value.reference}</h2>
            </div>
            <div className="col-md-6 text-md-end">
              <h5 className="mb-1 text-muted">Amount</h5>
              <h2 className="fw-bold">${value.amount}</h2>
            </div>
          </div>
          </Link>
          <div className="d-flex justify-content-between mt-4">
            {value.paid === 0 ? (
              <button className="btn btn-primary btn-lg" onClick={handlePayClick}>
                Pay
              </button>
            ) : (
              <button className="btn btn-success btn-lg" onClick={handleReleaseClick}>
                Release Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTemplate;