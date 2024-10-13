import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentTemplate = ({ value }) => { // Destructure value from props

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h1 className="text-center mb-4">Payment Details</h1>
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
          <div className="d-flex justify-content-between mt-4">
            {value.paid === 0 ? (
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

export default PaymentTemplate;
