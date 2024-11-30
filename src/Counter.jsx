import { useState, useEffect } from "react";
import './counter.css';

const Counter = () => {
  const [families, setFamilies] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [meals, setMeals] = useState(0);

  useEffect(() => {
    // אנימציה של מספרים
    const incrementNumbers = () => {
      if (families < 1200) setFamilies(prev => Math.min(prev + 5, 1200));
      if (days < 365) setDays(prev => Math.min(prev + 1, 365));
      if (hours < 24) setHours(prev => Math.min(prev + 1, 24));
      if (meals < 3600) setMeals(prev => Math.min(prev + 10, 3600));
    };

    const interval = setInterval(incrementNumbers, 10); // עדכון כל 10מ"ל
    return () => clearInterval(interval); // לנקות את ה-interval כשהקומפוננטה תתנתק
  }, [families, days, hours, meals]);

  return (
    <div className="counter-container">
      <div className="counter-item">
        <img src="../src/assets/h.gif" alt="" />
        <h3>{families}</h3>
        <p>משפחות בשנה  </p>

      </div>
      <div className="counter-item">
        <img src="../src/assets/d.gif" alt="" />
        <h3>{days}</h3>
        <p>ימים בשנה</p>
      </div>
      <div className="counter-item">
        <img src="../src/assets/a.gif" alt="" />
        <h3>{hours}</h3>
        <p>שעות ביממה</p>
      </div>
      <div className="counter-item">
        <img src="../src/assets/f.gif" alt="" />
        <h3>{meals}</h3>
        <p>ארוחות בשנה</p>

      </div>
    </div>

  );
};

export default Counter;