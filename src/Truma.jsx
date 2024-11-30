import { useState } from "react";
import "./truma.css";
import { coinToShekel } from "./Unites";
import TextField from '@mui/material/TextField';


const Truma = (props) => {
//4 אפשרויות לתרומה 
    const amounts = [
        {
            amount: 90, text: "תרומת סלי מזון", some: "במשך כל ימות השנה, פועלים פעילי ומתנדבי האגודה, לאימוץ ולסיוע לאלה שידן אינה משגת. "
            , image: "../src/assets/top_img1.png", monoy: "  90 "
        },
        {
            amount: 180, text: "בית חם", some: "בית חם של עמותת  ר נועד להעניק לקשישים, ניצולי שואה ונזקקים, מרחב בטוח ומכיל"
            , image: "../src/assets/top_img2.png", monoy: "  180 "
        },
        {
            amount: 360, text: "פרויקטים בהתנדבות", some: "מעבר לפעילות השוטפת, מפעילה עמותת  גם פרויקטים נקודתיים על-מנת לסייע לאוכלוסיות בסיכון "
            , image: "../src/assets/top_img3.png", monoy: "  360 "
        },
        {
            amount: 960, text: "מתנדבים בעמותה", some: "המתנדבים המופלאים של עמותת למען החיים  שעל ידי מזון לחיים הם הלב הפועם של פעילות העמותה"
            , image: "../src/assets/top_img4.png", monoy: "  960 "
        }
    ];
//במקרה שיש שגיאה 
    let [err, setErr] = useState({})
    let [empty, setempty] = useState({
        DonorName: "",
        price: "",
        dedication: "",
        payment: ""
    })
    //אפשריות תרומה
    let payment = [{ id: 1, name: "מזומן" },
    { id: 2, name: "אשראי" },
    { id: 3, name: "העברה בנקאית" },
    { id: 4, name: "נציג עד הבית" }
    ]

//אם יש שגירות מדפיס הודעה מתריצה
    const validate = () => {
        let errors = {};
        if (!empty.DonorName)
            errors.DonorName = "שדה חובה"
        if (!empty.price)
            errors.price = "שדה חובה"
        else if (empty.price <= 0)
            errors.price = "הקש סכום גדול מ0"
        if (!empty.dedication)
            errors.dedication = "חבל שלא נדע לזכות מי"
        return errors;
    };

///שמירת התרומה החדשה
    const save = (e) => {
        e.preventDefault();
        let result = validate()
        setErr(result)

        if (Object.keys(result).length == 0) {
            alert("נשמר בהצלחה ")
            let x = { ...empty, price: coinToShekel(empty.price, props.coin.doolarRate, props.coin.type) }
            setempty(x)
            props.onAdd(x)
            setempty({ DonorName: "", price: "", dedication: "", payment: "" });
        }


    };
    const handleAmountSelect = (amount) => {
        setempty(prevState => ({
            ...prevState,
            price: amount
        }));
    };

    const change = (e) => {
        let { type, value, name } = e.target;
        if (type == "number")
            value = +value;
        let copy = { ...empty }
        copy[name] = value
        setempty(copy)

    }

    return (<>

        <div className="amount-options">
            {amounts.map((amount) => (
                <div
                    key={amount.amount}
                    className="amount-div"
                    onClick={() => handleAmountSelect(amount.amount)}
                >
                    <img src={amount.image} alt={`תמונה עבור ${amount.amount} ש"ח`} className="amount-img" />
                    <span className="textAmount">{amount.text}</span>
                    <span className="someAmount">{amount.some}</span>
                    <span className="monoyAmount"><i className="fa-regular fa-hand-point-left"></i>

                        {amount.monoy} ש"ח</span>
                </div>
            ))}
        </div>
        <form className="formTruma" onSubmit={save}>

            <label>שם</label> 
             <input name="DonorName" type="text" placeholder="מה השם שלך" value={empty.DonorName} onChange={change} />
            {/* <TextField
                name="DonorName"
                label="השם שלך"
                variant="standard"
                value={empty.DonorName}
                onChange={change}
                // fullWidth
            /> */}
            {/* <TextField   name="DonorName"label="מה השם שלך" variant="שם" value={empty.DonorName} onChange={change} /> */}
            {err.DonorName && <div style={{ Color: "red" }}>{err.DonorName}</div>}
            <label>סכום</label>



            <input type="number" name="price" placeholder="מה הסכום לתרומה" value={empty.price} onChange={change} />
            {err.price && <div style={{ Color: "red" }}>{err.price}</div>}
            <label>הקדשה</label>
            <input type="text" name="dedication" placeholder="לזכות מי?" value={empty.dedication} onChange={change} />
            {err.dedication && <div style={{ Color: "red" }}>{err.dedication}</div>}
            <label>איך תרצה לתרום?</label>
            <select name="payment" onChange={change}>
                {payment.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )
                }
            </select>
            <input type="submit" value={"תרום"} />
        </form>
    </>)

}
export default Truma;