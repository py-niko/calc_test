import { errorGroup } from "./constant.js";
//import { isValidMaxGroup } from "./addAtribute.js";
//функции по удалении информации об пустой группе
export function selectRemoveGroup () {
    errorGroup.classList.remove('popup__input-error_visible');
    errorGroup.textContent = ''
    //isValidMaxGroup()
}