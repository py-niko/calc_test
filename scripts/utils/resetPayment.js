import { program } from "./constant.js"
//функция по удалению данных из расчета по ипотеке
export function resetPayment() {
    let table = document.getElementById('paymentScheduleTable')
    table.textContent = ""
    monthPayment.textContent='Ежемесячный платёж: '
    pereplata.textContent='Переплата: '
    resultStavka.textContent='Ставка: '
    resultProduct.textContent='Цель программы: '
    resultProgramma.textContent='Программа кредитования: '
    resultKZ.textContent='К/З = '
}
//функция по удалению данных из расчета по кредиту
export function resetPaymentCredit() {
    let table = document.getElementById('paymentScheduleTable')
    table.textContent = ""
    monthPayment.textContent='Ежемесячный платёж: '
    pereplata.textContent='Переплата: '
    resultStavka.textContent='Ставка: '
    resultProduct.textContent='Категория: '
    resultProgramma.textContent='Классификатор категории: '
    program.textContent='Программа: '
}
