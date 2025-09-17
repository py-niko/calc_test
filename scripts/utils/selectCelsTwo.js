import { creditProduct } from "./constance.js";
import { paramentGroup } from "./constant.js";
import { addAtribute } from "./addAtribute.js"
import { resetPayment } from "./resetPayment.js"
import { isValidSelect } from "./isValidSelect.js"

//функция выбора 2 сетектора с установкой атрибутов, очитски форм и валидации
export function selectCelsTwo () {
    let selectGroup = creditProduct.find(function(item){
        return item.name === this.value
    }, this)
    paramentGroup.innerHTML=''
    selectGroup.groups.forEach(function(item){
    let option = document.createElement('option');
    option.text=item
    option.value=item
    paramentGroup.appendChild(option)
    })
    addAtribute()
    resetPayment()
    isValidSelect()

}