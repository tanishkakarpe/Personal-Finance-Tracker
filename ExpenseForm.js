const ExpenseForm = ({ onUpdateExpenses }) => {
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(total);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    onUpdateExpenses(total);
  }, [expenses, onUpdateExpenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = { name, amount: parseFloat(amount), date: new Date().toLocaleDateString() };
    setExpenses([...expenses, newExpense]);
    setName('');
    setAmount('');
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <form onSubmit={handleAddExpense}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Expense Name" required />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
        <button type="submit">Add Expense</button>
      </form>
      <div>Total Expenses: ${totalExpenses.toFixed(2)}</div>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name} - ${expense.amount} on {expense.date}
            <button onClick={() => handleDeleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseForm;
