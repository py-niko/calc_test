import { paramentGroups, errorGroup } from './constant.js'

//функция вывода ифнормации что невыбрана группа
export function isValidSelect() {
    if(paramentGroups.value === 'Выберите группу') {
        errorGroup.classList.add('popup__input-error_visible');
        errorGroup.textContent = 'Выберите группу'
    }
}