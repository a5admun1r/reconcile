var transactionArray = [];

function Transaction(_date, _description, _amount) {
    this.date = _date;
    this.description = _description;
    this.amount = _amount;
}

function toggleAnswerDiv() {
    let nextSibling = this.nextElementSibling;
    if (nextSibling.style.display == 'block') {
        nextSibling.style.display = 'none';
    } else {
        nextSibling.style.display = 'block';
    }
}

var validateTransaction = () => {
    
    // Get input values
    let inputDate = document.getElementById('input_date').value;
    let inputDescription = document.getElementById('input_description').value;
    let inputAmount = Number(document.getElementById('input_amount').value);

    if (!inputDate)
        inputDate = new Date().toJSON().slice(0,10);
    
    if (!inputDescription)
        inputDescription = 'Dummy value';
    
    if (!inputAmount)
        inputAmount = 1;
    
    let transaction = new Transaction(inputDate, inputDescription, inputAmount);
    // let openingBalance = Number(document.getElementById('opening_balance').value);
    
    // if (transactionArray.length === 0) {
    //     transaction.runningBalance = openingBalance + transaction.amount;
    // } else {
    //     transaction.runningBalance = openingBalance;
    //     transactionArray.forEach(trans => {
    //         transaction.runningBalance += trans.amount;
    //     })
    //     transaction.runningBalance += transaction.amount;
    // }

    transactionArray.push(transaction);
    // console.log(transactionArray);
    transTable = document.getElementById('data_table');
    let rowNode = document.createElement('tr');
    
    for (let i = 0; i < 5; i++) {
        let colNode = document.createElement('td');
        switch(i) {
            case 0:
                colNode.innerHTML = 'x';
                break;
            case 1:
                colNode.innerHTML = transaction.date;
                break;
            case 2:
                colNode.innerHTML = transaction.description;
                break;
            case 3:
                colNode.innerHTML = transaction.amount;
                let att = document.createAttribute('class');
                att.value = "table_amounts";
                colNode.setAttributeNode(att);
                break;
            case 4:
                let runnBal = getRunningBalance(transaction)
                colNode.innerHTML = runnBal;
                balanceNode = document.getElementById('balance');
                openingBalance = Number(document.getElementById('opening_balance').value);
                actualBalance = Number(document.getElementById('actual_balance').value);
                balanceNode.value = actualBalance-runnBal;
                break;
        }
        rowNode.appendChild(colNode);
    }
    transTable.appendChild(rowNode);
}

var getRunningBalance = transaction => {
    transTable = document.getElementById('data_table');
    openingBalance = Number(document.getElementById('opening_balance').value);
    if(transTable.childElementCount == 1) 
        return  openingBalance+transaction.amount;
    
    let runningBalance = openingBalance + transaction.amount;
    amounts = document.querySelectorAll(".table_amounts");
    amounts.forEach(amount => {
        runningBalance += Number(amount.innerHTML);
    })
    return runningBalance;
    // rows.forEach(row => {
    //     console.log(row);
    // });
}

var setDefaultValue = (e) => {
    if(!e.target.value) {
        e.target.value = '-';
    }
}