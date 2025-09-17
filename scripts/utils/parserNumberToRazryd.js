//функция по разбиению числа на разряды
export function parserNumberToRazryd(input) {
    let value = input.value;
    value = value.replace(/[^0-9.]/g, '')
    value = value.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
    input.value = value
    
}