let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const type = document.getElementById("type");
const description = document.getElementById("description");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const addBtn = document.getElementById("add-btn");
const transactionBody = document.getElementById("transaction-body");

const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const netBalance = document.getElementById("net-balance");

addBtn.addEventListener("click", () => {
  if (!type.value || !description.value || !category.value || !amount.value || !date.value) {
    alert("Please fill all fields correctly.");
    return;
  }

  const transaction = {
    type: type.value,
    description: description.value,
    category: category.value,
    amount: parseFloat(amount.value),
    date: date.value
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  resetForm();
  renderTable();
});

function resetForm() {
  type.value = "";
  description.value = "";
  category.value = "";
  amount.value = "";
  date.value = "";
}

function renderTable() {
  transactionBody.innerHTML = "";
  let income = 0, expense = 0;

  transactions.forEach((t, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.type}</td>
      <td>${t.description}</td>
      <td>${t.category}</td>
      <td>₹${t.amount.toFixed(2)}</td>
      <td>${t.date}</td>
      <td><button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button></td>
    `;
    transactionBody.appendChild(row);

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  totalIncome.textContent = `₹${income.toFixed(2)}`;
  totalExpense.textContent = `₹${expense.toFixed(2)}`;
  netBalance.textContent = `₹${(income - expense).toFixed(2)}`;
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTable();
}

renderTable(); // Initialize
