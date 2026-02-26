import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Search from "./pages/Search.jsx";

const Header = ({searchI,setsearchI}) => {
  
  
  const [isopen,setIsopen]=useState(false);
    function toggle(){
        setIsopen(!isopen);
    }
    const navigate = useNavigate();
    const handleSearch = () => {
    navigate("/search");
  };
    return (
    <>
    <div className="header">
        <div className="logo"><span>Travel</span><span style={{color:"red"}}>X</span></div>
      <div className="sgroup"><input type="text" id="int" placeholder="Search Places" value={searchI} onChange={(e)=>setsearchI(e.target.value)}/>
      <button id="Splace" onClick={handleSearch}>Search</button></div>
        <nav className={isopen? "nav active":"nav"}>
            <ul>
                <li><Link to="/" onClick={toggle} >Home</Link></li>
                <li><Link to="/Places"onClick={toggle} >Places</Link></li>
                <li><Link to="/booking" onClick={toggle}>booking</Link></li>
                <li><Link to="/contact" onClick={toggle}>contact</Link></li>
                <li className="mobile-signup">
              <Link to="/signup" onClick={toggle}>  <button className="signup-mobile">Signup</button></Link>
                </li>
            </ul>
        </nav>
       <Link to="/signup"><button className="login-btn" style={{margin:"10px"}}>Signup</button></Link> 
        <div className="hamburger" onClick={toggle}> ☰</div>
    </div>
    </>
  )
}

export default Header
