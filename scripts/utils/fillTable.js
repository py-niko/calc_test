// функции по создании таблицы на основе полученных данных
export function fillTable(paymentSchedul) {
    let table = document.getElementById('paymentScheduleTable')
    let headerRow = table.insertRow(0);
    let monthHeader = headerRow.insertCell(0);
    monthHeader.textContent = "Месяц";
    let insertPaymentMainCredit = headerRow.insertCell(1);
    insertPaymentMainCredit.textContent = "Размер кредита"
    let insertPaymentMonthHeader = headerRow.insertCell(2);
    insertPaymentMonthHeader.textContent = "Общий долг";
    let insertPaymentHeader = headerRow.insertCell(3);
    insertPaymentHeader.textContent = "Оплата процентов";
    let principalPaymentHeader = headerRow.insertCell(4);
    principalPaymentHeader.textContent = "Оплата основного долга";
    let remainingPaymentHeader = headerRow.insertCell(5);
    remainingPaymentHeader.textContent = "Остаток по кредиту";

        for (let i = 0; i <paymentSchedul.length; i++) {
            let row = table.insertRow(i+1)
            let monthCell = row.insertCell(0)
            let remainingPaymnetMainCell = row.insertCell(1)
            let insertPaymentMonth = row.insertCell(2)
            let insertPaymnetCell = row.insertCell(3)
            let principalPaymnetCell = row.insertCell(4)
            let remainingPaymnetCell = row.insertCell(5)
            
            monthCell.innerHTML = paymentSchedul[i].month
            remainingPaymnetMainCell.innerHTML=paymentSchedul[i].principalPaymnetMainCredit.toLocaleString()
            insertPaymentMonth.innerHTML=paymentSchedul[i].monthOpata.toLocaleString()
            insertPaymnetCell.innerHTML=paymentSchedul[i].insertPayment.toLocaleString()
            principalPaymnetCell.innerHTML=paymentSchedul[i].principalPaymnet.toLocaleString()
            remainingPaymnetCell.innerHTML=paymentSchedul[i].remaingPrinciple.toLocaleString()

        }
}