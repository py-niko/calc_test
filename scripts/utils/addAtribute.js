import { creditProduct } from "./constance.js";
import { celsProgram, credictProduct, sumCredit, costHouse, timeCredit, noStrahovkaSt, firstOne, twoSecond, threeSecond, errorTime, btn, dopCredit, errorGroup } from "./constant.js"
import { creditProducts } from "./credit.js";
import { resulting } from "./resulting.js";
import { isValidAgeCredit, isValidAgeIpoteka } from "./formValidator.js"

const errorElement = document.getElementById('error-sumCredit');
//функция которая в зависимости от выбранного продукта добавляет атрибуты в сроках/стоимости жилья/кредита, а также удаляет все ограничения (блокировка кнопки расчет и валидации)
export function addAtribute() {
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    timeCredit.setAttribute('min', result.minAge)
    timeCredit.setAttribute('max', result.maxAge)
    //timeCredit.value=result.minAge
    sumCredit.setAttribute('min', result.minCredit)
    sumCredit.value=result.minCredit
    costHouse.setAttribute('min', result.minCredit)
    isValidAgeIpoteka()
    costHouse.value=result.minCredit  
    btn.classList.remove('paramentsForm__btn_inactive')
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = ''; 
}
//функция по валидации кредита на оновываясь на данных вводимых пользователя и атрибутов
export function isValidSelect() {
    if(threeSecond.value === 'Выберите продукт') {
        errorGroup.classList.add('popup__input-error_visible');
        errorGroup.textContent = 'Выберите продукт'
        btn.classList.add('paramentsForm__btn_inactive')
    } else {
        errorGroup.classList.remove('popup__input-error_visible');
        errorGroup.textContent = ''
        btn.classList.remove('paramentsForm__btn_inactive')
    }
}
//доавбелния атрибутов кредитам и проверка на валидность для категории Сотрудник банка вызов функции результата расчёта
export function addAtributeCredit() {
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    noStrahovkaSt.value=0
    sumCredit.value=result.minCredit
    isValidSelect()
    dopCredit.checked = false
    costHouse.value=0
    costHouse.setAttribute("disabled", true);
    timeCredit.setAttribute('min', result.minAge)
    timeCredit.setAttribute('max', result.maxAge)
    //timeCredit.value=result.minAge
    sumCredit.setAttribute('max', result.maxCredit)
    if(firstOne.value === 'Кредит сотруднику Банка'){
        timeCredit.setAttribute('step', 12)
        isValidAgeCredit()
    }else{
        timeCredit.setAttribute('step', 1)
        isValidAgeCredit()
    }
    timeCredit.addEventListener('input', () => {
        if(firstOne.value === 'Кредит сотруднику Банка') {
            if(timeCredit.value%12){
            errorTime.classList.remove('popup__input-error_visible');
            errorTime.textContent = 'Кредит может быть выдан только с шагом 12 мес.'
            btn.classList.add('paramentsForm__btn_inactiveBtn')
            }
            else {
            timeCredit.classList.remove('popup__input-errorSa')
            errorTime.classList.remove('popup__input-error_visible');
            btn.classList.remove('paramentsForm__btn_inactiveBtn')
            errorTime.textContent=''
            }
        }
    })
    resulting()
}
