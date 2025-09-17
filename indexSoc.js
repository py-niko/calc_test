import { creditProduct, initialCreditSoc } from "./scripts/utils/constance.js";
import {firstOne, twoSecond, paramentGroup, btn, btnExcel, btnSelectGroupAdd,
btnSelectGroupRemode, celsProgram, credictProduct, sumCredit, costHouse,
timeCredit, paramentGroups, monthPayment, pereplata, resultStavka,
resultProduct, resultProgramma, resultKZ} from "./scripts/utils/constant.js"
import { parserNumberToRazryd } from './scripts/utils/parserNumberToRazryd.js'
import { popupOpen, popupClose } from './scripts/utils/popup.js'
import { tableToExcel } from "./scripts/utils/tableToExcel.js"
import { enableValidation } from './scripts/utils/formValidator.js'
import { resetPayment } from './scripts/utils/resetPayment.js'
import { fillTable } from "./scripts/utils/fillTable.js";
import { selectRemoveGroup } from './scripts/utils/selectRemoveGroup.js'
import { selectCelsTwo } from './scripts/utils/selectCelsTwo.js'

//вызов кнопок
btn.addEventListener('click', viborGroup)
btnExcel.addEventListener('click', tableToExcel)

btnSelectGroupAdd.addEventListener('click', popupOpen)
btnSelectGroupRemode.addEventListener('click', popupClose)

//вызов функции разделения чисел на разряды
sumCredit.addEventListener('input', function() {
    parserNumberToRazryd(this)
})
costHouse.addEventListener('input', function() {
    parserNumberToRazryd(this)
})
//функции по переборы объектов из constance.js
initialCreditSoc.forEach(function(item){
    const option = document.createElement('option');
    option.text = item.program
    option.value = item.program;
    option.innerHTML = item.program;
    firstOne.appendChild(option)
});

function selectProgramOne () {
    let selectCredit = initialCreditSoc.find(function(item) {
        return item.program === this.value
    }, this)
    timeCredit.value=''
    twoSecond.innerHTML=''
    paramentGroup.innerHTML=''
    selectCredit.product.forEach(function(item){
    const option = document.createElement('option');
    option.text=item
    option.value=item
    twoSecond.appendChild(option)
    })
    resetPayment()
}

firstOne.addEventListener('change', selectProgramOne)

paramentGroup.addEventListener('change', selectRemoveGroup)

twoSecond.addEventListener('change', selectCelsTwo)
//функция по выводу информации об ипоетке 
function resultingCredit(newSumCredit,month, procent, kz) {

    let paymentSchedul = []
    let remaingPrinciple=parseFloat(newSumCredit)
    let monthlyIntersertRate = (procent/100) / 12
    let monthlyPayment = newSumCredit * monthlyIntersertRate / ( 1 - Math.pow(1 + monthlyIntersertRate, -month))
    //функция по обнулнию расчётов
    resetPayment()
    //запись в массив данных по кредиту по месяцам
    for(let i = 1; i<=month; i++){
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
    //вывод на страницу данных (описание смотреть в indexIpoteka.js)
    let addTextMonthPayment = ((remaingPrinciple*monthlyIntersertRate)+(monthlyPayment-remaingPrinciple*monthlyIntersertRate)).toFixed(2)
    let parseAddTextMonthPayment = parseFloat(addTextMonthPayment).toLocaleString()
    monthPayment.textContent += parseAddTextMonthPayment

    let addTextPereplata = parseFloat((addTextMonthPayment*month-newSumCredit).toFixed(2)).toLocaleString()
    pereplata.textContent += addTextPereplata

    let addTextResultStavka = procent.toFixed(2) + '%'
    resultStavka.textContent += addTextResultStavka

    let addTextResultProduct = credictProduct.value
    resultProgramma.textContent += addTextResultProduct

    let addTextResultProgramma = celsProgram.value
    resultProduct.textContent += addTextResultProgramma

    let addTextTesultKZ = kz + '%'
    resultKZ.textContent += addTextTesultKZ
    //вызов функции по созданию таблицы
    fillTable(paymentSchedul)
}

//функция по определению КЗ и вызов функции выбора срока
export function viborGroup(evt) {
    evt.preventDefault()
    let newSumCredit=sumCredit.value
    newSumCredit = parseFloat(newSumCredit.replace(/ /g, ''))
    let newCostHous=costHouse.value
    newCostHous = parseFloat(newCostHous.replace(/ /g, ''))
    const sum = 1000000;
    const ont = parseInt(paramentGroups.value)
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    const kz = (parseFloat(newSumCredit/newCostHous)*100).toFixed(3)
    switch (ont) {
        case 1:
            if(result.minGroup<=kz && kz<=result.groupOne)
            {
                viborMonth()
            }
            else if (kz<result.minGroup){
                alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.minGroup + '\nВаше К/З: ' + kz)
            }

            else{
                alert('К/З больше разрешенного, для данной категории максимальное значение К/З: ' + result.groupOne + '\nВаше К/З: ' + kz)
            }
        break
        case 2:
            if(result.minGroup<=kz && kz<=result.groupTwo)
            {
                viborMonth()
            }
            else if (kz<result.minGroup){
                alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.minGroup + '\nВаше К/З: ' + kz)
            }
            else {
                alert('К/З больше разрешенного, для данной категории максимальное значение К/З: ' + result.groupTwo + '\nВаше К/З: ' + kz)
            }
        break
        case 3:
            if(result.minGroup<=kz && kz<=result.groupThree)
            {
                viborMonth()
            }
            else if(kz<result.minGroup) {
                alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.minGroup + '\nВаше К/З: ' + kz)
            }
            else {
                alert('К/З больше разрешенного, для данной категории максимальное значение К/З: ' + result.groupThree + '\nВаше К/З: ' + kz)
            }
        break
        case 4:
            switch(true){
                case (kz<=result.gruopFourUslovia && newSumCredit<=sum):
                    viborMonth()
       
                break
                case (result.minGroup<=kz && kz<=result.groupFour):
                    viborMonth()
                break
                case (kz>result.gruopFourUslovia && newSumCredit<=sum):
                    alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.gruopFourUslovia + '\nВаше К/З: ' + kz)
                break
                case (kz<result.minGroup):
                    alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.minGroup + '\nВаше К/З: ' + kz)
                break
                default:alert('К/З больше разрешенного, для данной категории максимальное значение К/З: ' + result.groupFour + '\nВаше К/З: ' + kz)
            }
        break
        case 5:
            if(result.minGroup<=kz && kz<=result.groupFive)
            {
                viborMonth()
            }
            else if (kz<result.minGroup){
                alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.minGroup + '\nВаше К/З: ' + kz)
            }
            else {
                alert('К/З больше разрешенного, для данной категории максимальное значение К/З: ' + result.groupFive + '\nВаше К/З: ' + kz)
            }
        break
        case 6:
            if(result.minGroup<=kz && kz<=result.groupSix)
            {
                viborMonth()
            }
            else if (kz<result.minGroup){
                alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.minGroup + '\nВаше К/З: ' + kz)
            }
            else {
                alert('К/З больше разрешенного, для данной категории максимальное значение К/З: ' + result.groupSix + '\nВаше К/З: ' + kz)
            }
        break
        case 7:
            if(result.minGroup<=kz && kz<=result.groupSeven)
            {
                viborMonth()
            }
            else if (kz<result.minGroup){
                alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.minGroup + '\nВаше К/З: ' + kz)
            }
            else {
                alert('К/З больше разрешенного, для данной категории максимальное значение К/З: ' + result.groupSeven + '\nВаше К/З: ' + kz)
            }
        break
        case 8:
            if(result.minGroup<=kz && kz<=result.groupEight)
            {
                viborMonth()
            }
            else if (kz<result.minGroup){
                alert('К/З меньше разрешенного, для данной категории минимальное значение К/З: ' + result.minGroup + '\nВаше К/З: ' + kz)
            }
            else {
                alert('К/З больше разрешенного, для данной категории максимальное значение К/З: ' + result.groupEight + '\nВаше К/З: ' + kz)
            }
        break
    }
}

//функция по определению повышающей ставки по годам
function viborMonth() {
        const month = parseInt(timeCredit.value)*12
        const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
        let time;
        if((month/12)>result.maxAge) {
            alert('Количество лет превышает допустимое значение необходимо уменьшить срок кредита \nМаксимальный срок кредита: ' + result.maxAge)
        }
        else{
            switch (true) {
                case month>=12 && month<=48:
                    time = result.timeOne
                   sendForm(month, time)
                break
                case month>=49 && month<=120:
                    time = result.timeSecond
                    sendForm(month, time)
                break
                case month>=121 && month<=240:
                    time = result.timeTherty
                   sendForm(month, time)
                break
                case month>=241 && month<=360:
                    time = result.timeFoty
                    sendForm(month, time)
                break
            }
        }
}

//функция по определению повышающей ставки по КЗ по нормативам
function sendForm(month, time) {
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    let newSumCredit=sumCredit.value
    newSumCredit = parseFloat(newSumCredit.replace(/ /g, ''))
    let newCostHous=costHouse.value
    newCostHous = parseFloat(newCostHous.replace(/ /g, ''))
    const kz = (parseFloat(newSumCredit/newCostHous)*100).toFixed()

    let procent;
    switch (true){
                case kz>=10 && kz<=15:
                    procent=(result.procent+time+result.kZ1)*100
                    resultingCredit(newSumCredit,month, procent, kz)

                break
                case kz>=16 && kz<=50:
                    procent=(result.procent+time+result.kZ2)*100
                    resultingCredit(newSumCredit,month, procent, kz)
                break
                case kz>=51 && kz<=70:
                    procent= (result.procent+time+result.kZ3)*100
                    resultingCredit(newSumCredit,month, procent, kz)

                break
                case kz>=71 && kz<=80:
                    procent=(result.procent+time+result.kZ4)*100
                    resultingCredit(newSumCredit,month, procent, kz)
                break
                case kz>=81:
                    procent=(result.procent+time+result.kZ5)*100
                    resultingCredit(newSumCredit,month, procent, kz)
                break
                default:
                alert('К/З меньше минимального, необходимо увеличить К/З \nМинимальное К/З = 10\nНа данный момент К/З: ' + kz)
    }
}
//функция по валидации формы
enableValidation()