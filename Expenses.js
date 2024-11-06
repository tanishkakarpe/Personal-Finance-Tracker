// Expenses.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function Expenses() {
  const [expenseList, setExpenseList] = useState([]);
  const [expense, setExpense] = useState({ name: '', amount: '', date: '' });
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenseList([...expenseList, expense]);
    setTotalExpenses(totalExpenses + parseFloat(expense.amount));
    setExpense({ name: '', amount: '', date: '' });
  };

  return (
    <div className="container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="header">Manage Expenses</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Expense Name</label>
          <input
            type="text"
            id="expense-name"
            name="name"
            value={expense.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="expense-amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            required
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="expense-date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Expense</button>
        </form>

        <h2>Expense List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenseList.map((expense, index) => (
              <tr key={index}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>Total Expenses: <span>{`$${totalExpenses.toFixed(2)}`}</span></div>
      </div>
    </div>
  );
}

export default Expenses;
