import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Truma from './Truma'
import { json, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import ArrT from './ArrT'
import Campin from './Campin'
import Counter from './Counter'
import RadioGroupRating  from './End'
// import Campin from './campin'

function App() {
  //מאתחל את ער המטבעועת סכום ההזמנות
  const [coin, setCoin] = useState({ type: "s", doolarRate: 3.5 });
  const [sum, setSum] = useState(0)
  //פונקציב העת טעינת הדף מקבלת את ערך הדולר היום
  useEffect(() => {
    // fetch("https://v6.exchangerate-api.com/v6/ed77662188c9bc0888860393/latest/USD")
    fetch("https://fakestoreapi.com/products/category/")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        console.log(data.conversion_rates.ILS)
        // setCoin({ ...coin, doolarRate: data.conversion_rates.ILS })
        setCoin({ ...coin, doolarRate:3.5})
      })
      .catch(err => {
        console.log(err)
      })


    let x = getFromlocal()
    setTrumaArr(x)
    let mySum = localStorage.getItem('sum') || 0
    mySum = JSON.parse(mySum)
    setSum(mySum)
    console.log(mySum);

  }, [])

  const changeType = (value) => {
    setCoin({ ...coin, type: value })
    console.log(coin.type)
  }
 // פונקציה שמקבלצ אתה מער שנמצר בלוקלסטורד
  function getFromlocal() {
    let result = localStorage.getItem('truma')
    if (!result)
      return [{
        id: 0,
        DonorName: "אני",
        dedication: "שושנה יפה ",
        price: 0,
        date: new Date()
      }]
    const timeFromoca = JSON.parse(result)
    return timeFromoca.map(item => ({
      ...item, date: new Date(item.date)
    }))
  }

  let [trumaArr, setTrumaArr] = useState([])




//הוספת תרומה למערך
  const addTroma = (truma) => {
    // Campin.newDonate(truma);
    truma.id = trumaArr[trumaArr.length - 1].id + 1;
    truma.date = new Date();
    let copy = [...trumaArr, truma]
    setTrumaArr(copy)
    localStorage.setItem('truma', JSON.stringify(copy))
    let totalSum = sum + truma.price
    // console.log(sum);
    // console.log(truma.price);
    // console.log(totalSum);


    localStorage.setItem('sum', JSON.stringify(totalSum))
    setSum(totalSum)

  }

  return (
    <>
      <NavBar changeType={changeType} />
      <Campin sum={sum} trumaArr={trumaArr} coin={coin}/>
      <Counter/>
      <Routes>
        <Route path="/new" element={<Truma onAdd={addTroma} coin={coin}/>} />
        <Route path="" element={<Truma onAdd={addTroma} />} />
        <Route path="/all" element={<ArrT allArr={trumaArr} coin={coin} />} />
      </Routes>
      <RadioGroupRating/>
    </>
  )
}


export default App
