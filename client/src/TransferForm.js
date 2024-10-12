import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const TransferForm = ({ onSubmit }) => {
  const [senderWallet, setSenderWallet] = useState('');
  const [receiverWallet, setReceiverWallet] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!senderWallet || !receiverWallet || !amount) {
      alert('All fields are required.');
      return;
    }

    if (Number(amount) <= 0) {
      alert('Amount must be greater than zero.');
      return;
    }

    // Call the onSubmit function passed as a prop
    onSubmit({
      senderWallet,
      receiverWallet,
      amount: Number(amount),
    });

    // Clear the form
    setSenderWallet('');
    setReceiverWallet('');
    setAmount('');
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
                  <label htmlFor="senderWallet" className="form-label">
                    Sender Wallet ID
                  </label>
                  <input
                    type="text"
                    id="senderWallet"
                    className="form-control"
                    value={senderWallet}
                    onChange={(e) => setSenderWallet(e.target.value)}
                    placeholder="Enter sender wallet ID"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="receiverWallet" className="form-label">
                    Receiver Wallet ID
                  </label>
                  <input
                    type="text"
                    id="receiverWallet"
                    className="form-control"
                    value={receiverWallet}
                    onChange={(e) => setReceiverWallet(e.target.value)}
                    placeholder="Enter receiver wallet ID"
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
