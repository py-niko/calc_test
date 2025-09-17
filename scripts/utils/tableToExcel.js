import { table } from "./constant.js"
//функция по скачиванию таблицы в excel
export function tableToExcel(evt) {
    evt.preventDefault()
    var table2excel = new Table2Excel();
    table2excel.export(table);
}