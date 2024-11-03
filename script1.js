document.addEventListener("DOMContentLoaded", function () {
    let totalIncome = 0;
    let totalExpenses = 0;
    let totalBudget = 0;

    // Load data from localStorage
    function loadData() {
        const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
        const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
        const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];

        incomeData.forEach(entry => addIncomeRow(entry.source, entry.amount, entry.date, false));
        expenseData.forEach(entry => addExpenseRow(entry.name, entry.amount, entry.date, false));
        budgetData.forEach(entry => addBudgetRow(entry.category, entry.amount, entry.spent, false));

        // Load totals from localStorage
        totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
        totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;
        totalBudget = parseFloat(localStorage.getItem("totalBudget")) || 0;

        updateTotals();
    }

    // Save data to localStorage
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Update total display function
    function updateTotals() {
        document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
        document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
        document.getElementById("total-budget").textContent = `$${totalBudget.toFixed(2)}`;
    }

    // Add Income Row
    function addIncomeRow(source, amount, date, save = true) {
        const row = `<tr><td>${source}</td><td>$${amount.toFixed(2)}</td><td>${date}</td></tr>`;
        document.getElementById("income-list").insertAdjacentHTML("beforeend", row);

        if (save) {
            const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
            incomeData.push({ source, amount, date });
            saveData("incomeData", incomeData);

            totalIncome += amount;
            localStorage.setItem("totalIncome", totalIncome);
        }

        updateTotals();
    }

    // Add Expense Row
    function addExpenseRow(name, amount, date, save = true) {
        const row = `<tr><td>${name}</td><td>$${amount.toFixed(2)}</td><td>${date}</td></tr>`;
        document.getElementById("expense-list").insertAdjacentHTML("beforeend", row);

        if (save) {
            const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
            expenseData.push({ name, amount, date });
            saveData("expenseData", expenseData);

            totalExpenses += amount;
            localStorage.setItem("totalExpenses", totalExpenses);
        }

        updateTotals();
    }

    // Add Budget Row
    function addBudgetRow(category, amount, spent, save = true) {
        const row = `<tr><td>${category}</td><td>$${amount.toFixed(2)}</td><td>$${spent.toFixed(2)}</td></tr>`;
        document.getElementById("budget-list").insertAdjacentHTML("beforeend", row);

        if (save) {
            const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];
            budgetData.push({ category, amount, spent });
            saveData("budgetData", budgetData);

            totalBudget += amount;
            localStorage.setItem("totalBudget", totalBudget);
        }

        updateTotals();
    }

    // Handle Income Form Submission
    const incomeForm = document.getElementById("income-form");
    if (incomeForm) {
        incomeForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const source = this.querySelector("#income-source").value;
            const amount = parseFloat(this.querySelector("#income-amount").value);
            const date = new Date().toLocaleDateString();
            if (source && amount) {
                addIncomeRow(source, amount, date);
                incomeForm.reset(); // Reset the form
            }
        });
    }

    // Handle Expense Form Submission
    const expenseForm = document.getElementById("expense-form");
    if (expenseForm) {
        expenseForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = this.querySelector("#expense-name").value;
            const amount = parseFloat(this.querySelector("#expense-amount").value);
            const date = new Date().toLocaleDateString();
            if (name && amount) {
                addExpenseRow(name, amount, date);
                expenseForm.reset(); // Reset the form
            }
        });
    }

    // Handle Budget Form Submission
    const budgetForm = document.getElementById("budget-form");
    if (budgetForm) {
        budgetForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const category = this.querySelector("#budget-category").value;
            const amount = parseFloat(this.querySelector("#budget-amount").value);
            const spent = 0;
            if (category && amount) {
                addBudgetRow(category, amount, spent);
                budgetForm.reset(); // Reset the form
            }
        });
    }

    // Load data when the page loads
    loadData();
});

// document.addEventListener("DOMContentLoaded", function () {
//     let totalIncome = 0;
//     let totalExpenses = 0;
//     let totalBudget = 0;

//     // Load data from localStorage on page load
//     function loadData() {
//         const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
//         const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
//         const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];

//         incomeData.forEach((entry, index) => addIncomeRow(entry.source, entry.amount, entry.date, index, false));
//         expenseData.forEach((entry, index) => addExpenseRow(entry.name, entry.amount, entry.date, index, false));
//         budgetData.forEach((entry, index) => addBudgetRow(entry.category, entry.amount, entry.spent, index, false));

//         totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
//         totalExpenses = expenseData.reduce((acc, curr) => acc + curr.amount, 0);
//         totalBudget = budgetData.reduce((acc, curr) => acc + curr.amount, 0);

//         updateTotals();
//     }

//     // Save data to localStorage
//     function saveData(key, data) {
//         localStorage.setItem(key, JSON.stringify(data));
//     }

//     // Update total income, expenses, and budget
//     function updateTotals() {
//         document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
//         document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
//         document.getElementById("total-budget").textContent = `$${totalBudget.toFixed(2)}`;
//     }

//     // Add Income Row with Delete Button
//     function addIncomeRow(source, amount, date, index, save = true) {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${source}</td>
//             <td>$${amount.toFixed(2)}</td>
//             <td>${date}</td>
//             <td><button class="delete-income">Delete</button></td>
//         `;
//         document.getElementById("income-list").appendChild(row);

//         if (save) {
//             const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
//             incomeData.push({ source, amount, date });
//             saveData("incomeData", incomeData);
//             totalIncome += amount;
//         }

//         updateTotals();

//         // Handle delete
//         row.querySelector(".delete-income").addEventListener("click", function () {
//             deleteEntry("incomeData", index, amount, "income");
//         });
//     }

//     // Add Expense Row with Delete Button
//     function addExpenseRow(name, amount, date, index, save = true) {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${name}</td>
//             <td>$${amount.toFixed(2)}</td>
//             <td>${date}</td>
//             <td><button class="delete-expense">Delete</button></td>
//         `;
//         document.getElementById("expense-list").appendChild(row);

//         if (save) {
//             const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
//             expenseData.push({ name, amount, date });
//             saveData("expenseData", expenseData);
//             totalExpenses += amount;
//         }

//         updateTotals();

//         // Handle delete
//         row.querySelector(".delete-expense").addEventListener("click", function () {
//             deleteEntry("expenseData", index, amount, "expense");
//         });
//     }

//     // Add Budget Row with Delete Button
//     function addBudgetRow(category, amount, spent, index, save = true) {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${category}</td>
//             <td>$${amount.toFixed(2)}</td>
//             <td>$${spent.toFixed(2)}</td>
//             <td><button class="delete-budget">Delete</button></td>
//         `;
//         document.getElementById("budget-list").appendChild(row);

//         if (save) {
//             const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];
//             budgetData.push({ category, amount, spent });
//             saveData("budgetData", budgetData);
//             totalBudget += amount;
//         }

//         updateTotals();

//         // Handle delete
//         row.querySelector(".delete-budget").addEventListener("click", function () {
//             deleteEntry("budgetData", index, amount, "budget");
//         });
//     }

//     // Delete Entry from the table and localStorage
//     function deleteEntry(key, index, amount, type) {
//         let data = JSON.parse(localStorage.getItem(key)) || [];
//         data.splice(index, 1); // Remove the item from array
//         saveData(key, data);

//         if (type === "income") {
//             totalIncome -= amount;
//         } else if (type === "expense") {
//             totalExpenses -= amount;
//         } else if (type === "budget") {
//             totalBudget -= amount;
//         }

//         updateTotals();
//         location.reload(); // Reload to re-render the updated data
//     }

//     // Income form submission
//     document.getElementById("income-form").addEventListener("submit", function (e) {
//         e.preventDefault();
//         const source = document.getElementById("income-source").value;
//         const amount = parseFloat(document.getElementById("income-amount").value);
//         const date = new Date().toLocaleDateString();
//         addIncomeRow(source, amount, date, undefined);
//         this.reset();
//     });

//     // Expense form submission
//     document.getElementById("expense-form").addEventListener("submit", function (e) {
//         e.preventDefault();
//         const name = document.getElementById("expense-name").value;
//         const amount = parseFloat(document.getElementById("expense-amount").value);
//         const date = new Date().toLocaleDateString();
//         addExpenseRow(name, amount, date, undefined);
//         this.reset();
//     });

//     // Budget form submission
//     document.getElementById("budget-form").addEventListener("submit", function (e) {
//         e.preventDefault();
//         const category = document.getElementById("budget-category").value;
//         const amount = parseFloat(document.getElementById("budget-amount").value);
//         const spent = 0;
//         addBudgetRow(category, amount, spent, undefined);
//         this.reset();
//     });

//     // Load data on page load
//     loadData();
// });


// document.addEventListener("DOMContentLoaded", function () { 
//     let totalIncome = 0;
//     let totalExpenses = 0;
//     let totalBudget = 0;

//     // Load data from localStorage
//     function loadData() {
//         const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
//         const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
//         const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];

//         incomeData.forEach(entry => addIncomeRow(entry.source, entry.amount, entry.date, false));
//         expenseData.forEach(entry => addExpenseRow(entry.name, entry.amount, entry.date, false));
//         budgetData.forEach(entry => addBudgetRow(entry.category, entry.amount, entry.spent, false));

//         totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
//         totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;
//         totalBudget = parseFloat(localStorage.getItem("totalBudget")) || 0;

//         updateTotals();
//     }

//     // Save data to localStorage
//     function saveData(key, data) {
//         localStorage.setItem(key, JSON.stringify(data));
//     }

//     // Update totals in dashboard and reports
//     function updateTotals() {
//         document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
//         document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
//         document.getElementById("total-budget").textContent = `$${totalBudget.toFixed(2)}`;
//         updateReportSummary();
//     }

//     // Function to calculate total expenses
//     function calculateTotalExpenses() {
//         let total = 0;
//         const rows = document.querySelectorAll("#expense-list tr");
//         rows.forEach(row => {
//             const amountCell = row.querySelector("td:nth-child(2)");
//             if (amountCell) {
//                 const amount = parseFloat(amountCell.textContent.replace('$', ''));
//                 total += amount;
//             }
//         });
//         totalExpenses = total;
//         document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
//     }

//     // Function to calculate total budget
//     function calculateTotalBudget() {
//         let total = 0;
//         const rows = document.querySelectorAll("#budget-list tr");
//         rows.forEach(row => {
//             const amountCell = row.querySelector("td:nth-child(2)");
//             if (amountCell) {
//                 const amount = parseFloat(amountCell.textContent.replace('$', ''));
//                 total += amount;
//             }
//         });
//         totalBudget = total;
//         document.getElementById("total-budget").textContent = `$${totalBudget.toFixed(2)}`;
//     }

//     // Update report summary
//     function updateReportSummary() {
//         const reportSummary = `
//             Total Income: $${totalIncome.toFixed(2)}\n
//             Total Expenses: $${totalExpenses.toFixed(2)}\n
//             Total Budget: $${totalBudget.toFixed(2)}
//         `;
//         document.getElementById("report-summary").textContent = reportSummary;
//     }

//     // Add Income Row
//     function addIncomeRow(source, amount, date, save = true) {
//         const row = `<tr><td>${source}</td><td>$${amount.toFixed(2)}</td><td>${date}</td><td><button class="delete-btn">Delete</button></td></tr>`;
//         document.getElementById("income-list").insertAdjacentHTML("beforeend", row);

//         if (save) {
//             const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
//             incomeData.push({ source, amount, date });
//             saveData("incomeData", incomeData);

//             totalIncome += amount;
//             localStorage.setItem("totalIncome", totalIncome);
//         }

//         updateTotals();
//     }

//     // Add Expense Row
//     function addExpenseRow(name, amount, date, save = true) {
//         const row = `<tr><td>${name}</td><td>$${amount.toFixed(2)}</td><td>${date}</td><td><button class="delete-btn">Delete</button></td></tr>`;
//         document.getElementById("expense-list").insertAdjacentHTML("beforeend", row);

//         if (save) {
//             const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
//             expenseData.push({ name, amount, date });
//             saveData("expenseData", expenseData);

//             totalExpenses += amount;
//             localStorage.setItem("totalExpenses", totalExpenses);
//         }

//         calculateTotalExpenses();
//         updateTotals();
//     }

//     // Add Budget Row
//     function addBudgetRow(category, amount, spent, save = true) {
//         const row = `<tr><td>${category}</td><td>$${amount.toFixed(2)}</td><td>$${spent.toFixed(2)}</td><td><button class="delete-btn">Delete</button></td></tr>`;
//         document.getElementById("budget-list").insertAdjacentHTML("beforeend", row);

//         if (save) {
//             const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];
//             budgetData.push({ category, amount, spent });
//             saveData("budgetData", budgetData);

//             totalBudget += amount;
//             localStorage.setItem("totalBudget", totalBudget);
//         }

//         calculateTotalBudget();
//         updateTotals();
//     }

//     // Handle deletion
//     function handleDelete(event) {
//         if (event.target.classList.contains('delete-btn')) {
//             const row = event.target.closest('tr');
//             const table = row.closest('table');
//             const amount = parseFloat(row.children[1].textContent.replace('$', ''));
//             const type = table.id;

//             row.remove();

//             if (type === 'income-list') {
//                 totalIncome -= amount;
//                 localStorage.setItem("totalIncome", totalIncome);
//                 const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
//                 incomeData.splice([...table.rows].indexOf(row), 1);
//                 saveData("incomeData", incomeData);
//             } else if (type === 'expense-list') {
//                 totalExpenses -= amount;
//                 localStorage.setItem("totalExpenses", totalExpenses);
//                 const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
//                 expenseData.splice([...table.rows].indexOf(row), 1);
//                 saveData("expenseData", expenseData);
//                 calculateTotalExpenses();
//             } else if (type === 'budget-list') {
//                 totalBudget -= amount;
//                 localStorage.setItem("totalBudget", totalBudget);
//                 const budgetData = JSON.parse(localStorage.getItem("budgetData")) || [];
//                 budgetData.splice([...table.rows].indexOf(row), 1);
//                 saveData("budgetData", budgetData);
//                 calculateTotalBudget();
//             }

//             updateTotals();
//         }
//     }

//     document.addEventListener('click', handleDelete);

//     // Handle Form Submissions
//     const incomeForm = document.getElementById("income-form");
//     if (incomeForm) {
//         incomeForm.addEventListener("submit", function (e) {
//             e.preventDefault();
//             const source = this.querySelector("#income-source").value;
//             const amount = parseFloat(this.querySelector("#income-amount").value);
//             const date = new Date().toLocaleDateString();
//             if (source && amount) {
//                 addIncomeRow(source, amount, date);
//                 incomeForm.reset(); // Reset form after submission
//             }
//         });
//     }

//     const expenseForm = document.getElementById("expense-form");
//     if (expenseForm) {
//         expenseForm.addEventListener("submit", function (e) {
//             e.preventDefault();
//             const name = this.querySelector("#expense-name").value;
//             const amount = parseFloat(this.querySelector("#expense-amount").value);
//             const date = new Date().toLocaleDateString();
//             if (name && amount) {
//                 addExpenseRow(name, amount, date);
//                 expenseForm.reset(); // Reset form after submission
//             }
//         });
//     }

//     const budgetForm = document.getElementById("budget-form");
//     if (budgetForm) {
//         budgetForm.addEventListener("submit", function (e) {
//             e.preventDefault();
//             const category = this.querySelector("#budget-category").value;
//             const amount = parseFloat(this.querySelector("#budget-amount").value);
//             const spent = 0;
//             if (category && amount) {
//                 addBudgetRow(category, amount, spent);
//                 budgetForm.reset(); // Reset form after submission
//             }
//         });
//     }

//     // Load the saved data on page load
//     loadData();
// });
