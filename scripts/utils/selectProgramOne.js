import { initialCredit } from "./constance.js";
import { resetPayment } from "./resetPayment.js";
import { firstOne, twoSecond, timeCredit, paramentGroup } from "./constant.js";
//функции по переборы объектов из constance.js
initialCredit.forEach(function(item){
    const option = document.createElement('option');
    option.text = item.program
    option.value = item.program;
    option.innerHTML = item.program;
    firstOne.appendChild(option)
});

export function selectProgramOne () {
    let selectCredit = initialCredit.find(function(item) {
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