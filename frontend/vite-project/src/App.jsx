import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componenets/Header";
import Home from "./componenets/pages/Home.jsx";
import Booking from "./componenets/pages/Booking.jsx";
import Places from "./componenets/pages/Places.jsx"
import Signup from "./componenets/pages/Signup.jsx"
import Login from "./componenets/pages/Login.jsx"
import Search from "./componenets/pages/Search.jsx"

import { useState } from "react";


function App() {
 const [searchI,setsearchI]=useState("");
 const [binfo,setbinfo]=useState(null);


  return (
    <Router>
      <Header searchI={searchI} setsearchI={setsearchI} />

      <Routes>
        <Route path="/" element={<Home setbinfo={setbinfo}  />} />
        <Route path="/places" element={<Places/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/booking" element={<Booking  binfo={binfo} />}/>
        <Route path="/search" element={<Search searchI={searchI} setbinfo={setbinfo} />}/>
      </Routes>
    </Router>
  );
}

export default App;