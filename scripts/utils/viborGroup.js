import { viborMonth } from "./viborMonth.js"

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
                    console.log('dddd')
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
