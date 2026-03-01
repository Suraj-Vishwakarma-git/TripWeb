import React from 'react'
import "../pages/Sign.css";
import { Link } from "react-router-dom";
import { useState } from 'react';
const Signup = () => {

    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
   async function signup(){
    const api=await fetch("https://tripweb-xmwf.onrender.com/api/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:name,email:email,password:password})
    });
    const data=await api.json();
    alert(data.message);
   }
 

  return (
    <div id='mainB'>
      <div className="form S">
        <h1>
            Signup
        </h1>
        <input type='text' placeholder='Enter you Name' value={name} onChange={(e)=>setname(e.target.value)}/>
        <input type='email' placeholder='Enter Your Email'value={email } onChange={(e)=>setemail(e.target.value)}/>
        <input type='password'placeholder='Enter Password'value={password} onChange={(e)=>setpassword(e.target.value)}/>
        <button id='signup' onClick={signup}>Signup</button>
        <h4>Already Have Account?</h4>
     <Link to="/login"> <button id='login'>Login</button></Link>  
      </div>
    </div>
  )
}

export default Signup
