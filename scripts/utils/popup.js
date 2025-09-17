import { popup } from "./constant.js"
//функции по открытию и закрытию popup
export function popupOpen(evt) {
    evt.preventDefault()
    popup.classList.add('popup_opened')
}

export function popupClose(evt) {
    evt.preventDefault()
    
    popup.classList.remove('popup_opened')
}