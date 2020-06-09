const tab1 = document.querySelector('.tab1');
const tab2 = document.querySelector('.tab2');
const tab3 = document.querySelector('.tab3');
const allExpenses = document.querySelector('#allExpenses');
const allIncomes = document.querySelector('#allIncomes');
const allRecords = document.querySelector('#allRecords');
const exp_title = document.querySelector('#exp_title');
const exp_amount = document.querySelector('#exp_amount');
const income_title = document.querySelector('#income_title');
const income_amount = document.querySelector('#income_amount');
const BalanceVal = document.querySelector('.balance_value');
const IncomeVal = document.querySelector('.income_value');
const ExpenseVal = document.querySelector('.expense_value');
const items = JSON.parse(localStorage.getItem('entries'))||[];
const addExp = document.querySelector('#add_exp');
const addIncome = document.querySelector('#add_income');
const allList = document.querySelector('#allRecords .listrec');
const incomeList = document.querySelector('#allIncomes .list');
const expenseList = document.querySelector('#allExpenses .list');
const button = document.querySelector(".button");
const modetext = document.querySelector('.modetext');
const body = document.querySelector("body");
const editBg = document.querySelector("#edit");
const delBg = document.querySelector("#delete");
const time = document.querySelector(".nameTag .time");
const date = document.querySelector(".nameTag .date");
const dashboardP = document.querySelector(".dashboard p");

let balance = 0;
let totalIncome = 0;
let totalExpense = 0;
// const edit = document.querySelector("ul.list li #edit");

// edit.addEventListener('click', function(e){
//     console.log(e);
// });


updateApp();
setInterval(runTime, 100);

function LoadData(list, type, title, amount, id){
    
    const position = "afterbegin";

    if(body.classList.contains("dark")){

        let entry = `<li id="${id}" class="${type}">
        <div class="entry">${title}: $${amount}</div>
        <div id="edit" class="darkEditBg"></div>
        <div id="delete" class="darkDelBg"></div>
        </li>`;
        list.insertAdjacentHTML(position, entry);

    }else{

        entry = `<li id="${id}" class="${type}">
        <div class="entry">${title}: $${amount}</div>
        <div id="edit" class="lightEditBg" ></div>
        <div id="delete" class="lightDelBg"></div>
        </li>`;
        list.insertAdjacentHTML(position, entry);

    }
   
};
function runTime(){
    const DTime =new Date().toLocaleTimeString();
    const DDate = new Date().toLocaleDateString();
    time.textContent = `${DTime}`;
    date.textContent = `${DDate}`;
    const sec = new Date().getHours();
    if(sec == 0 || sec <= 4){
        dashboardP.innerHTML = '<p>It\'s Midnight, Go back to Bed <span>&#128580</span></p>';
    }else if(sec <= 11){
        dashboardP.innerHTML = '<p>Good Morning <span>&#128513</span>, welcome back</p>';
    }else if(sec <= 16){
        dashboardP.innerHTML = '<p>Good Afternoon <span>&#128526</span> welcome back</p>';
    }else if(sec < 22){
        dashboardP.innerHTML = '<p>Good Evening <span>&#128540</span>, welcome back</p>';
    }else{
        dashboardP.innerHTML = '<p>It\'s late<span>&#128564</span> <br> you should get some sleep</p>';
    }
    
}
function CalcTotal(type, array){
    let sum = 0;
    for(let i of array){
        if (i.type == type){
            sum += i.amount;
        };
    };
    return sum;
};

function clearInputs(elements){
   elements.forEach(element => {
       element.value = "";
   });
};

function clearList(elements){
    elements.forEach(element => {
        element.innerHTML = "";
    });
};

function updateApp(){
    
    totalIncome = CalcTotal("Income", items);
    totalExpense = CalcTotal("Expense",items);
    balance = Math.abs(totalIncome - totalExpense);
    let sign = (totalExpense > totalIncome) ? "-$" : "$";
    clearList([incomeList, expenseList, allList]);
    items.forEach((item, index) => {
        if(item.type == "Expense"){
            LoadData(expenseList, item.type, item.title, item.amount, index);
        }else if(item.type == "Income"){
            LoadData(incomeList, item.type, item.title, item.amount, index);
        }
        LoadData(allList, item.type, item.title, item.amount, index)     
    });
    BalanceVal.textContent = `${sign}${balance}`;
    IncomeVal.textContent = `$${totalIncome}`;
    ExpenseVal.textContent = `$${totalExpense}`;
    updateChart(totalIncome, totalExpense);
};

function del(e){
    let ENTRY = e.target.parentNode;
    items.splice(ENTRY.id, 1);
    localStorage.setItem("entries",JSON.stringify(items));
    updateApp();
};

function edit(e){
    let ENTRY = e.target.parentNode;
    console.log(ENTRY, ENTRY.id);
    if(items[ENTRY.id].type == "Income") {
        income_title.value = items[ENTRY.id].title;
        income_amount.value = items[ENTRY.id].amount;
    }else if (items[ENTRY.id].type == "Expense"){
        exp_title.value =  items[ENTRY.id].title;
        exp_amount.value = items[ENTRY.id].amount;
    }
    items.splice(ENTRY.id, 1);
    localStorage.setItem("entries",JSON.stringify(items));
    updateApp();
};


// Events Listeners

tab1.addEventListener('click', function show(){
    tab1.classList.add('active');
    tab2.classList.remove('active');
    tab3.classList.remove('active');
    allIncomes.classList.remove('hide');
    allExpenses.classList.add('hide');
    allRecords.classList.add('hide');
});

tab2.addEventListener('click', function show(){
    tab2.classList.add('active');
    tab1.classList.remove('active');
    tab3.classList.remove('active');
    allIncomes.classList.add('hide');
    allExpenses.classList.remove('hide');
    allRecords.classList.add('hide');
});

tab3.addEventListener('click', function show(){
    if (tab3.classList.contains('active')){
        tab3.classList.remove('active');
    };
    tab2.classList.remove('active');
    tab1.classList.remove('active');
    allIncomes.classList.add('hide');
    allExpenses.classList.add('hide');
    tab3.classList.add('active');
    allRecords.classList.remove('hide');
});

addExp.addEventListener('click', function(e){
    if(!exp_title.value  || !exp_amount.value) return;
    const exp = {
        type: "Expense",
        title: exp_title.value,
        amount: parseInt(exp_amount.value),
        date : new Date().toLocaleDateString()
    }
    items.push(exp);
    updateApp();
    localStorage.setItem('entries', JSON.stringify(items));
    clearInputs([ exp_title, exp_amount]); 
});

addIncome.addEventListener('click', function(e){
    if(!income_title.value  || !income_amount.value) return;
    const income = {
        type: "Income",
        title: income_title.value,
        amount: parseInt(income_amount.value),
        date : new Date().toLocaleDateString()
    }
    items.push(income);
    updateApp();
    localStorage.setItem("entries",JSON.stringify(items));
    clearInputs([ income_title, income_amount]);
});

button.addEventListener("click", function(){
    modetext.classList.toggle("checked");
    body.classList.toggle("dark");
    updateApp();
});

incomeList.addEventListener('click', function(e){
    if(e.target.id == "delete"){
       del(e);
       updateApp();
    }else if(e.target.id =="edit"){
        edit(e) ;
        updateApp();   
    }
});

expenseList.addEventListener("click", function(e){
    if(e.target.id == "delete"){
        del(e)
    }else if(e.target.id =="edit"){
        edit(e)    
    }
});





