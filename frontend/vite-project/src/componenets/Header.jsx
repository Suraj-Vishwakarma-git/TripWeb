import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Search from "./pages/Search.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const Header = ({searchI,setsearchI}) => {
  
  const [isopen,setIsopen]=useState(false);

  const location = useLocation();
  
const token = localStorage.getItem("token");
const islogein = !!token;
    
    function toggle(){
        setIsopen(!isopen);
    }

    const navigate = useNavigate();

    const handleSearch = () => {
    navigate("/search");
     };

     const handlelogout=()=>{
      localStorage.removeItem("token");
      navigate("/");
     }

    return (
    <>
    <div className="header">
        <div className="logo"><span>Travel</span><span style={{color:"red"}}>X</span></div>
      <div className="sgroup"><input type="text" id="int" placeholder="Search Places" value={searchI} onChange={(e)=>setsearchI(e.target.value)} style={{width:"70px",borderRadius:"5px",fontSize:"10px"}}/>
      <button id="Splace" onClick={handleSearch} style={{width:"60px",fontSize:"12px",height:"35px"}}>Search</button></div>
        <nav className={isopen? "nav active":"nav"}>
            <ul>
                <li><Link to="/" onClick={toggle} >Home</Link></li>
                <li><Link to="/bookinghistory"onClick={toggle} >MyBooking</Link></li>
                <li className="mobile-signup">
              {
                islogein?(<button className="signup-mobile" onClick={handlelogout}>Logout</button>):( <Link to="/signup" onClick={toggle}>  <button className="signup-mobile">Signup</button></Link>)
              
              }
            
                </li>
            </ul>
        </nav>
        
         {
                islogein?(<button className="login-btn" onClick={handlelogout}>Logout</button>):( <Link to="/signup" onClick={toggle}>  <button className="login-btn">Signup</button></Link>)
              
              }
        
        <div className="hamburger" onClick={toggle}> ☰</div>
    </div>
    </>
  )
}

export default Header
