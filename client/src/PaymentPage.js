import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [paymentData, setPaymentData] = useState(null);

  // Fetch data based on the id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/payment/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payment data');
        }
        const data = await response.json();
        setPaymentData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!paymentData) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h1 className="text-center mb-4">Payment Details</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="mb-1 text-muted">Payment Reference</h5>
              <h2 className="fw-bold">{paymentData.reference}</h2>
            </div>
            <div className="col-md-6 text-md-end">
              <h5 className="mb-1 text-muted">Amount</h5>
              <h2 className="fw-bold">${paymentData.amount}</h2>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
          {paymentData.paid === 0 ? (
              <button className="btn btn-primary btn-lg">Pay</button>
            ) : (
              <button className="btn btn-success btn-lg">Release Payment</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
