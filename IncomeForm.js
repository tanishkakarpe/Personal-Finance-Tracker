import React, { useState, useEffect } from 'react';

const IncomeForm = ({ onUpdateIncome }) => {
  const [incomes, setIncomes] = useState(JSON.parse(localStorage.getItem('incomes')) || []);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const total = incomes.reduce((acc, income) => acc + income.amount, 0);
    setTotalIncome(total);
    localStorage.setItem('incomes', JSON.stringify(incomes));
    onUpdateIncome(total);
  }, [incomes, onUpdateIncome]);

  const handleAddIncome = (e) => {
    e.preventDefault();
    const newIncome = { source, amount: parseFloat(amount), date: new Date().toLocaleDateString() };
    setIncomes([...incomes, newIncome]);
    setSource('');
    setAmount('');
  };

  const handleDeleteIncome = (index) => {
    const updatedIncomes = incomes.filter((_, i) => i !== index);
    setIncomes(updatedIncomes);
  };

  return (
    <div>
      <form onSubmit={handleAddIncome}>
        <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Income Source" required />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
        <button type="submit">Add Income</button>
      </form>
      <div>Total Income: ${totalIncome.toFixed(2)}</div>
      <ul>
        {incomes.map((income, index) => (
          <li key={index}>
            {income.source} - ${income.amount} on {income.date}
            <button onClick={() => handleDeleteIncome(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeForm;
