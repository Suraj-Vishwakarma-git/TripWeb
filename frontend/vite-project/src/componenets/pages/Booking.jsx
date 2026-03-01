import React from 'react'
import "./Booking.css";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

const Booking = () => {
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

  const {id}=useParams();
  const [binfo, setBinfo] = useState(null);

 const [selectedcountry,setselectedcountry]=useState("");
 const [seledate,setseledate]=useState("");


  useEffect(()=>{
    async function fetchTrip(){
      const res=await fetch(`http://localhost:5000/api/auth/tripdd/${id}`);
      const dd=await res.json();
      setBinfo(dd);
    }
    fetchTrip();
  },[id]);

  if (!binfo) {
    return <h2>Loading...</h2>;
  }

   
  async function book(e){
     e.preventDefault(); 
    const token = localStorage.getItem("token");
     const API=await fetch("https://tripweb-xmwf.onrender.com/api/auth/booking",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
      body:JSON.stringify({id:binfo._id, country:selectedcountry,date:seledate})
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
        <p className='product-price'>₹{binfo.ticketPrice}</p>
      
        <input type='date' value={seledate} onChange={(e)=>setseledate(e.target.value)} min={new Date().toISOString().split("T")[0]}></input>
        <select value={selectedcountry} onChange={(e)=>setselectedcountry(e.target.value)} required id='selectC'>
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
