import React from 'react'
import "./Booking.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Booking = ({binfo}) => {
  const navigate = useNavigate();

  async function book(){
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
      <div className='product-card' key={binfo._id}>
        <img src={binfo.image} alt={binfo.title} id='img'/>
        <h3 className='product-title'>{binfo.title}</h3>
        <p className='product-price'>${binfo.ticketPrice}</p>
      <button className='Playment-btn'onClick={book} >Pay Now</button> 
        </div>
   
      
      </div> 
     
    </div>
  )
}

export default Booking
