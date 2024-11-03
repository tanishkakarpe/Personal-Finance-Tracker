document.addEventListener('DOMContentLoaded', function () {
    const incomeForm = document.getElementById('income-form');
    const incomeSource = document.getElementById('income-source');
    const incomeAmount = document.getElementById('income-amount');
    const incomeList = document.getElementById('income-list');
    const totalIncomeDisplay = document.getElementById('total-income');

    let totalIncome = 0;
    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];

    // Function to format amount in currency
    function formatCurrency(amount) {
        return '$' + parseFloat(amount).toFixed(2);
    }

    // Function to update the total income display
    function updateTotalIncome() {
        totalIncomeDisplay.textContent = formatCurrency(totalIncome);
    }

    // Function to render the income list from localStorage
    function renderIncomeList() {
        incomeList.innerHTML = ''; // Clear existing table rows
        totalIncome = 0;

        incomes.forEach((income, index) => {
            addIncomeToTable(income, index);
            totalIncome += income.amount; // Add to total income
        });

        updateTotalIncome();
    }

    // Function to add an income row to the table
    function addIncomeToTable(income, index) {
        const row = document.createElement('tr');

        // Source column
        const sourceCell = document.createElement('td');
        sourceCell.textContent = income.source;
        row.appendChild(sourceCell);

        // Amount column
        const amountCell = document.createElement('td');
        amountCell.textContent = formatCurrency(income.amount);
        row.appendChild(amountCell);

        // Date column
        const dateCell = document.createElement('td');
        dateCell.textContent = income.date;
        row.appendChild(dateCell);

        // Delete button
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            deleteIncome(index);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // Append the row to the income list table
        incomeList.appendChild(row);
    }

    // Function to handle form submission
    incomeForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        const source = incomeSource.value.trim();
        const amount = parseFloat(incomeAmount.value.trim());
        const currentDate = new Date().toLocaleDateString(); // Get current date

        if (source !== '' && !isNaN(amount) && amount > 0) {
            const newIncome = { source, amount, date: currentDate };

            // Add new income to the array and localStorage
            incomes.push(newIncome);
            localStorage.setItem('incomes', JSON.stringify(incomes));

            // Add to total income and display
            totalIncome += amount;
            updateTotalIncome();

            // Add the new income to the table
            addIncomeToTable(newIncome, incomes.length - 1);

            // Reset the form
            incomeForm.reset();
        }
    });

    // Function to delete income
    function deleteIncome(index) {
        // Remove the selected income from the array
        const deletedIncome = incomes.splice(index, 1)[0];

        // Update total income
        totalIncome -= deletedIncome.amount;

        // Update localStorage and re-render the income list
        localStorage.setItem('incomes', JSON.stringify(incomes));
        renderIncomeList();
    }

    // Initial render of income list from localStorage
    renderIncomeList();
});

document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalExpensesDisplay = document.getElementById('total-expenses');

    let totalExpenses = 0;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to format amount in currency
    function formatCurrency(amount) {
        return '$' + parseFloat(amount).toFixed(2);
    }

    // Function to update the total expenses display
    function updateTotalExpenses() {
        totalExpensesDisplay.textContent = formatCurrency(totalExpenses);
    }

    // Function to render the expense list from localStorage
    function renderExpenseList() {
        expenseList.innerHTML = ''; // Clear existing table rows
        totalExpenses = 0;

        expenses.forEach((expense, index) => {
            addExpenseToTable(expense, index);
            totalExpenses += expense.amount; // Add to total expenses
        });

        updateTotalExpenses();
    }

    // Function to add an expense row to the table
    function addExpenseToTable(expense, index) {
        const row = document.createElement('tr');

        // Name column
        const nameCell = document.createElement('td');
        nameCell.textContent = expense.name;
        row.appendChild(nameCell);

        // Amount column
        const amountCell = document.createElement('td');
        amountCell.textContent = formatCurrency(expense.amount);
        row.appendChild(amountCell);

        // Date column
        const dateCell = document.createElement('td');
        dateCell.textContent = expense.date;
        row.appendChild(dateCell);

        // Delete button
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            deleteExpense(index);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // Append the row to the expense list table
        expenseList.appendChild(row);
    }

    // Function to handle form submission
    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());
        const currentDate = new Date().toLocaleDateString(); // Get current date

        if (name !== '' && !isNaN(amount) && amount > 0) {
            const newExpense = { name, amount, date: currentDate };

            // Add new expense to the array and localStorage
            expenses.push(newExpense);
            localStorage.setItem('expenses', JSON.stringify(expenses));

            // Add to total expenses and display
            totalExpenses += amount;
            updateTotalExpenses();

            // Add the new expense to the table
            addExpenseToTable(newExpense, expenses.length - 1);

            // Reset the form
            expenseForm.reset();
        }
    });

    // Function to delete an expense
    function deleteExpense(index) {
        // Remove the selected expense from the array
        const deletedExpense = expenses.splice(index, 1)[0];

        // Update total expenses
        totalExpenses -= deletedExpense.amount;

        // Update localStorage and re-render the expense list
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenseList();
    }

    // Initial render of expense list from localStorage
    renderExpenseList();
});
document.addEventListener('DOMContentLoaded', function () {
    const totalIncomeDisplay = document.getElementById('total-income');
    const totalExpensesDisplay = document.getElementById('total-expenses');
    const remainingBudgetDisplay = document.getElementById('remaining-budget');
    const reportList = document.getElementById('report-list');
    const incomePercentageDisplay = document.getElementById('income-percentage');
    const expensePercentageDisplay = document.getElementById('expense-percentage');
    const budgetPercentageDisplay = document.getElementById('budget-percentage');
    const timeFrameSelect = document.getElementById('time-frame'); // Add this line

    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    let totalIncome = 0;
    let totalExpenses = 0;
    let budget = 10000; // Example fixed budget (adjust this value if needed)

    // Function to format amount in currency
    function formatCurrency(amount) {
        return '$' + parseFloat(amount).toFixed(2);
    }

    // Function to calculate the percentages, ensuring it doesn't exceed 100%
    function calculatePercentage(part, total) {
        return total === 0 ? 0 : Math.min((part / total) * 100, 100).toFixed(2);  // Capped at 100%
    }

    // Function to filter records based on the selected time frame
    function filterRecords(records, period) {
        const now = new Date();
        return records.filter(record => {
            const recordDate = new Date(record.date);
            switch (period) {
                case 'weekly':
                    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                    return recordDate >= weekStart;
                case 'monthly':
                    return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
                case 'yearly':
                    return recordDate.getFullYear() === now.getFullYear();
                default:
                    return true; // No filtering
            }
        });
    }

    // Function to render the report list from incomes and expenses
    function renderReportList(period = 'all') {
        reportList.innerHTML = ''; // Clear existing rows

        const filteredIncomes = filterRecords(incomes, period);
        const filteredExpenses = filterRecords(expenses, period);

        filteredIncomes.forEach(income => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${income.name}</td>
                <td>${formatCurrency(income.amount)}</td>
                <td>Income</td>
                <td>${income.date}</td>
            `;
            reportList.appendChild(row);
        });

        filteredExpenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${formatCurrency(expense.amount)}</td>
                <td>Expense</td>
                <td>${expense.date}</td>
            `;
            reportList.appendChild(row);
        });
    }

    // Function to update the dashboard metrics (income, expenses, remaining budget)
    function updateDashboard() {
        // Calculate total income and expenses
        totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        // Update the income, expenses, and remaining budget display
        totalIncomeDisplay.textContent = formatCurrency(totalIncome);
        totalExpensesDisplay.textContent = formatCurrency(totalExpenses);
        remainingBudgetDisplay.textContent = formatCurrency(Math.max(budget - totalExpenses, 0));  // Budget can't go negative

        // Calculate percentages, capping them at 100%
        const incomePercentage = calculatePercentage(totalIncome, budget);
        const expensePercentage = calculatePercentage(totalExpenses, budget);
        const budgetPercentage = calculatePercentage(budget - totalExpenses, budget);

        // Update progress circles and percentage text
        incomePercentageDisplay.textContent = `${incomePercentage}%`;
        expensePercentageDisplay.textContent = `${expensePercentage}%`;
        budgetPercentageDisplay.textContent = `${budgetPercentage}%`;

        // Adjust the stroke-dashoffset for progress circles (capped at 100%)
        const circleProgressElements = document.querySelectorAll('.circle-progress');
        circleProgressElements[0].style.strokeDashoffset = 188.4 - (188.4 * incomePercentage / 100);  // For income
        circleProgressElements[1].style.strokeDashoffset = 188.4 - (188.4 * expensePercentage / 100); // For expenses
        circleProgressElements[2].style.strokeDashoffset = 188.4 - (188.4 * budgetPercentage / 100);  // For remaining budget
    }

    // Update report and dashboard when time frame changes
    timeFrameSelect.addEventListener('change', function () {
        const selectedPeriod = this.value;
        renderReportList(selectedPeriod);
        updateDashboard(); // You may need to adjust this if you want to recalculate for the filtered data
    });

    // Initial render of the report list and dashboard
    renderReportList(); // Pass 'all' to show all initially
    updateDashboard();


 // Handle loan form submission
 loanForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const source = loanSource.value.trim();
    const amount = parseFloat(loanAmount.value.trim());
    const currentDate = new Date().toLocaleDateString(); // Correctly assign the current date

    if (source && !isNaN(amount) && amount > 0) {
        const newLoan = { source, amount, date: currentDate };
        loans.push(newLoan);
        localStorage.setItem('loans', JSON.stringify(loans));
        renderLoanList(); // Render the updated loan list
        loanForm.reset(); // Reset the form after submission
    }
});    

});



