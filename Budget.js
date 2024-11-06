// Budget.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function Budget() {
  const [budgetList, setBudgetList] = useState([]);
  const [budget, setBudget] = useState({ category: '', amount: '' });
  const [totalBudget, setTotalBudget] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget({ ...budget, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudgetList([...budgetList, budget]);
    setTotalBudget(totalBudget + parseFloat(budget.amount));
    setBudget({ category: '', amount: '' });
  };

  return (
    <div className="container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="header">Manage Budget</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Budget Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={budget.category}
            onChange={handleChange}
            required
          />
          <label htmlFor="amount">Budget Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={budget.amount}
            onChange={handleChange}
            required
          />
          <button type="submit">Set Budget</button>
        </form>

        <h2>Budget List</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget Amount</th>
            </tr>
          </thead>
          <tbody>
            {budgetList.map((budget, index) => (
              <tr key={index}>
                <td>{budget.category}</td>
                <td>{budget.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>Total Budget: <span>{`$${totalBudget.toFixed(2)}`}</span></div>
      </div>
    </div>
  );
}

export default Budget;
