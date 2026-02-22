import React, { useEffect, useState } from 'react'
import "./home.css";

const Home = () => {
  const [products,setproducts]=useState([]);
  useEffect(()=>{
    async function fetchdata(){
      const res=await fetch("http://localhost:5000/api/auth/tripD");
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
        <button className='order-btn'>Order Now</button>
        </div>
     ))}
    </div>
  )
}

export default Home

