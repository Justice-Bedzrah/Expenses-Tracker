const expenseForm = document.querySelector('#expense-form');
const expenseName = document.querySelector('#expense-name');
const expenseAmount = document.querySelector('#expense-amount');
const categorySelect = document.querySelector('#category-select');
const totalSpent = document.querySelector('#total-spent');
const filterCategory= document.querySelector('#filter-category');
const expenseList = document.querySelector('#expense-list');

let expenses = JSON.parse(localStorage.getItem('expensesData')) || [];


expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newExpense = {
        id: Date.now(),
        name: expenseName.value,
        amount: Number(expenseAmount.value),
        category: categorySelect.value
    };

    expenses = [...expenses, newExpense];
    localStorage.setItem('expensesData', JSON.stringify(expenses))
    renderExpenses(expenses);
    expenseForm.reset();
})

function renderExpenses(expenseArray){
    expenseList.innerHTML = '';

    expenseArray.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `<span> ${expense.name} - $${expense.amount} </span>
        <button class="delete-btn" data-id="${expense.id}"> Delete Button </button>`

        expenseList.appendChild(li);
    })
    updateTotal(expenseArray);
}

expenseList.addEventListener('click', (e) => {
   if( e.target.classList.contains('delete-btn'))
     {
    const targetId = Number(e.target.dataset.id);
    expenses = expenses.filter(expense => expense.id !== targetId);
    localStorage.setItem('expensesData', JSON.stringify(expenses));
    renderExpenses(expenses);
   }
})
renderExpenses(expenses)

filterCategory.addEventListener('change', (e) => {
    const selectedCategory = e.target.value
    if(selectedCategory === 'All') {
        renderExpenses(expenses)
    } else {
        const filteredExpenses = expenses.filter(expense => expense.category === selectedCategory)
        renderExpenses(filteredExpenses)
    }
})

function updateTotal (expensesArray) {
    const totalExpense = expensesArray.reduce((acc, expense) => {
        return acc + expense.amount
    }, 0)

    totalSpent.textContent = `${totalExpense.toFixed(2)}`
};