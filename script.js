document.addEventListener("DOMContentLoaded", function () {
    let totalIncome = 0;
    let totalExpenses = 0;
    let totalBudget = 0;

    const incomePercentageEl = document.getElementById('income-percentage');
    const expensePercentageEl = document.getElementById('expense-percentage');
    const budgetPercentageEl = document.getElementById('budget-percentage');

    const incomeProgress = document.querySelector("#income-percentage + svg .circle-progress");
    const expenseProgress = document.querySelector("#expense-percentage + svg .circle-progress");
    const budgetProgress = document.querySelector("#budget-percentage + svg .circle-progress");

    const reportList = document.getElementById("report-list");

    // Load data from localStorage
    function loadData() {
        const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
        const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
        const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];

        incomeData.forEach(entry => addIncomeRow(entry.source, entry.amount, entry.date, false));
        expenseData.forEach(entry => addExpenseRow(entry.name, entry.amount, entry.date, false));
        budgetData.forEach(entry => addBudgetRow(entry.category, entry.amount, entry.spent, false));

        totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
        totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;
        totalBudget = parseFloat(localStorage.getItem("totalBudget")) || 0;

        updateTotals();
        updateProgressBars();
    }

    // Save data to localStorage
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Update totals in the dashboard
    function updateTotals() {
        document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
        document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
        document.getElementById("total-budget").textContent = `$${totalBudget.toFixed(2)}`;
    }

    // Update Progress Bars
    function updateProgressBars() {
        const total = totalIncome + totalExpenses;
        const incomePercent = totalIncome > 0 ? (totalIncome / total) * 100 : 0;
        const expensePercent = totalExpenses > 0 ? (totalExpenses / total) * 100 : 0;
        const budgetPercent = totalBudget > 0 ? ((totalBudget - totalExpenses) / totalBudget) * 100 : 0;

        // Update SVG stroke-dashoffset based on percentage for income
        incomeProgress.style.strokeDashoffset = 188.4 - (188.4 * incomePercent) / 100;
        incomePercentageEl.textContent = `${Math.round(incomePercent)}%`;

        // Update SVG stroke-dashoffset based on percentage for expenses
        expenseProgress.style.strokeDashoffset = 188.4 - (188.4 * expensePercent) / 100;
        expensePercentageEl.textContent = `${Math.round(expensePercent)}%`;

        // Update SVG stroke-dashoffset based on percentage for budget
        budgetProgress.style.strokeDashoffset = 188.4 - (188.4 * budgetPercent) / 100;
        budgetPercentageEl.textContent = `${Math.round(budgetPercent)}%`;
    }

    // Update the report list dynamically
    function updateReportList(category, amount, type, date) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>${type}</td>
            <td>${date}</td>
        `;
        reportList.appendChild(row);
    }

    // Add Income Row
    function addIncomeRow(source, amount, date, save = true) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${source}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>${date}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        document.getElementById("income-list").appendChild(row);

        if (save) {
            const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
            incomeData.push({ source, amount, date });
            saveData("incomeData", incomeData);

            totalIncome += amount;
            localStorage.setItem("totalIncome", totalIncome);
        }

        // Update the report list
        updateReportList(source, amount, 'Income', date);
        updateTotals();
        updateProgressBars();
    }

    // Add Expense Row
    function addExpenseRow(name, amount, date, save = true) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>${date}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        document.getElementById("expense-list").appendChild(row);

        if (save) {
            const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
            expenseData.push({ name, amount, date });
            saveData("expenseData", expenseData);

            totalExpenses += amount;
            localStorage.setItem("totalExpenses", totalExpenses);
        }

        // Update the report list
        updateReportList(name, amount, 'Expense', date);
        updateTotals();
        updateProgressBars();
    }

    // Add Budget Row
    function addBudgetRow(category, amount, spent, save = true) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${category}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>$${spent.toFixed(2)}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        document.getElementById("budget-list").appendChild(row);

        if (save) {
            const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];
            budgetData.push({ category, amount, spent });
            saveData("budgetData", budgetData);

            totalBudget += amount;
            localStorage.setItem("totalBudget", totalBudget);
        }

        updateTotals();
        updateProgressBars();
    }

    // Handle deletion
    function handleDelete(event) {
        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            const table = row.closest('table');
            const amount = parseFloat(row.children[1].textContent.replace('$', ''));
            const date = row.children[2].textContent;

            if (table.id === 'income-list') {
                const source = row.children[0].textContent;
                totalIncome -= amount;
                const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
                const index = incomeData.findIndex(entry => entry.source === source && entry.amount === amount && entry.date === date);
                if (index > -1) incomeData.splice(index, 1);
                saveData("incomeData", incomeData);
            } else if (table.id === 'expense-list') {
                const name = row.children[0].textContent;
                totalExpenses -= amount;
                const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
                const index = expenseData.findIndex(entry => entry.name === name && entry.amount === amount && entry.date === date);
                if (index > -1) expenseData.splice(index, 1);
                saveData("expenseData", expenseData);
            } else if (table.id === 'budget-list') {
                const category = row.children[0].textContent;
                totalBudget -= amount;
                const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];
                const index = budgetData.findIndex(entry => entry.category === category && entry.amount === amount);
                if (index > -1) budgetData.splice(index, 1);
                saveData("budgetData", budgetData);
            }

            row.remove();
            localStorage.setItem("totalIncome", totalIncome);
            localStorage.setItem("totalExpenses", totalExpenses);
            localStorage.setItem("totalBudget", totalBudget);
            updateTotals();
            updateProgressBars();
        }
    }

    document.addEventListener('click', handleDelete);

    // Handle Form Submissions
    const incomeForm = document.getElementById("income-form");
    if (incomeForm) {
        incomeForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const source = this.querySelector("#income-source").value;
            const amount = parseFloat(this.querySelector("#income-amount").value);
            const date = new Date().toLocaleDateString();
            if (source && amount) {
                addIncomeRow(source, amount, date);
                this.reset(); // Reset form after submission
            }
        });
    }

    const expenseForm = document.getElementById("expense-form");
    if (expenseForm) {
        expenseForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = this.querySelector("#expense-name").value;
            const amount = parseFloat(this.querySelector("#expense-amount").value);
            const date = new Date().toLocaleDateString();
            if (name && amount) {
                addExpenseRow(name, amount, date);
                this.reset(); // Reset form after submission
            }
        });
    }

    const budgetForm = document.getElementById("budget-form");
    if (budgetForm) {
        budgetForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const category = this.querySelector("#category").value;
            const amount = parseFloat(this.querySelector("#amount").value);
            const spent = 0; // Assuming initial spent is zero
            if (category && amount) {
                addBudgetRow(category, amount, spent);
                this.reset(); // Reset form after submission
            }
        });
    }
// Fetch and display the user profile when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const userEmail = localStorage.getItem("userEmail") || "default@example.com"; // Get email from login

    // Fetch user data from the backend API
    fetch(`http://localhost:8080/your-project/userprofile?email=${userEmail}`)
        .then(response => response.json())
        .then(user => {
            if (user.error) {
                console.error('User not found');
            } else {
                // Populate form fields with user data
                document.getElementById("username").value = user.username;
                document.getElementById("email").value = user.email;
                document.getElementById("phone").value = user.phone;
                document.getElementById("address").value = user.address;
                document.getElementById("bio").value = user.bio;
                document.getElementById("preferences").value = user.preferences;
            }
        })
        .catch(error => console.error('Error fetching user profile:', error));
});

// Update user profile and save it to the backend
document.getElementById("profile-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const bio = document.getElementById("bio").value;
    const preferences = document.getElementById("preferences").value;
    const password = document.getElementById("password").value;

    const userProfile = { username, email, phone, address, bio, preferences, password };

    // Save user data to the backend API
    fetch('http://localhost:8080/your-project/userprofile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(userProfile).toString(),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || "Profile updated successfully!");
        })
        .catch(error => console.error('Error updating user profile:', error));
});

    // Load the saved data on page load
    loadData();
});
