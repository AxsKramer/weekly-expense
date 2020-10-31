import UI from './UI.js';
import Budget from './Budget.js';

let budget;
const form = document.querySelector('#form');

const ui = new UI();

export function askBudget(){
    const userBudget = prompt('What is your budget?');
    if(userBudget === '' || userBudget === null || isNaN(userBudget) || userBudget <= 0){
        window.location.reload();
    }
    //Valid budget
    budget = new Budget(userBudget);
    ui.insertBudget(budget);
}

export function addExpense(event){
    event.preventDefault();
    const expenseValue = document.querySelector('#expense').value;
    const amountValue = parseInt(document.querySelector('#amount').value);
    if(expenseValue === '' || amountValue === ''){
        ui.printAlert('Both field are required', 'error');
        return;
    }
    else if(amountValue <= 0 || isNaN(amountValue)){
        ui.printAlert('Invalid amount', 'error');
        return;
    }
    else{
        const expense = {
            expenseValue,
            amountValue,
            id: Date.now()
        }
        budget.newExpense(expense);
        ui.printAlert('The expense has been added successfully');
        const { expenses, remaining} = budget;
        ui.showExpenses(expenses);
        ui.updateRemaining(remaining);
        ui.checkBudget(budget);
        form.reset();
    }
}

export function deleteExpense(id){
    budget.deleteExpense(id);
    const { expenses, remaining} = budget;
    ui.showExpenses(expenses);
    ui.updateRemaining(remaining);
    ui.checkBudget(budget);
}

export function cleanHtml(listElement) {
    while( listElement.firstChild ) {
        listElement.removeChild(listElement.firstChild);
    }
}