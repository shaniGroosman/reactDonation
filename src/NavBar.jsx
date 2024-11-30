import "./nav.css";
import { Link } from "react-router-dom"


//פונקציה שמשנה את ערך המטבע
const NavBar = ({changeType}) => {
    function changeTypeNav(value){
        changeType(value)
    }

    return (
        <nav className="navB">
            <div className="logo">
                <img src="../src/assets/logo.png" alt="Logo" />
            </div>
            <ul>
                <li ><Link to="/new">לתרומות </Link></li>
                <li><Link to="/all">להצגת מצב הקמפיין </Link></li>
            </ul>
            <select onChange={(e)=>changeTypeNav(e.target.value)} >
                <option value="s">שקל</option>
                <option value="d">דולר</option>
            </select>
        </nav>
    )
}
export default NavBar;