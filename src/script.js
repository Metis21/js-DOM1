const firstInput = document.getElementById('firstNumber');
const secondInput = document.getElementById('secondNumber');
const resultBlock = document.getElementById('result');
const clearButton = document.getElementById('clearButton');
const operationButtons = document.querySelectorAll('.calculator__button');

function isValidNumber(text) {
    const digits = '0123456789';
    let hasDigit = false;
    let hasDot = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (digits.includes(char)) {
            hasDigit = true;
        } else if (char === '.' && !hasDot) {
            hasDot = true;
        } else if (char === '-' && i === 0) {
            continue;
        } else {
            return false;
        }
    }

    return hasDigit;
}

function readNumber(input) {
    const text = input.value.trim().split(',').join('.');

    if (text === '' || !isValidNumber(text)) {
        input.classList.add('calculator__input--error');
        return null;
    }

    input.classList.remove('calculator__input--error');
    return Number(text);
}

function calculate(a, b, operation) {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}

function formatResult(value) {
    if (Number.isInteger(value)) {
        return String(value);
    }

    return String(Math.round(value * 100) / 100);
}

function showResult(text, isError) {
    resultBlock.textContent = text;
    resultBlock.classList.remove('calculator__result--success', 'calculator__result--error');
    resultBlock.classList.add(isError ? 'calculator__result--error' : 'calculator__result--success');
}

function handleOperation(event) {
    const operation = event.target.dataset.operation;
    const firstEmpty = firstInput.value.trim() === '';
    const secondEmpty = secondInput.value.trim() === '';
    const a = readNumber(firstInput);
    const b = readNumber(secondInput);

    if (firstEmpty || secondEmpty) {
        showResult('Помилка: заповніть обидва поля', true);
        return;
    }

    if (a === null || b === null) {
        showResult('Помилка: введіть коректні числа (лише цифри, мінус і крапка)', true);
        return;
    }

    if (operation === '/' && b === 0) {
        secondInput.classList.add('calculator__input--error');
        showResult('Помилка: ділити на нуль не можна', true);
        return;
    }

    const result = calculate(a, b, operation);
    showResult(`${a} ${event.target.textContent} ${b} = ${formatResult(result)}`, false);
}

operationButtons.forEach(button => {
    button.addEventListener('click', handleOperation);
});

clearButton.addEventListener('click', () => {
    firstInput.value = '';
    secondInput.value = '';
    firstInput.classList.remove('calculator__input--error');
    secondInput.classList.remove('calculator__input--error');
    resultBlock.textContent = "Результат з'явиться тут";
    resultBlock.classList.remove('calculator__result--success', 'calculator__result--error');
    firstInput.focus();
});
