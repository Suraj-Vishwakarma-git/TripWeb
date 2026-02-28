import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Search = ({searchI}) => {
    const [result,setresult]=useState([]);

    useEffect(()=>{
        async function Fetch(){
            const api=await fetch(`http://localhost:5000/api/auth/search?search=${searchI}`);
            const data=await api.json();
            setresult(data);
       }
    if(searchI){
        Fetch();
    }
    },[searchI]);

     return (
       <div id='products'>
     {result.map((e,index)=>(
      <div className='product-card' key={e._id}>
        <img src={e.image} alt={e.title} id='img'/>
        <h3 className='product-title'>{e.title}</h3>
        <p className='product-price'>${e.ticketPrice}</p>
      <Link to={`/booking/${e._id}`}  > <button className='order-btn' >Order Now</button></Link> 
        </div>
     ))}
    </div>
    
  )
}

export default Search;
