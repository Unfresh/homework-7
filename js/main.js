let buttonStart = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    buttonFirstExpenses = document.getElementsByTagName('button')[0],
    buttonSecondExpenses = document.getElementsByTagName('button')[1],
    buttonCount = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkbox = document.querySelector('#savings'),
    inputSumm = document.querySelector('#sum'),
    inputPercent = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
    console.log(optionalExpensesItem); 

let money,
    time;

buttonFirstExpenses.disabled = true;    
buttonSecondExpenses.disabled = true;
buttonCount.disabled = true;

buttonStart.addEventListener('click', function() {
    buttonFirstExpenses.disabled = false;    
    buttonSecondExpenses.disabled = false;
    buttonCount.disabled = false;
    time = prompt("Введите дату в формате YYYY-MM-DD", "2020-10-05");
    money = +prompt("Ваш бюджет на месяц?");
    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
    }
    appData.timeData = time;
    appData.budget = money;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

buttonFirstExpenses.addEventListener('click', function() {
    let summ = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let monthCost = expensesItem[i].value,
            totalCost = +expensesItem[++i].value;
        if ( (typeof(monthCost) === 'string') && (monthCost != ' ') && (totalCost != ' ') && (typeof(monthCost) != null) && (typeof(totalCost) != null) && monthCost.length !== 0) {
            appData.expenses[monthCost] = totalCost;
            summ += +totalCost;
            console.log(summ);
        } else {
            i--;
        }
    }
    expensesValue.textContent = summ;
});

buttonSecondExpenses.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let otherCosts = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = otherCosts;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

buttonCount.addEventListener('click', function() {
   
    appData.moneyPerDay =  +((money - (+expensesValue.textContent))/30).toFixed();
    if(isNaN(money)) {
        daybudgetValue.textContent = 'Что то пошло не так';
    } else {
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'У вас минимальный уровень достатка';
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 1000) {
            levelValue.textContent = 'У вас средний уровень достатка';
        } else if (appData.moneyPerDay >= 1000) {
            levelValue.textContent = 'У вас высокий уровень достатка';
        } else {
            levelValue.textContent = 'Что то пошло не так';
        }
        daybudgetValue.textContent = appData.moneyPerDay;
    }
});

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value,
        cloneItems;
    if ( (typeof(items) === 'string') ) {
        cloneItems = items;
        items = +items;
        if(isNaN(items)) {
            items = cloneItems;
            appData.income = items.split(', ');
        } else {
            alert('Введена неверная информация, попробуйте снова.');
            this.chooseIncome ();
        }
    } else {
            alert('Введена неверная информация, попробуйте снова.');
            this.chooseIncome ();
    }
    incomeValue.textContent = appData.income;
});

checkbox.addEventListener('click', function() {
    if (appData.savings) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

inputSumm.addEventListener('input', function() {
    if(appData.savings) {
        let sum = +inputSumm.value;
        let percent = +inputPercent.value;
        appData.monthIncome = +(sum/100/12*percent).toFixed();
        appData.yearIncome = +(sum/100*percent).toFixed();

        monthsavingsValue.textContent = appData.monthIncome;
        yearsavingsValue.textContent = appData.yearIncome;
    }
});

inputPercent.addEventListener('input', function() {
    if(appData.savings) {
        let sum = +inputSumm.value;
        let percent = +inputPercent.value;
        appData.monthIncome = +(sum/100/12*percent).toFixed(2);
        appData.yearIncome = +(sum/100*percent).toFixed(2);

        monthsavingsValue.textContent = appData.monthIncome;
        yearsavingsValue.textContent = appData.yearIncome;
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses : {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
    // список данных ключей
    console.log('- ' + key);

    //список данных ключ + значение
    // console.log(appData[key]);
}

