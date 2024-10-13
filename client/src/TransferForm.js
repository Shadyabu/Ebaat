import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransferForm = () => {
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const ACCOUNT_ADDRESS = 'GC4UW5AKNTANSVJP7A3FDRPGIPMB4H5SX2LRTXNYUUA7R5NB2F4QON72';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(amount) <= 0) {
      alert('Amount must be greater than zero.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference,
          address: ACCOUNT_ADDRESS,
          amount: Number(amount),
        }),
      });

      const data = await response.json();
      console.log('Transfer successful:', data);

      if (data.id) {
        navigate(`/payment/${data.id}`);
      }

      setAmount('');
      setReference('');
    } catch (error) {
      console.error('Error during transfer:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 fw-bold text-primary">Request Escrow</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="reference" className="form-label">
                    Payment Reference
                  </label>
                  <input
                    type="text"
                    id="reference"
                    className="form-control form-control-lg"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Enter payment reference"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="amount" className="form-label">
                    Amount in USD
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      id="amount"
                      className="form-control form-control-lg"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      required
                      min="1"
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
