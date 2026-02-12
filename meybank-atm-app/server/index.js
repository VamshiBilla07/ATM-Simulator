const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory demo data
let balance = 1000;
let transactions = [];
let pin = '1234';

app.get('/api/balance', (req, res) => {
  res.json({ balance });
});

app.post('/api/deposit', (req, res) => {
  const { amount } = req.body;
  balance += amount;
  transactions.push({ type: 'Deposit', amount, date: new Date() });
  res.json({ balance });
});

app.post('/api/withdraw', (req, res) => {
  const { amount } = req.body;
  if (amount > balance) return res.status(400).json({ error: 'Insufficient funds' });
  balance -= amount;
  transactions.push({ type: 'Withdraw', amount, date: new Date() });
  res.json({ balance });
});

app.post('/api/transfer', (req, res) => {
  const { to, amount } = req.body;
  if (amount > balance) return res.status(400).json({ error: 'Insufficient funds' });
  balance -= amount;
  transactions.push({ type: 'Transfer', to, amount, date: new Date() });
  res.json({ balance });
});

app.get('/api/transactions', (req, res) => {
  res.json({ transactions });
});

app.post('/api/change-pin', (req, res) => {
  const { newPin } = req.body;
  pin = newPin;
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log('ATM backend running on port 5000');
});
