import {firstOne, sumCredit, btn, infoVklad, twoSecond, credictProduct, periodOneMin, priodOneMax, procentOne,periodTwoMin,
    priodTwoMax, procentTwo, periodThreeMin, priodThreeMax, procentThree, periodFourMin, priodFourMax, procentFour, raschet,
    sumOne, sumTwo, sumThree, sumFour, sumFive, threeSecond, fourSecond} from "./scripts/utils/constant.js"
import { parserNumberToRazryd } from './scripts/utils/parserNumberToRazryd.js'
import { vklad, period } from "./scripts/utils/vklad.js";

//функция по разделению числа на разряды
sumCredit.addEventListener('input', function() {
    parserNumberToRazryd(this)
})
//функции по переборы объектов из vklad.js
function selectProgramOne () {
    let selectCredit = period.find(function(item) {
        return item.period
    }, this)
    selectCredit.period.forEach(function(item){
    const option = document.createElement('option');
    option.text=item
    option.value=item
    firstOne.appendChild(option)
    })
}

selectProgramOne()

vklad.data.forEach(function(item){
    const option = document.createElement('option');
    option.text = item.name
    option.value = item.name;
    option.innerHTML = item.name;
    twoSecond.appendChild(option)
});



btn.addEventListener('click', podborVklad)
credictProduct.addEventListener('change', resultVklad)
raschet.addEventListener('click', raschetVklad)
//функция по обнулению результатов расчёта
twoSecond.addEventListener('change', () => {
    sumOne.innerHTML='= '
    sumTwo.innerHTML='= '
    sumThree.innerHTML='= '
    sumFour.innerHTML='= '
    sumFive.innerHTML='Доходность итого (весь срок вклада) = '
})

//функция по подбру вклада по параметрам (от количества дней)
function podborVklad(evt) {
    evt.preventDefault()
    let sumVklad=sumCredit.value
    sumVklad = parseFloat(sumVklad.replace(/ /g, ''))
    let timeVklad = firstOne.value
    let capitality = true
    let popolnenie = true
    if(threeSecond.value == "Да"){
        capitality = true
    }
    else {
        capitality = false
    }

    if(fourSecond.value == "Да"){
        popolnenie = true
    }
    else {
        popolnenie = false
    }
    infoVklad.innerHTML='Вклад не найден, пожалуйста веберите другие параметры'
    for (let i of vklad.data) {
        if((timeVklad==i.periodOneMax || timeVklad==i.periodTwoMax || timeVklad==i.periodThreeMax || timeVklad==i.periodFourMax) && capitality == i.capitalyti && popolnenie == i.popolnenie) {

            if(sumVklad>=i.minSumVklad) {
                infoVklad.innerHTML=''
                infoVklad.innerHTML += 'Вам подойдет: ' + i.name + ', ' + i.about + "<br>" + "<br>"
            }
            else{
                infoVklad.innerHTML=''
                infoVklad.innerHTML='Ошибка, минимальная сумма вклада не соотвествует ни одному из продуктов банка по заданным параметрам.'
            }
            
        }
       

    }
}
//функция по расчёту вклада с капатилизацией по 1 периоду
function raschetPeriodOne() {
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    let totalPay = sumCredit.value
    totalPay = parseFloat(totalPay.replace(/ /g, ''))
    let procentMain= sumCredit.value
    procentMain = parseFloat(procentMain.replace(/ /g, ''))
    let date = new Date()
    let n = parseFloat((result.periodOneMax/result.periodPay).toFixed())
    for (let i = 0; i<n; i++) {
        date.setDate(date.getDate()+result.periodPay)
        let time = date.getFullYear()%4==0?366:365
        let insertPay = parseFloat((totalPay * result.procentOne) * (result.periodPay/time))
        totalPay += parseFloat(insertPay)
    }
    sumOne.innerHTML='= ' + (totalPay - procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    sumFive.innerHTML='Доходность итого (весь срок вклада) = ' + (totalPay-procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    return raschetPeriodTwo(totalPay, date)
    
}
//функция по расчёту вклада с капатилизацией по 2 периоду
function raschetPeriodTwo(totalPay, date) {
    let totalPayTwo = parseFloat(totalPay)
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    let procentMain= sumCredit.value
    procentMain = parseFloat(procentMain.replace(/ /g, ''))
    if(result.periodTwoMin==0) {
        sumTwo.innerHTML='= '
        sumThree.innerHTML='= '
        sumFour.innerHTML='= '
      //  sumFive.innerHTML='Доходность итого (весь срок вклада) = '
    }
    else{
         let n = parseFloat(((result.periodTwoMax-result.periodOneMax)/result.periodPay).toFixed())
        for (let i = 0; i<n; i++) {
            date.setDate(date.getDate()+result.periodPay)
            let time = date.getFullYear()%4==0?366:365
            let insertPay = parseFloat((totalPayTwo * result.procentTwo) * (result.periodPay/time))
            totalPayTwo += parseFloat(insertPay)
        }
        sumTwo.innerHTML='= ' + (totalPayTwo-procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        sumFive.innerHTML='Доходность итого (весь срок вклада) = ' + (totalPayTwo-procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        return raschetPeriodThree(totalPayTwo, date)
    }
   
}
//функция по расчёту вклада с капатилизацией по 3 периоду
function raschetPeriodThree(totalPayTwo, date) {
    let totalPayThree = parseFloat(totalPayTwo)
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    let procentMain= sumCredit.value
    procentMain = parseFloat(procentMain.replace(/ /g, ''))
    if(result.periodThreeMin==0) {
        sumThree.innerHTML='= '
        sumFour.innerHTML='= '
       // sumFive.innerHTML='Доходность итого (весь срок вклада) = '
    }
    else{
        let n = parseFloat(((result.periodThreeMax-result.periodTwoMax)/result.periodPay).toFixed())

        for (let i = 0; i<n; i++) {
            date.setDate(date.getDate()+result.periodPay)
            let time = date.getFullYear()%4==0?366:365
            let insertPay = parseFloat((totalPayThree * result.procentThree) * (result.periodPay/time))
            totalPayThree += parseFloat(insertPay)
                            
        }
        sumThree.textContent='= ' + (totalPayThree-procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        sumFive.innerHTML='Доходность итого (весь срок вклада) = ' + (totalPayThree-procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        raschetPeriodFour(totalPayThree, date)
    }
    
}
//функция по расчёту вклада с капатилизацией по 4 периоду
function raschetPeriodFour(totalPayThree, date) {
    let totalPayFour = parseFloat(totalPayThree)
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    let procentMain= sumCredit.value
    procentMain = parseFloat(procentMain.replace(/ /g, ''))
    if(result.periodFourMin==0) {
        sumFour.innerHTML='= '
       // sumFive.innerHTML='Доходность итого (весь срок вклада) = '
    }
    else {
        let n = parseFloat(((result.periodFourMax-result.periodFourMin)/result.periodPay).toFixed())
        for (let i = 0; i<n; i++) {
            date.setDate(date.getDate()+result.periodPay)
            let time = date.getFullYear()%4==0?366:365
            let insertPay = parseFloat((totalPayFour * result.procentFour) * (result.periodPay/time))
            totalPayFour += parseFloat(insertPay)  
        }
        sumFour.textContent='= ' + (totalPayFour-procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        sumFive.innerHTML='Доходность итого (весь срок вклада) = ' + (totalPayFour-procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        return
    }
    
}

//функция по определнию капиталазции вкладов
function raschetVklad(evt) {
    evt.preventDefault()
    let sumVklad=sumCredit.value
    sumVklad = parseFloat(sumVklad.replace(/ /g, ''))
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    if(sumVklad>=result.minSumVklad){
        if(result.capitalyti==true) {
            raschetPeriodOne()
        }
        else if(result.capitalyti==false) {
            raschetPeriodNoCaitalityOne()
        }
    }
    else (
        alert('Ошибка, минимальная сумма вклада не соотвествует выбранному продукту'+ '\nМин сумма продукта: ' + result.minSumVklad.toLocaleString() + '\nВаша сумма: ' + sumVklad.toLocaleString())
    )
}

//функция по расчёту вклада без капатилизацией по 1 периоду
function raschetPeriodNoCaitalityOne() {
    let procentMain=0
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    let totalPay = sumCredit.value
    totalPay = parseFloat(totalPay.replace(/ /g, ''))
    let date = new Date()
    let n = parseFloat((result.periodOneMax/result.periodPay).toFixed())
    
    for (let i = 0; i<n; i++) {
        date.setDate(date.getDate()+result.periodPay)
        let time = date.getFullYear()%4==0?366:365
        let insertPay = parseFloat((totalPay * result.procentOne) * (result.periodPay/time))
        procentMain += parseFloat(insertPay)
        console.log(insertPay)
    }
    sumOne.innerHTML='= ' + procentMain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    sumFive.innerHTML='Доходность итого (весь срок вклада) = ' + (procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    return raschetPeriodNoCaitalityTwo(date, procentMain)
    

}
//функция по расчёту вклада без капатилизацией по 2 периоду
function raschetPeriodNoCaitalityTwo(date, procentMain) {
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    let totalPay = sumCredit.value
    totalPay = parseFloat(totalPay.replace(/ /g, ''))
    let a = procentMain
    let n = parseFloat(((result.periodTwoMax-result.periodOneMax)/result.periodPay).toFixed())
    if(result.periodTwoMin==0) {
        sumTwo.innerHTML='= '
        sumThree.innerHTML='= '
        sumFour.innerHTML='= '
        //sumFive.innerHTML='Доходность итого (весь срок вклада) = '
    }
    else{
        for (let i = 0; i<n; i++) {
            date.setDate(date.getDate()+result.periodPay)
            let time = date.getFullYear()%4==0?366:365
            let insertPay = parseFloat((totalPay * result.procentTwo) * (result.periodPay/time))
            procentMain += parseFloat(insertPay)
            console.log(insertPay)
        }
        sumTwo.innerHTML='= ' + (procentMain-a).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        sumFive.innerHTML='Доходность итого (весь срок вклада) = ' + (procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        return raschetPeriodNoCaitalityThree(date, procentMain)    
    }
    
}
//функция по расчёту вклада без капатилизацией по 3 периоду
function raschetPeriodNoCaitalityThree(date, procentMain) {
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    let totalPay = sumCredit.value
    totalPay = parseFloat(totalPay.replace(/ /g, ''))
    let a = procentMain
    let n = parseFloat(((result.periodThreeMax-result.periodTwoMax)/result.periodPay).toFixed())
    if(result.periodThreeMin==0) {
        sumThree.innerHTML='= '
        sumFour.innerHTML='= '
        //sumFive.innerHTML='Доходность итого (весь срок вклада) = '
    }
    else {
        for (let i = 0; i<n; i++) {
            date.setDate(date.getDate()+result.periodPay)
            let time = date.getFullYear()%4==0?366:365
            let insertPay = parseFloat((totalPay * result.procentThree) * (result.periodPay/time))
            procentMain += parseFloat(insertPay)
            console.log(insertPay)
        }
        sumThree.innerHTML='= ' + (procentMain-a).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        sumFive.innerHTML='Доходность итого (весь срок вклада) = ' + (procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        raschetPeriodNoCaitalityFour(date, procentMain)
    }
    

}
//функция по расчёту вклада без капатилизацией по 4 периоду
function raschetPeriodNoCaitalityFour(date, procentMain) {
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    let totalPay = sumCredit.value
    totalPay = parseFloat(totalPay.replace(/ /g, ''))
    let a = procentMain
    let n = parseFloat(((result.periodFourMax-result.periodThreeMax)/result.periodPay).toFixed())
    if(result.periodFourMin==0) {
        sumFour.innerHTML='= '
       // sumFive.innerHTML='Доходность итого (весь срок вклада) = '
    }
    else {
        for (let i = 0; i<n; i++) {
            date.setDate(date.getDate()+result.periodPay)
            let time = date.getFullYear()%4==0?366:365
            let insertPay = parseFloat((totalPay * result.procentFour) * (result.periodPay/time))
            procentMain += parseFloat(insertPay)
        }
        sumFour.innerHTML='= ' + (procentMain-a).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        sumFive.innerHTML='Доходность итого (весь срок вклада) = ' + (procentMain).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
        return
    }
    
    
}

//вывод данных по началу и концу периода с процентами
function resultVklad() {
    const result = vklad.data.find(obj => obj.name === credictProduct.value)
    if(twoSecond.value == 'Выберите вклад') {
        periodOneMin.value=0
        priodOneMax.value=0
        procentOne.value=0
        periodTwoMin.value=0
        priodTwoMax.value=0
        procentTwo.value=0
        periodThreeMin.value=0
        priodThreeMax.value=0
        procentThree.value=0
        periodFourMin.value=0
        priodFourMax.value=0
        procentFour.value=0
    }
    else{
        periodOneMin.value=result.periodOneMin
        priodOneMax.value=result.periodOneMax
        procentOne.value=(result.procentOne*100).toFixed(2)
        periodTwoMin.value=result.periodTwoMin
        priodTwoMax.value=result.periodTwoMax
        procentTwo.value=(result.procentTwo*100).toFixed(2)
        periodThreeMin.value=result.periodThreeMin 
        priodThreeMax.value=result.periodThreeMax
        procentThree.value=(result.procentThree*100).toFixed(2)
        periodFourMin.value=result.periodFourMin
        priodFourMax.value=result.periodFourMax
        procentFour.value=(result.procentFour*100).toFixed(2)
    }
   
}




