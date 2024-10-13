const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./transfers.db');

// Static account address
app.post('/transfer', (req, res) => {
  const { reference, address, amount } = req.body;

  const query = `INSERT INTO transfers (reference, account_address, amount, paid) VALUES (?, ?, ?, ?)`;
  db.run(query, [reference, address, amount, 0], function (err) {  // 0 for unpaid
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the inserted record, with auto-generated ID
    res.status(201).json({ id: this.lastID, reference, address, amount, paid: 0 });
  });
});

// Route to fetch payment by ID
app.get('/payment/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM transfers WHERE id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(row); // Return the payment data including the "paid" field
  });
});

// New route to mark a payment as paid
app.put('/payment/:id/pay', (req, res) => {
  const { id } = req.params;
  const query = `UPDATE transfers SET paid = 1 WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Payment marked as paid', id });
  });
});

// Route to fetch all payments by user address
app.get('/payments/:address', (req, res) => {
  const { address } = req.params; // Extract the address from the URL
  const query = `SELECT * FROM transfers WHERE account_address = ?`;

  db.all(query, [address], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No payments found for this address' });
    }
    res.json(rows); // Return all payment data associated with the address
  });
});

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
