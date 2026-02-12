import React, { useState } from 'react';
import './App.css';

const MENU_OPTIONS = [
  'Balance Enquiry',
  'Cash Deposit',
  'Withdrawal',
  'Third Party Transfer',
  'Transactions',
  'Change ATM Card PIN',
  'Logout'
];

function App() {
  const [option, setOption] = useState('');
  const [message, setMessage] = useState('');
  const [transactionCount, setTransactionCount] = useState(0);

  const handleOption = (opt) => {
    setOption(opt);
    if (opt !== 'Logout') setTransactionCount(transactionCount + 1);
    if (opt === 'Logout') setMessage(`You have performed ${transactionCount} transactions.`);
    else setMessage('');
  };

  return (
    <div className="atm-container">
      <h1>Meybank ATM Secure Menu</h1>
      <div className="menu">
        {MENU_OPTIONS.map((opt, idx) => (
          <button key={opt} onClick={() => handleOption(opt)}>{idx+1}. {opt}</button>
        ))}
      </div>
      <div className="option-input">
        <label>Enter Your Option: </label>
        <select value={option} onChange={e => handleOption(e.target.value)}>
          <option value="">--Select--</option>
          {MENU_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="output">
        {option && option !== 'Logout' && <h2>{option} Selected</h2>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
