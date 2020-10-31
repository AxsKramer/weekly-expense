class Budget {

    constructor(budget) {
        this.budget = Number(budget);
        this.remaining = Number(budget);
        this.expenses = [];
    }

    newExpense(expense) {
        this.expenses = [...this.expenses, expense];
        this.calRemaining();
    }

    calRemaining() {
        const spentMoney = this.expenses.reduce( (total, expense ) => total + expense.amountValue,  0 );
        this.remaining = this.budget - spentMoney;
    }

    deleteExpense(id) {
        this.expenses = this.expenses.filter( expense => expense.id !== id );
        this.calRemaining();
    }
}

export default Budget;