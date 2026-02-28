import React, { useEffect, useState } from 'react'
import "./home.css";
import { Link } from 'react-router-dom';
import Booking from './Booking.jsx';
const Home = () => {
  const [products,setproducts]=useState([]);
  useEffect(()=>{
    async function fetchdata(){
      const res=await fetch("http://localhost:5000/api/auth/tripd");
      const data=await res.json();
      setproducts(data);
    }
    fetchdata();
  },[]);

  return (
    <div id='products'>
     {products.map((e,index)=>(
      <div className='product-card' key={e._id}>
        <img src={e.image} alt={e.title} id='img'/>
        <h3 className='product-title'>{e.title}</h3>
        <p className='product-price'>${e.ticketPrice}</p>
      <Link to={`/booking/${e._id}`}><button className='order-btn'  >Book Now</button></Link> 
        </div>
     ))}
    </div>
  )
}

export default Home

