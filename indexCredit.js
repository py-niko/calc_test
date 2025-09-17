import { initialCredit, creditProducts } from "./scripts/utils/credit.js";
import {firstOne, dopCredit, twoSecond, threeSecond, sumCredit, costHouse, btn, timeCredit, addSubmitStrahovka, deleteSubmitStrahovka, noStrahovkaSt, program,
resultStavka, resultProduct, resultProgramma, monthPayment, pereplata, btnExcel, procentGarantST} from "./scripts/utils/constant.js"
import { parserNumberToRazryd } from './scripts/utils/parserNumberToRazryd.js'
import { fillTable } from "./scripts/utils/fillTable.js";
import { resetPaymentCredit } from "./scripts/utils/resetPayment.js";
import { minCr } from "./scripts/utils/resulting.js";
import { addAtributeCredit, isValidSelect } from "./scripts/utils/addAtribute.js";
import { addBtnStrahovkaCredit,  deleteBtnStrahovkaCredit} from "./scripts/utils/addStavki.js";
import { isValidAgeCredit } from "./scripts/utils/formValidator.js";
import { tableToExcel } from "./scripts/utils/tableToExcel.js"

//вызов кнопок
addSubmitStrahovka.addEventListener('click', addBtnStrahovkaCredit)
deleteSubmitStrahovka.addEventListener('click', deleteBtnStrahovkaCredit)
threeSecond.addEventListener('change', addAtributeCredit)
firstOne.addEventListener('change', selectProgramOne)
firstOne.addEventListener('change', selectProgramThree)
twoSecond.addEventListener('change', selectProgramTwo)
twoSecond.addEventListener('change', addAtributeCredit)
timeCredit.addEventListener('input', isValidAgeCredit)

//вызов функции разделения чисел на разряды
sumCredit.addEventListener('input', function() {
    parserNumberToRazryd(this)
})

costHouse.addEventListener('input', function() {
    parserNumberToRazryd(this)
})

btn.addEventListener('click', sendForm)
btnExcel.addEventListener('click', tableToExcel)

//функция по активация чек-бокса если выбрано в селекторе "На рефинансирование"
dopCredit.addEventListener("click", () => {
    if (dopCredit.checked && (threeSecond.value == 'На рефинансирование' || threeSecond.value == 'Честный процент рефинансирование' || threeSecond.value == 'Старт рефинансирование')) {
        costHouse.value=''
        costHouse.removeAttribute("disabled")
    }
    else {
        dopCredit.checked = false
        costHouse.value=0
        costHouse.setAttribute("disabled", true);
    }
})
//функции по переборы объектов из credit.js
initialCredit.forEach(function(item){
    const option = document.createElement('option');
    option.text = item.categories
    option.value = item.categories;
    option.innerHTML = item.categories;
    firstOne.appendChild(option)
});

//обнуление повышающей ставки при нажатии второго селектора
function selectProgramTwo() {
    if(timeCredit.value=='' || timeCredit.value==null){
        
    }
    else {
            isValidAgeCredit()
    }
    noStrahovkaSt.value=0
}

function selectProgramOne () {
    let selectCredit = initialCredit.find(function(item) {
        return item.categories === this.value
    }, this)
    twoSecond.innerHTML=''
    noStrahovkaSt.value=0
    selectCredit.classCategories.forEach(function(item){
    const option = document.createElement('option');
    option.text=item
    option.value=item
    twoSecond.appendChild(option)
    })
    resetPaymentCredit()
}

function selectProgramThree() {
    let selectCredit = initialCredit.find(function(item) {
        return item.categories === this.value
    }, this)
    threeSecond.innerHTML=''
    selectCredit.program.forEach(function(item){
    const option = document.createElement('option');
    option.text=item
    option.value=item
    threeSecond.appendChild(option)
    })
    resetPaymentCredit()
    isValidSelect()
}

//функция по определению минимальной и максимальной суммы кредита
function sendForm(evt) {
    evt.preventDefault()
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    let newSumCredit=sumCredit.value
    newSumCredit = parseFloat(newSumCredit.replace(/ /g, ''))
    let newCostHous=costHouse.value
    newCostHous = parseFloat(newCostHous.replace(/ /g, ''))
    let sum = parseFloat(newSumCredit+newCostHous)
    if(sum > result.maxCredit || sum < minCr){
        alert('Сумма кредита меньше или выше допустимого уровеня\nВаш уровень кредита: ' + sum + '\nМинимальный уровень: ' + minCr + '\nМаксимальный уровень: ' + result.maxCredit)
    }
    else{
        //вызов функции если все ок
        viborMonth(sum)
    }
}

//функция по опредедению процента основываясь на сроке кредита
function viborMonth(sum) {
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    const noStrahovlaStNum = parseFloat(noStrahovkaSt.value)
    let procent = 0;
    switch(true) {
        case timeCredit.value>=6 && timeCredit.value<=12: {
            procent=result.procentMainOne-(noStrahovlaStNum/100)
            resultingCredit(procent)
        }
        break
        case timeCredit.value>=13 && timeCredit.value<=24: {
            procent=result.procentMainTwo-(noStrahovlaStNum/100)
            resultingCredit(procent)
        }
        break
        case timeCredit.value>=25 && timeCredit.value<=36: {
            procent=result.procentMainThree-(noStrahovlaStNum/100)
            resultingCredit(procent)
        }
        break
        case timeCredit.value>=37 && timeCredit.value<=48: {
            procent=result.procentMainFour-(noStrahovlaStNum/100)
            resultingCredit(procent)
        }
        break
        case timeCredit.value>=49 && timeCredit.value<=60: {
            procent=result.procentMainFive-(noStrahovlaStNum/100)
            resultingCredit(procent)
        }
        break
        case timeCredit.value>=61 && timeCredit.value<=84: {
            procent=result.procentMainSix-(noStrahovlaStNum/100)
            resultingCredit(procent)
        }
        break
        case timeCredit.value>=85 && timeCredit.value<=120: {
            procent=result.procentMainSeven-(noStrahovlaStNum/100)
            resultingCredit(procent)
        }
        break
        default: alert('Ошибка в выборе месяца. Пожалуйста проверьте месяц')
    }
}

//функция по выводу информации об кредите
function resultingCredit(procent) {

    let paymentSchedul = []
    let newSumCredit=sumCredit.value
    newSumCredit = parseFloat(newSumCredit.replace(/ /g, ''))

    let remaingPrinciple=parseFloat(newSumCredit)//сумма
    let monthly = parseFloat(timeCredit.value)//месяц
    let monthlyIntersertRate = (procent) / 12 //процент
    let monthlyPayment = remaingPrinciple * monthlyIntersertRate / ( 1 - Math.pow(1 + monthlyIntersertRate, -monthly))
    //функция по обнулнию расчётов
    resetPaymentCredit()
    //запись в массив данных по кредиту по месяцам
    for(let i = 1; i<=monthly; i++){
        let insertPayment = parseFloat(remaingPrinciple * monthlyIntersertRate)
        let principalPaymnet = parseFloat(monthlyPayment-insertPayment)
        let monthOpata = parseFloat(insertPayment+principalPaymnet)
        remaingPrinciple -= principalPaymnet
        let principalPaymnetMainCredit = (remaingPrinciple + principalPaymnet)
        paymentSchedul.push({
        month:i,
        principalPaymnet:principalPaymnet.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
        principalPaymnetMainCredit:principalPaymnetMainCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
        insertPayment:insertPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
        monthOpata:monthOpata.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
        remaingPrinciple:Math.abs(remaingPrinciple).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    })
    }
    //вывод на страницу данных 
    let addTextMonthPayment = ((remaingPrinciple*monthlyIntersertRate)+(monthlyPayment-remaingPrinciple*monthlyIntersertRate)).toFixed(2)
    //ежемесячный платёж
    let parseAddTextMonthPayment = parseFloat(addTextMonthPayment).toLocaleString()
    monthPayment.textContent += parseAddTextMonthPayment
    //переплата
    let addTextPereplata = parseFloat((addTextMonthPayment*monthly-newSumCredit).toFixed(2)).toLocaleString()
    pereplata.textContent += addTextPereplata
    // процентая ставка
    let addTextResultStavka = (procent * 100).toFixed(2) + '%'
    resultStavka.textContent += addTextResultStavka
    //продукт
    let addTextResultProduct = twoSecond.value
    resultProgramma.textContent += addTextResultProduct
    //программа
    let addTextResultProgramma = firstOne.value
    resultProduct.textContent += addTextResultProgramma
    //цели
    let addTextResultProgram = threeSecond.value
    program.textContent += addTextResultProgram
    //вызов функции по созданию таблицы
    fillTable(paymentSchedul)
}
//валидация формы кредита

//функция по определению сумму кредита с минимальной и максимальной
const isValid = (formElement, inputElement) => {

    let sum = parseFloat(inputElement.value.replace(/ /g, ''))
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    if (sum<minCr) {
        showInputErrorMin(formElement, inputElement, inputElement.validationMessage, result)
    }
    else if (sum>result.maxCredit) {
        showInputErrorMax(formElement, inputElement, inputElement.validationMessage, result)
    }
    else {
        hidleInputError(formElement, inputElement)
    }

}

//функция вывода ошибки мин. сум. кредита
const showInputErrorMin = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
    errorElement.textContent = 'Минимальная сумма: ' + minCr.toLocaleString()
}
//функция вывода ошибки макс. сум. кредита
const showInputErrorMax = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
    errorElement.textContent = 'Максимальная сумма: ' + result.maxCredit.toLocaleString()
}
//функция вывода удаления информации об ошибках
const hidleInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-errorSa')
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = '';
    
}

//вызов функций по блокировании кнопки расчета и проверки на валидность формы
const setEventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.paramentsForm__sum_razryd'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', ()=>{
            isValid(formElement, inputElement)
            toggleButtonState(inputList, btn)
        })
    })
}

//функция по поику формы
export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.paramentsForm'));
    formList.forEach((formElement) => {
        setEventListener(formElement)
    })
}

const hasInvalidInput = (inputList) => {
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    return inputList.some((inputElement) => {
        let sum = parseFloat(inputElement.value.replace(/ /g, ''))
        return sum<minCr || sum>result.maxCredit
    })
}
//функция по активации и деактивации кнопки
const toggleButtonState = (inputList, btn) => {
    if (hasInvalidInput(inputList)){
        btn.classList.add('paramentsForm__btn_inactive')
    } else {
        btn.classList.remove('paramentsForm__btn_inactive')
    }
}

//вызов валидации формы
enableValidation()