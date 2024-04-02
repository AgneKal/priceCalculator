const price = document.getElementById('price');
const percent = document.getElementById('percent');
const directionSelected = document.getElementById('direction');

const btnCalculate = document.getElementById('btn')

const errorPR = document.getElementById('errorPR');
const errorPC = document.getElementById('errorPC');
const errorCH = document.getElementById('errorCH');

const priceError = document.getElementById('price-error');
const percentError = document.getElementById('percent-error');
const changeError = document.getElementById('change-error');

const newPrice = document.getElementById('new-price')


btnCalculate.disabled = true;
errorPR.style.visibility = "hidden";
errorPC.style.visibility = "hidden";
errorCH.style.visibility = "hidden";

let isPriceCorrect = false;
let isPercentCorrect = false;

const checkPrice = () => {
    if (price.value === '' || isNaN(price.value) || Number(price.value) <= 0 || Number(price.value) === Infinity) {
        errorPR.style.visibility = "visible";
        priceError.innerHTML = `Įveskite kainą teigiamais skaičiais.`;
        price.classList.add('wrong-input');
        isPriceCorrect = false;
    } else {
        errorPR.style.visibility = "hidden";
        price.classList.remove('wrong-input');
        price.classList.add('correct-input');
        isPriceCorrect = true;
    }
    if (isPriceCorrect && isPercentCorrect) {
        btnCalculate.disabled = false;
    } else {
        btnCalculate.disabled = true;
    }
}

const checkPercent = () => {
    if (percent.value === '' || Number(percent.value) <= 0 || Number(percent.value) > 100 || isNaN(percent.value) || Number(price.value) === Infinity) {
        errorPC.style.visibility = "visible";
        percentError.innerHTML = `Įveskite procentus skaičiais nuo 1 iki 100.`;
        percent.classList.add('wrong-input');
        isPercentCorrect = false;
    } else {
        errorPC.style.visibility = "hidden";
        percent.classList.remove('wrong-input');
        percent.classList.add('correct-input');
        isPercentCorrect = true;
    }
    if (isPriceCorrect && isPercentCorrect) {
        btnCalculate.disabled = false;
    } else {
        btnCalculate.disabled = true;
    }
}

price.onkeyup = checkPrice;
percent.onkeyup = checkPercent;


const calculate = () => {
    const pr = Number(price.value);
    const pc = Number(percent.value);
    if (directionSelected.value === '') {
        changeError.innerHTML = `Pasirinkite ar norite pabranginti ar atpiginti prekę.`
        return errorCH.style.visibility = 'visible';
    }
    const dr = directionSelected.value == 'plus' ? 1 : -1;

    newPrice.classList.remove('new-price-up');
    newPrice.classList.remove('new-price-down');
    newPrice.classList.add(directionSelected.value == 'plus' ? 'new-price-up' : 'new-price-down')
    newPrice.innerHTML = `${((pr / 100) * dr * pc + pr).toFixed(2)}`;

    price.value = '';
    price.classList.remove('correct-input')
    percent.value = '';
    percent.classList.remove('correct-input');
    directionSelected.value = '';
    btnCalculate.disabled = true;
    errorCH.style.visibility = "hidden";

    isPriceCorrect = false;
    isPercentCorrect = false;
}

btnCalculate.onclick = calculate;