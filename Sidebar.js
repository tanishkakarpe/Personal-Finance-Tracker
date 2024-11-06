// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/userprofile">Profile</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/incomes">Incomes</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/budget">Budget</Link>
      <Link to="/investment">Investment</Link>
      <Link to="/loan">Loan</Link>
      <Link to="/transactionhistory">Transaction History</Link>
      <Link to="/upireport">UPI Transaction</Link>
      <Link to="/reports">Reports</Link>
    </div>
  );
}

export default Sidebar;
