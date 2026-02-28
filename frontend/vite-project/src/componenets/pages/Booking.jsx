import React from 'react'
import "./Booking.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const Booking = ({binfo}) => {
  const navigate = useNavigate();
  const countries = [
  "India",
  "United States",
  "Canada",
  "Brazil",
  "Germany",
  "France",
  "United Kingdom",
  "Australia",
  "Japan",
  "China",
  "South Korea",
  "Russia",
  "Italy",
  "Spain",
  "Mexico",
  "South Africa",
  "Argentina",
  "Netherlands",
  "Switzerland",
  "Singapore"
];

 const [selectedcountry,setselectedcountry]=useState("");

  async function book(){
     e.preventDefault(); 
    const token = localStorage.getItem("token");
     const API=await fetch("http://localhost:5000/api/auth/booking",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
      body:JSON.stringify({id:binfo._id})
    });
       if(API.status===401){
      alert("Please Login First");
      navigate("/Signup");
      return  ;
    }
    const data=await API.json();
    alert(data.message);
}

  return (
    <div>
     <div className="box">
      <h1>Book Ticket</h1>
      <form onSubmit={book}>
      <div className='product-card' key={binfo._id}>
        <img src={binfo.image} alt={binfo.title} id='img'/>
        <h3 className='product-title'>{binfo.title}</h3>
        <p className='product-price'>${binfo.ticketPrice}</p>
      
        <select value={selectedcountry} onChange={(e)=>setselectedcountry(e.target.value)} required>
          <option value="">Select Country</option>
          {
            countries.map((e)=>(
              <option value={e} key={e} >{e}</option>
            ))
          }
        </select>
      <button className='Playment-btn' type='submit'>Pay Now</button> 
       
       
   </div>
      </form>
      </div> 
     
    </div>
  )
}

export default Booking
