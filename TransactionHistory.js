import React from 'react';
import Sidebar from './Sidebar';
import './style.css';

const TransactionHistory = () => {
    return (
        <div>
            <header>Finance Manager</header>
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    <h2 className="h">Transaction History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody id="transaction-history">
                            {/* Dynamic transactions here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
