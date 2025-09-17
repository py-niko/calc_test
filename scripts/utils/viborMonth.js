export function viborMonth() {
    const month = parseInt(timeCredit.value)*12
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    let time;
    if((month/12)>result.maxAge) {
        alert('Количество лет превышает допустимое значение необходимо уменьшить срок кредита \nМаксимальный срок кредита: ' + result.maxAge)
    }
    else{
        switch (true) {
            case month>=12 && month<=48:
                time = result.timeOne
               sendForm(month, time)
            break
            case month>=49 && month<=120:
                time = result.timeSecond
                sendForm(month, time)
            break
            case month>=121 && month<=240:
                time = result.timeTherty
               sendForm(month, time)
            break
            case month>=241 && month<=360:
                time = result.timeFoty
                sendForm(month, time)
            break         
        }
    }        
}

export function sendForm(month, time) {
    const zarplataStNum = parseFloat(zarplataSt.value)
    const result = creditProduct.find(obj => obj.program === celsProgram.value && obj.name === credictProduct.value)
    const kiStNum = parseFloat(kiSt.value)
    const electronStNum = parseFloat(electronSt.value)
    const noRefStNum = parseFloat(noRefSt.value)
    const noStrahovlaStNum = parseFloat(noStrahovkaSt.value)
    let newSumCredit=sumCredit.value
    newSumCredit = parseFloat(newSumCredit.replace(/ /g, ''))
    let newCostHous=costHouse.value
    newCostHous = parseFloat(newCostHous.replace(/ /g, ''))
    const kz = (parseFloat(newSumCredit/newCostHous)*100).toFixed(3)
    
    let procent;
    switch (true){
                case kz>=10 && kz<=15:
                    procent=(result.procent+time+result.kZ1-(zarplataStNum/100)-(kiStNum/100)-(electronStNum/100)-(noRefStNum/100)+(noStrahovlaStNum/100))*100
                    resultingCredit(newSumCredit,month, procent, kz)
                    
                break
                case kz>=16 && kz<=50:
                    procent=(result.procent+time+result.kZ2-(zarplataStNum/100)-(kiStNum/100)-(electronStNum/100)-(noRefStNum/100)+(noStrahovlaStNum/100))*100
                    resultingCredit(newSumCredit,month, procent, kz)
                break
                case kz>=51 && kz<=70:
                    procent= (result.procent+time+result.kZ3-(zarplataStNum/100)-(kiStNum/100)-(electronStNum/100)-(noRefStNum/100)+(noStrahovlaStNum/100))*100
                    resultingCredit(newSumCredit,month, procent, kz)
                    
                break
                case kz>=71 && kz<=80:
                    procent=(result.procent+time+result.kZ4-(zarplataStNum/100)-(kiStNum/100)-(electronStNum/100)-(noRefStNum/100)+(noStrahovlaStNum/100))*100
                    resultingCredit(newSumCredit,month, procent, kz)
                break
                case kz>=81:
                    procent=(result.procent+time+result.kZ5-(zarplataStNum/100)-(kiStNum/100)-(electronStNum/100)-(noRefStNum/100)+(noStrahovlaStNum/100))*100
                    resultingCredit(newSumCredit,month, procent, kz)
                break
                default:
                alert('К/З меньше минимального, необходимо увеличить К/З \nМинимальное К/З = 10\nНа данный момент К/З: ' + kz)
    }
}