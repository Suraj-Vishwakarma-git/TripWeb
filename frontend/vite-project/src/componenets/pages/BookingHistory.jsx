import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./BookingHistory.css"
import { Link } from 'react-router-dom'

const BookingHistory = () => {
    const [his,sethis]=useState([]);

    useEffect(()=>{
      const fetchhistory=async()=>{
        const token=localStorage.getItem("token");
     const API=await fetch("http://localhost:5000/api/auth/bookinghistory",{
       method:"POST",
        headers:{Authorization:`Bearer ${token}`}
     });
            const data=await API.json();
            sethis(data.bookh);
      };
    fetchhistory();
    },[]);

    const token=localStorage.getItem("token");
    if(!token){
      return <div style={{display:"flex",height:"70vh",width:"100vw",alignItems:"center",flexDirection:"column",gap:"20px",position:"absolute",top:"300px"}}>
        <h4>LogIn to check Your BookingDetails</h4>
       <Link to="/login" style={{border:"2px solid white",padding:"10px",borderRadius:"10px",color:"white"}}>Login</Link>  
        </div>
       
  }

    if(!his){
      return <h1>Loading...</h1>
    }

  return (
    <div>
 <div className="title">
      <h3 id='tittle'>Your Booking History</h3></div>
      <div className="histid">
      <div className="histt">
      {his.length === 0 ? (
  <p className="empty">No Bookings Yet</p>
) : (
  his.map((e) => (
    <div key={e._id} className="history-card">
      <img src={e.image} alt={e.title} className="history-img" />

      <div className="history-info">
        <h4>{e.title}</h4>
        <p><strong>Price:</strong> ₹{e.price}</p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(e.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </p>
        <p><strong>From:</strong> {e.country}</p>
      </div>
    </div>
  ))
)}
      </div>
      </div>
    </div>
  )
}

export default BookingHistory
