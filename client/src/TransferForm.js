import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const TransferForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const ACCOUNT_ADDRESS = 'GC4UW5AKNTANSVJP7A3FDRPGIPMB4H5SX2LRTXNYUUA7R5NB2F4QON72';


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(amount) <= 0) {
      alert('Amount must be greater than zero.');
      return;
    }
    try {
        const response = await fetch('http://localhost:5000/transfer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reference,
            ACCOUNT_ADDRESS,
            amount: Number(amount),
          }),
        });
    
        const data = await response.json();
        console.log('Transfer successful:', data);
    
        setAmount('');
        setReference('');
      } catch (error) {
        console.error('Error during transfer:', error);
      }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Transfer Funds</h2>
              <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                  <label htmlFor="reference" className="form-label">
                    Payment reference
                  </label>
                  <input
                    type="text"
                    id="reference"
                    className="form-control"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Enter payment reference"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Transfer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
