import React from 'react';
import Sidebar from './Sidebar';
import './style.css';

const UPIReport = () => {
    return (
        <div>
            <header>Finance Manager</header>
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    <h2 className="h">UPI Transaction Report</h2>
                    <p>Fetch UPI transactions and generate a detailed report:</p>
                    <button id="fetch-upi">Fetch UPI Transactions</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="upi-report">
                            {/* Dynamic UPI transactions here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UPIReport;
