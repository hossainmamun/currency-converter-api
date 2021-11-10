const amount_input = document.querySelector('#amount-input');
const drop_list_from = document.querySelector('#drop-list-from');
const drop_list_to = document.querySelector('#drop-list-to');
const converted_result = document.querySelector('#converted-result');
const convert_btn = document.querySelector('#convert-btn');
const reset_btn = document.querySelector('#reset-btn');
const single_result = document.querySelector('#single-result');

let result_from;
let result_to;
let inputValue;

// api key
const api = `https://api.exchangerate-api.com/v4/latest/USD`;

// add event listener with drop_list_from
drop_list_from.addEventListener('change', (e) => {
    result_from = e.target.value;
})
// add event listener with drop_list_to
drop_list_to.addEventListener('change', (e) => {
    result_to = e.target.value;
})
// add event listener with amount_input
amount_input.addEventListener('input', (e) => {
    inputValue = e.target.value;
})

// add event listener with convert btn
convert_btn.addEventListener('click', () => {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            displayResult(data);
        })
})

// display result after conversion
const displayResult = getResult => {
    if (inputValue <= 0 || inputValue == null) {
        alert('Please Enter Valid Number');
    }
    else if (result_from == result_to) {
        alert('enter a different exchange option')
    }
    else {
        console.log(getResult.rates)
        const fromExchange = getResult.rates[result_from];
        const toExchange = getResult.rates[result_to];
        const result_to_fix = ((toExchange / fromExchange) * inputValue).toFixed(2);
        converted_result.innerHTML = `${inputValue} ${result_from} = ${result_to_fix} ${result_to} `;
        single_result.innerHTML = `1 ${result_from} = ${toExchange} ${result_to}`
    }

}
// reset btn
reset_btn.addEventListener("click", () => {
    location.reload();
})