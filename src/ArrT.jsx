import { useEffect, useState } from 'react';
import One from './One';
import './search.css';

const ArrT = (props) => {
    const [copy, setCopy] = useState(props.allArr);
    //פונקציותמיון על המערך של התרומות 
    function sorted(value) {
        let sortedArray = [...props.allArr]; // Create a copy of the original array

        if (value === "new") {
            sortedArray.reverse(); // Reverse the copied array
        } else if (value === "old") {
            sortedArray = [...props.allArr]; // No change needed

        } else if (value === "low") {
            sortedArray.sort((a, b) => a.price - b.price); // Sort by price ascending
        } else if (value === "high") {
            sortedArray.sort((a, b) => b.price - a.price); // Sort by price descending
        }

        setCopy(sortedArray); // Update the state with the sorted array
    }
    //בעת טעינת הדף מציגה את המער
    useEffect(() => {
        setCopy(props.allArr);
    }, [props.allArr]);
    //פונקצית יפוש לפי שם או הקדשה 
    function search(e) {
        let word = e.target.value;
        let filteredArray = props.allArr.filter((str) =>
            str.DonorName.includes(word) || str.dedication.includes(word)
        );
        setCopy(filteredArray);
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    name="select"
                    placeholder="חפש לפי שם תורם או הקדשה"
                    onChange={search}
                />
                <label>מיין לפי</label>
                <select name="sort" onChange={(event) => sorted(event.target.value)}>
                    <option value="new">חדש ביותר</option>
                    <option value="old">ישן ביותר</option>
                    <option value="low">גובה התרומה מהנמוך לגבוה</option>
                    <option value="high">גובה התרומה מגבוה לנמוך</option>
                </select>
            </div>

            <div className="arr-container">
                {copy.map(item => (
                    <div className='donation-card' key={item.id}>
                        <One x={item} coin={props.coin} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ArrT;
