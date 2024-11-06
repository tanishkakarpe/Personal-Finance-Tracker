import React from 'react';
import Sidebar from './Sidebar';
import './style.css';

const Reports = () => {
    return (
        <div>
            <header>Finance Manager</header>
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    <h1 className="header">Dashboard Overview</h1>
                    <div className="progress-wrapper">
                        {/* Map each progress card */}
                        {['Income', 'Expenses', 'Investments', 'Loan', 'Budget'].map((category, index) => (
                            <div className="progress-card" key={index}>
                                <h3>{category}</h3>
                                <div className="circle">
                                    <svg width="80" height="80">
                                        <circle className="circle-bg" cx="40" cy="40" r="30"></circle>
                                        <circle className="circle-progress" cx="40" cy="40" r="30" strokeDasharray="188.4" strokeDashoffset={getStrokeOffset(category)}></circle>
                                    </svg>
                                </div>
                                <div className="value" id={`${category.toLowerCase()}-percentage`}></div>
                            </div>
                        ))}
                    </div>

                    <div className="financial-reports">
                        <div className="header">Financial Reports</div>
                        {['Income', 'Expenses', 'Investments', 'Loans', 'Remaining Budget'].map((item, index) => (
                            <div className="card" key={index}>
                                <h3>Total {item}</h3>
                                <p className="value" id={`total-${item.toLowerCase().replace(' ', '-')}`}>$0.00</p>
                            </div>
                        ))}

                        <h2>View Reports</h2>
                        <select id="time-frame">
                            <option value="all">All Time</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        <button id="apply-filter">Apply Filter</button>

                        <h2 className="h">Report Summary</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Total Amount</th>
                                    <th>Type (Income/Expense/Investment/Loan)</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody id="report-list">
                                {/* Insert dynamically generated rows here */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Example function to handle dynamic stroke offset
const getStrokeOffset = (category) => {
    switch(category) {
        case 'Income': return 94.2;
        case 'Expenses': return 113.04;
        case 'Investments': return 113.04;
        case 'Loan': return 113.04;
        case 'Budget': return 56.52;
        default: return 0;
    }
};

export default Reports;
