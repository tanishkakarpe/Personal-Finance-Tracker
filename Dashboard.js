// Dashboard.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function Dashboard() {
  return (
    <div className="container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="header">Personal Finance Tracker</div>
        <div className="card">
          <h3>Current Balance</h3>
          <div className="value">$108,000.00</div>
        </div>
        <div className="card">
          <h3>This Month's Income</h3>
          <div className="value">$49,000.00</div>
        </div>
        <div className="card">
          <h3>This Month's Expenses</h3>
          <div className="value">$21,000.00</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
