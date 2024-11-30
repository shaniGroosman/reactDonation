import { shekelToCoin, calcuateTime } from './Unites';
import { useEffect, useState } from 'react';
import './arr.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faUser, faPencil, faClock, faHeart, faHandshake } from '@fortawesome/free-solid-svg-icons';

const One = ({ x, coin }) => {
  const [clickCount, setClickCount] = useState(0); // מעקב אחרי כמות הלחיצות על אייקון הידיים
  const timeAgo = calcuateTime(x.date);

  // פונקציה שמעדכנת את מספר הלחיצות
  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <div>
      <h2 className="donation-header">
        {/* <FontAwesomeIcon icon={faUser} className="icon" /> */}
        {x.DonorName}
      </h2>
      <p className="donation-amount">
        {/* <FontAwesomeIcon icon={faMoneyCheckDollar} className="icon" /> */}
        {shekelToCoin(x.price, coin.doolarRate, coin.type).toFixed(0)} {coin.type === "s" ? "₪" : "$"}
      </p>
      <p className="donation-dedication">
        {/* <FontAwesomeIcon icon={faPencil} className="icon" /> */}
        {x.dedication}
      </p>
      <p className="donation-time">
        {/* <FontAwesomeIcon icon={faClock} className="icon" /> */}
        {timeAgo}
      </p>

      <div className="icon-container">
        <FontAwesomeIcon icon={faHeart} className="heart-icon" />
        <FontAwesomeIcon icon={faHandshake} className="hands-icon" onClick={handleClick} />
        <p className="thank-you-text">תנו שכוייח!!!</p>
      </div>

      {/* אייקון ידיים המוצג כל הזמן */}
      <div className="always-visible-hands-icon">
        <FontAwesomeIcon icon={faHandshake} className="icon" />
        <span className="click-count">{clickCount} נתנו שכוייח!!!</span>
      </div>
    </div>
  );
};

export default One;
