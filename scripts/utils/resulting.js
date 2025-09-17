import { creditProducts } from "./credit.js";
import { sumCredit, firstOne, twoSecond, threeSecond, btn, errorCredit, errorTime, noStrahovkaSt, timeCredit } from "./constant.js";

export let minCr
//функция установки атрибутов для кредитов
export function resulting() {
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    minCr=result.minCredit
    sumCredit.setAttribute('min', minCr)
    sumCredit.setAttribute('value', minCr)
}
//обнволение и удаление не нужных блокировок в кредитах
export function updateDateCredit() {
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    //timeCredit.value=result.minAge
    btn.classList.remove('paramentsForm__btn_inactive')
    btn.classList.remove('paramentsForm__btn_inactiveBtn')
    errorCredit.classList.remove('popup__input-error_visible')
    errorTime.classList.remove('popup__input-error_visible');
    errorCredit.textContent=''
    errorTime.textContent=''
    if(noStrahovkaSt.value>0){
        minCr = result.minCreditStr
        validFormButon()
    }
    else{
        minCr = result.minCredit
        validFormButon()
    }
    isValidAgeCredit()
}

function isValidAgeCredit() {
    errorTime.textContent=''
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    if (timeCredit.value == '' || timeCredit.value == null || timeCredit.value<result.minAge)
    {
        timeCredit.classList.add('popup__input-errorSa')
        errorTime.classList.add('popup__input-error_visible');
        errorTime.textContent = 'минимальное количество месяцев: ' + result.minAge
        btn.classList.add('paramentsForm__btn_inactiveBtn')
    }
    else {
        timeCredit.classList.remove('popup__input-errorSa')
        errorTime.classList.remove('popup__input-error_visible');
        btn.classList.remove('paramentsForm__btn_inactiveBtn')
    }

}


//функция по проверке мин и макс суммы кредита 
function validFormButon() {
    let sum = parseFloat(sumCredit.value.replace(/ /g, ''))
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    if (sum<minCr) {
        const errorElement = document.querySelector(`.razrydSum-error`)
        errorElement.classList.add('popup__input-error_visible');
        errorElement.textContent = 'Минимальная сумма: ' + minCr.toLocaleString()
        btn.classList.add('paramentsForm__btn_inactive')
    }
    else if (sum>result.maxCredit) {
        const errorElement = document.querySelector(`.razrydSum-error`)
        errorElement.classList.add('popup__input-error_visible');
        errorElement.textContent = 'Максимальная сумма: ' + result.maxCredit.toLocaleString()
        btn.classList.add('paramentsForm__btn_inactive')
    }

    else {
        const errorElement = document.querySelector(`.razrydSum-error`);
        errorElement.classList.remove('popup__input-error_visible');
        errorElement.textContent = '';
        btn.classList.remove('paramentsForm__btn_inactive')
    }
}