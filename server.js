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

  const query = `INSERT INTO transfers (reference, account_address, amount) VALUES (?, ?, ?)`;
  db.run(query, [reference, address, amount], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return the inserted record, with auto-generated ID
    res.status(201).json({ id: this.lastID, reference,address, amount });
  });
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
