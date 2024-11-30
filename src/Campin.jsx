import { useEffect, useState } from "react";
import { shekelToCoin } from './Unites';
import './campin.css'

//מאתחל קמפיין באחוז מספר התורמים ויעד
const Campin = ({ sum, trumaArr, coin }) => {
    let target = 10000;
    const [campaignStatus, setCampaignStatus] = useState({
        count: trumaArr.length,
        sum: sum
    })
    //פונקציה בעת טעינת הדף מעדכנת את מספר האחוזים
    useEffect(() => {
        let copy = { ...campaignStatus, count: trumaArr.length, sum: sum }
        setCampaignStatus(copy)

    }, [trumaArr])
    //מחשב את אחוז מתו היעד
    let present = (campaignStatus.sum / target) * 100
    let presentPercentage = Math.round(present, 100);

    console.log(present);

    return (


        <div className="campaign-status">
            {/* פס ההתקדמות */}
            <div className="progress-bar-container">
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${presentPercentage}%` }}></div>
                </div>
                {/* עיגול שמזיז את עצמו לפי האחוז */}
                <div className="range-thumb" style={{ left: `${99 - presentPercentage}%` }}>
                    {presentPercentage}%
                </div>
            </div>

            <div className="range-info">

                {/* <h3 className="percentage-text">
                    {presentPercentage}% נתרמו
                </h3> */}
                <div className="campaign-details">

                    <h4> סכום שנתרם עד כה :<span className="orangeSpavm">{shekelToCoin(campaignStatus.sum, coin.doolarRate, coin.type).toFixed(2)} {coin.type === "s" ? "₪" : "$"}</span></h4>
                    <h4>מספר תורמים: <span className="orangeSpavm">{campaignStatus.count}</span></h4>
                </div>

            </div>
        </div>

    );
}


export default Campin;
