import React, { useState } from 'react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import Dashboard from './Dashboard';

const BudgetApp = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  return (
    <div>
      <h1>Budget Management System</h1>
      <IncomeForm onUpdateIncome={(income) => setTotalIncome(income)} />
      <ExpenseForm onUpdateExpenses={(expenses) => setTotalExpenses(expenses)} />
      <Dashboard totalIncome={totalIncome} totalExpenses={totalExpenses} />
    </div>
  );
};

export default BudgetApp;
