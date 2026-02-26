import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./BookingHistory.css"

const BookingHistory = () => {
    const [his,sethis]=useState([]);

    useEffect(()=>{
      const fetchhistory=async()=>{
        const token=localStorage.getItem("token");
     const API=await fetch("http://localhost:5000/api/auth/bookinghistory",{
        headers:{Authorization:`Bearer ${token}`}
     });
            const data=await API.json();
            sethis(data.bdetails);
      };
    fetchhistory();
    },[]);

  return (
    <div>
 <div className="title">
      <h3 id='tittle'>Your Booking History</h3></div>
      <div className="histid">
      <div className="histt">
         {his.length===0 ?(<p>No Booking yet</p>) :(
            his.map((e)=>(
                <div key={e._id} id='histtt'>
                    <span>{e.title}</span>
                    <span> ${e.price}</span>
                    </div>
            ))
         )}
      </div>
      </div>
    </div>
  )
}

export default BookingHistory
