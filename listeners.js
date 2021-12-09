document.getElementById('input_button').addEventListener('click', () => {
    validateTransaction();
    //insertTransaction();
    //updateBalance();
});

document.getElementById('input_amount').addEventListener('focus',setDefaultValue);
