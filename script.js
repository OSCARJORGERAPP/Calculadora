class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    percent() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = current / 100;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand || '0';
        if (this.operation != null) {
            this.previousOperandElement.innerText =
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = this.previousOperand;
        }
    }
}

const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Botones de números
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
    });
});

// Botones de operadores
document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
    });
});

// Botones de acciones
document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
        switch (button.dataset.action) {
            case 'clear':
                calculator.clear();
                break;
            case 'delete':
                calculator.delete();
                break;
            case 'percent':
                calculator.percent();
                break;
            case 'calculate':
                calculator.compute();
                break;
        }
    });
});

// Soporte para teclado
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') calculator.appendNumber(e.key);
    if (e.key === '.') calculator.appendNumber(e.key);
    if (e.key === '+' || e.key === '-') {
        e.preventDefault();
        calculator.chooseOperation(e.key);
    }
    if (e.key === '*') {
        e.preventDefault();
        calculator.chooseOperation(e.key);
    }
    if (e.key === '/') {
        e.preventDefault();
        calculator.chooseOperation(e.key);
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.compute();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        calculator.delete();
    }
    if (e.key === 'Escape') {
        e.preventDefault();
        calculator.clear();
    }
});
