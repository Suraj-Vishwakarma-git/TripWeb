import React from 'react'
import { useState } from 'react';

const Login = () => {

    const [email,setemail]=useState("");
        const [password,setpassword]=useState("");
       async function login(){
        const api=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:email,password:password})
        });
        const data=await api.json();
        if(api.ok){
          localStorage.setItem("token",data.token);
          alert(data.message);
        }
        
       }
  return (
   <div id='mainB'>
      <div className="form L">
        <h1>
            Login
        </h1>
       <input type='email' placeholder='Enter Your Email'value={email } onChange={(e)=>setemail(e.target.value)}/>
        <input type='password'placeholder='Enter Password'value={password} onChange={(e)=>setpassword(e.target.value)}/>
        <button id='login' onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Login
