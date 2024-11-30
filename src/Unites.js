
//פפונקציה שמחיזרה את ער השקלים בדולר 
export function shekelToCoin(sumInShekel, dollarRate, type) {
    if (type == "s")
        return sumInShekel
    return sumInShekel / dollarRate;
}
//פונקציה שמקבלת את ער הדולר והסוג ומחיזרה אצ הערך בדולרים
export function coinToShekel(sumInShekel, dollarRate, type) {
    if (type == "s")
        return sumInShekel
    return sumInShekel * dollarRate;
}
//פונקציה המחשבת את הזמן שעבר מתרומה וע ד עכשיו
export function calcuateTime(data) {
    const currenDate = new Date();
    const otherDate = new Date(data)
    const minute = Math.floor((currenDate - otherDate) / (1000 * 60));
    const hours = Math.floor((minute / 60));
    const date = Math.floor(minute / (60 * 24));

    if (minute < 60) {
        return `${minute} דקות`
    }
    else if (hours < 24) {
        return `${hours} שעות`
    }
    else {
        return `${date} ימים`
    }
}
