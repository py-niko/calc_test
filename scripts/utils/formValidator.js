import { creditProduct } from "./constance.js"
import { creditProducts } from "./credit.js"
import { celsProgram, credictProduct, errorTime, timeCredit, firstOne, twoSecond, threeSecond, sumCredit, paramentGroup, btn } from "./constant.js"

//функция по определению сумму кредита с минимальной и максимальной
export const isValid = (formElement, inputElement) => {
    let sum = parseFloat(inputElement.value.replace(/ /g, ''))
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    if (sum<result.minCredit) {
        showInputError(formElement, inputElement, inputElement.validationMessage, result)
    }
    else {
        hidleInputError(formElement, inputElement)
        
    }
}
//функция вывода ошибки мин. сум.
const showInputError = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
    errorElement.textContent = 'Минимальная сумма: ' + result.minCredit.toLocaleString()
}
//функция вывода ошибки макс. сум.
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
//функция по определению максимального количества лет
export const isValidAge = (formElement, inputElement) => {
    errorTime.textContent=''
    let sum = inputElement.value
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    if (sum<result.minAge)
    {
        showInputErrorMinAge(formElement, inputElement, inputElement.validationMessage, result)
    }
    else if (sum>result.maxAge) {
        showInputErrorMaxAge(formElement, inputElement, inputElement.validationMessage, result)
    }
    else {
        hidleInputErrorAge(formElement, inputElement)
    }
}
//функция вывода ошибки макс. лет.
const showInputErrorMaxAge = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.remove('popup__input-error_visible');
    inputElement.value=result.maxAge
    errorElement.textContent = 'максимальное количество месяцев: ' + result.maxAge
}
//функция вывода ошибки мин. лет. 
const showInputErrorMinAge = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
    errorElement.textContent = 'минимальное количество месяцев: ' + result.minAge
}
//функция вывода удаления информации об ошибках
const hidleInputErrorAge = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-errorSa')
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = '';
}

//функция двойной валидации селектора группы и суммы кредита для гос подержки
export const isValidGroup = (formElement, inputElement, sumCredit, paramentGroup) => {
    let sumCredits=parseFloat(sumCredit.value.replace(/ /g, ''))

    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    
    if(sumCredits>result.maxCreditGroupOneSix && result.program=='Ипотека с государственной поддержкой для семей с детьми' && (paramentGroup.value == '1' || paramentGroup.value == '2' || paramentGroup.value == '3' || paramentGroup.value == '4'|| paramentGroup.value == '5'|| paramentGroup.value == '6'))
    {
        showInputErrorMaxGroupOne(formElement, inputElement, inputElement.validationMessage, result)

    }
    else if(sumCredits>result.maxCreditGroupSevenEight && result.program=='Ипотека с государственной поддержкой для семей с детьми' && (paramentGroup.value == '7' || paramentGroup.value == '8')) {
        showInputErrorMinGroupSeven(formElement, inputElement, inputElement.validationMessage, result)

    }
    else if (sumCredits<result.minCredit) {
        showInputErrorMinCredit(formElement, inputElement, inputElement.validationMessage, result)
    }
    else if (sumCredits>result.maxCredit) {
        showInputErrorMaxCredit(formElement, inputElement, inputElement.validationMessage, result)
    }
    else {
        hidleInputErrorGroup(formElement, inputElement)

    }

}
//функция вывода ошибки макс. сум.
const showInputErrorMaxCredit = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.razrydSum-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
    errorElement.textContent = 'Максимальная сумма: ' + result.maxCredit.toLocaleString()
}
//функция вывода ошибки мин. сум.
const showInputErrorMinCredit = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.razrydSum-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
    errorElement.textContent = 'Минимальная сумма: ' + result.minCredit.toLocaleString()
}
//функция вывода ошибки макс. суммы группы для 1-6.
const showInputErrorMaxGroupOne = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.razrydSum-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
    errorElement.textContent = 'Максимальная сумма: ' + result.maxCreditGroupOneSix.toLocaleString()
}
//функция вывода ошибки макс. суммы для группы для 7-8.
const showInputErrorMinGroupSeven = (formElement, inputElement, errorMessage, result) => {
    const errorElement = formElement.querySelector(`.razrydSum-error`)
    inputElement.classList.add('popup__input-errorSa')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
    errorElement.textContent = 'Максимальная сумма: ' + result.maxCreditGroupSevenEight.toLocaleString()
}
//функция вывода удаления информации об ошибках
const hidleInputErrorGroup = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.razrydSum-error`)
    inputElement.classList.remove('popup__input-errorSa')
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = '';
}

//вызов функций по блокировании кнопки расчета и проверки на валидность формы
const setEventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.paramentsForm__sum_razryd'));
    const inputAge = Array.from(formElement.querySelectorAll('.paramentsForm__time_age'));
    const inputSelectGroup = Array.from(formElement.querySelectorAll('.paramentsForm__sum_group, .paramentsForm__sum_razryd'))
    inputAge.forEach((inputElement) => {
        inputElement.addEventListener('input', ()=>{
            isValidAge(formElement, inputElement)
            toggleButtonState(inputList, inputAge, inputSelectGroup, btn)
        })
    })
    inputSelectGroup.forEach((inputElement) => {
        inputElement.addEventListener('input', ()=>{
            isValidGroup(formElement, inputElement, sumCredit, paramentGroup)
            toggleButtonState(inputList, inputAge, inputSelectGroup, btn)
        })
    })

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', ()=>{
            isValid(formElement, inputElement)
            isValidGroup(formElement, inputElement, sumCredit, paramentGroup)
            toggleButtonState(inputList, inputAge, inputSelectGroup, btn)
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

const hasInvalidInputAge = (inputAge) => {
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    return inputAge.some((inputElement) => {
        let sum = inputElement.value
        return (sum<result.minAge || sum> result.maxAge)
    })
}

const hasInvalidInput = (inputList) => {
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)

    return inputList.some((inputElement) => {
        let sum = parseFloat(inputElement.value.replace(/ /g, ''))
        let sumCredits=parseFloat(sumCredit.value.replace(/ /g, ''))
        return (sum<result.minCredit || sumCredits>result.maxCredit)
    })
}

const hasInvalidInputGroup = (inputSelectGroup) => {
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    let sumCredits=parseFloat(sumCredit.value.replace(/ /g, ''))
    return inputSelectGroup.some((inputElement) => {
        let sum = parseFloat(inputElement.value.replace(/ /g, ''))
        return((sumCredits>result.maxCreditGroupOneSix && result.program=='Ипотека с государственной поддержкой для семей с детьми' && (paramentGroup.value == '1' || paramentGroup.value == '2' || paramentGroup.value == '3' || paramentGroup.value == '4'|| paramentGroup.value == '5'|| paramentGroup.value == '6'))
        ||
        (sumCredits>result.maxCreditGroupSevenEight && result.program=='Ипотека с государственной поддержкой для семей с детьми' && (paramentGroup.value == '7' || paramentGroup.value == '8')))
        
    })
}

//функция по активации и деактивации кнопки
const toggleButtonState = (inputList, inputAge, inputSelectGroup, btn) => {
    if (hasInvalidInput(inputList) || hasInvalidInputAge(inputAge) || hasInvalidInputGroup(inputSelectGroup)){
        btn.classList.add('paramentsForm__btn_inactive')
    }
    else {
        btn.classList.remove('paramentsForm__btn_inactive')
        btn.classList.remove('paramentsForm__btn_inactiveBtn')
    }
}

//функция для валидации минимального количества месяцев для потреб кредитов
export function isValidAgeCredit() {
    errorTime.textContent=''
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    if (timeCredit.value<result.minAge)
    {
        timeCredit.classList.add('popup__input-errorSa')
        errorTime.classList.add('popup__input-error_visible');
        btn.classList.add('paramentsForm__btn_inactiveBtn')
        errorTime.textContent = 'минимальное количество месяцев: ' + result.minAge
    }
    else if (timeCredit.value>result.maxAge) {
        errorTime.classList.remove('popup__input-error_visible');
        errorTime.textContent = 'максимальное количество месяцев: ' + result.maxAge
        timeCredit.value=result.maxAge
        btn.classList.remove('paramentsForm__btn_inactiveBtn')
    }
    else {
        timeCredit.classList.remove('popup__input-errorSa')
        errorTime.classList.remove('popup__input-error_visible');
        btn.classList.remove('paramentsForm__btn_inactiveBtn')
    }

}

export function isValidAgeIpoteka() {
    errorTime.textContent=''
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
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