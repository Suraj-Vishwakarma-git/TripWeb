import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./BookingHistory.css"
import { Link } from 'react-router-dom'

const BookingHistory = () => {
    const [his,sethis]=useState([]);
    const [selectedId,setselectedId]=useState(null);
    const [newDate,setnewDate]=useState("");

    useEffect(()=>{
      const fetchhistory=async()=>{
        const token=localStorage.getItem("token");
     const API=await fetch("https://tripweb-xmwf.onrender.com/api/auth/bookinghistory",{
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

    if(his==null){
      return <h1>Loading...</h1>
    }


    function handleReschedule(id) {
       setselectedId(id);
      }

async function Delete(id){
   const tokenn=localStorage.getItem("token");
  const API=await fetch("https://tripweb-xmwf.onrender.com/api/auth/deleteticket",{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+tokenn
    },
    body:JSON.stringify({Tid:id})
  });
  const data=await API.json();
  alert(data.message);
  sethis(his.filter(item => item._id !== id));
}


 async function confirmReschedule(id){
      const tokenn=localStorage.getItem("token");
      const API=await fetch("https://tripweb-xmwf.onrender.com/api/auth/updatetickets",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+tokenn
        },
        body:JSON.stringify({Tid:id,newDates:newDate})
      });
      const data=await API.json();
      alert(data.message);
      sethis(his.map((item)=>
      item._id===id?{...item,date:newDate}:item));
      setselectedId(null);
      setnewDate("");
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
       <div className="btn">
        <button id="reS" onClick={()=>handleReschedule(e._id)} style={{margin:"10px"}}>Reschedule</button>
        <button id='delete' onClick={()=>Delete(e._id)} >Delete Ticket</button>
        </div>
        {selectedId===e._id && (
          <div>
            <input type='date' value={newDate} onChange={(e)=>setnewDate(e.target.value)}/>
            <button onClick={()=>confirmReschedule(e._id)}>Confirm</button>
           
          </div>
        )
        }
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>  <div className="logo" style={{margin:"10px"}}><span>Travel</span><span style={{color:"red"}}>X</span></div></div>
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
