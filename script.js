document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expenseForm");
  const expenseList = document.getElementById("expenseList");
  const totalAmount = document.getElementById("totalAmount");
  const categoryFilter = document.getElementById("categoryFilter");

  let expenses = [];

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;

    if (name && amount > 0) {
      const expense = { name, amount, category };
      expenses.push(expense);

      renderExpenses();
      calculateTotal();
      expenseForm.reset();
    }
  });

  categoryFilter.addEventListener("change", function () {
    renderExpenses();
  });

  function renderExpenses() {
    const filter = categoryFilter.value;
    expenseList.innerHTML = "";

    const filteredExpenses =
      filter === "All"
        ? expenses
        : expenses.filter((exp) => exp.category === filter);

    filteredExpenses.forEach((expense, index) => {
      const expenseItem = document.createElement("div");
      expenseItem.classList.add("expense-item");
      expenseItem.innerHTML = `
                <span>${expense.name} - $${expense.amount} (${expense.category})</span>
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
      expenseList.appendChild(expenseItem);
    });
  }

  function calculateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
  }

  window.deleteExpense = function (index) {
    expenses.splice(index, 1);
    renderExpenses();
    calculateTotal();
  };
});
