import { creditProduct } from "./constance.js"
import { creditProducts } from "./credit.js"
import { celsProgram, credictProduct, firstOne, twoSecond, threeSecond } from "./constant.js"
import { updateDateCredit } from "./resulting.js"
//функции на назанчении повышающих и понижающих ставку для ипотеки
export function addBtnZarplata(evt) {
    evt.preventDefault()
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    zarplataSt.value = parseFloat(result.procentDownZP*100)    
}
export function addBtnKi(evt) {
    evt.preventDefault()
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    kiSt.value = result.procentDownKI*100
}
export function addBtnElectrons(evt) {
    evt.preventDefault()
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    electronSt.value = result.procentDownElectrons*100
}
export function addBtnNoRef(evt) {
    evt.preventDefault()
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    noRefSt.value = result.procentDownNoRef*100
}
export function addBtnStrahovka(evt) {
    evt.preventDefault()
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    noStrahovkaSt.value = result.procentUP*100
}

export function deleteBtnZarplata(evt) {
    evt.preventDefault()
    zarplataSt.value = 0
}
export function deleteBtnKi(evt) {
    evt.preventDefault()
    kiSt.value = 0
}
export function deleteBtnElectrons(evt) {
    evt.preventDefault()
    electronSt.value = 0
}
export function deleteBtnNoRef(evt) {
    evt.preventDefault()
    noRefSt.value = 0
}
export function deleteBtnStrahovka(evt) {
    evt.preventDefault()
    noStrahovkaSt.value = 0
}

//Crdit
//функции на назанчении повышающих и понижающих ставку для кредитов
export function addBtnStrahovkaCredit(evt) {
    evt.preventDefault()
    const result = creditProducts.find(obj => obj.categories === firstOne.value && obj.classCategories === twoSecond.value && obj.program === threeSecond.value)
    noStrahovkaSt.value = result.procentDownSt*100
    updateDateCredit()
}

export function deleteBtnStrahovkaCredit(evt) {
    evt.preventDefault()
    noStrahovkaSt.value = 0
    updateDateCredit()
}