import {cleanHtml, deleteExpense} from './functions.js';
const listExpenses = document.querySelector('#list-expense ul');
const form = document.querySelector('#form');

class UI {
    insertBudget( userbudget ) {
        const { budget, remaining } = userbudget;
        document.querySelector('#total').textContent = budget;
        document.querySelector('#remaining').textContent = remaining;
    }

    printAlert(message, type) {
        const divMenssage = document.createElement('div');
        divMenssage.classList.add('text-center', 'alert');
        if(type === 'error') {
            divMenssage.classList.add('alert-danger');
        } else {
            divMenssage.classList.add('alert-success');
        }

        divMenssage.textContent = message;
        document.querySelector('#form').appendChild(divMenssage);

        setTimeout(() => {
            divMenssage.remove();
        }, 3000);
    }

    showExpenses(expenses) {
        
        cleanHtml(listExpenses);
        expenses.forEach( expense => {
            const { expenseValue, amountValue, id } = expense;
            //li
            const newExpense = document.createElement('li');
            newExpense.classList.add('list-group-item','d-flex', 'justify-content-between');
            newExpense.dataset.id = id;
            newExpense.innerHTML = `${expenseValue} <span class="badge badge-primary badge-pill d-flex align-items-center"> $ ${amountValue} </span>`;
            //delete button
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger');
            btnDelete.innerHTML = 'Delete &times;'
            btnDelete.onclick = () => deleteExpense(id);
            newExpense.appendChild(btnDelete);
            listExpenses.appendChild(newExpense);
        })
    }

    updateRemaining(remaining) {
        document.querySelector('#remaining').textContent = remaining;
        form.querySelector('button[type="submit"]').disabled = false;
    }

    checkBudget(mybudget) {
        const { budget, remaining } = mybudget;
        const remainingDiv = document.querySelector('#remainingDiv');

        if( ( budget / 4 ) >= remaining ) {
            remainingDiv.classList.remove('alert-success', 'alert-warning');
            remainingDiv.classList.add('alert-danger');
        } else if ((budget / 2) >= remaining ) {
            remainingDiv.classList.remove('alert-success', 'alert-danger');
            remainingDiv.classList.add('alert-warning');
        } else {
            remainingDiv.classList.remove('alert-danger', 'alert-warning');
            remainingDiv.classList.add('alert-success');
        }
        if(remaining <= 0) {
            this.printAlert('The budget is in red numbers', 'error');
            form.querySelector('button[type="submit"]').disabled = true;
        }
    }
}


export default UI;