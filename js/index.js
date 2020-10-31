import {askBudget, addExpense} from './functions.js';

const form = document.querySelector('#form');
document.addEventListener('DOMContentLoaded', askBudget);
form.addEventListener('submit', addExpense);


