import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'   


const Home = () => {
    let [data,setData]=useState([])
    let obj=useContext(Ct)
    useEffect(()=>{
        axios.get("http://localhost:5000/prods").then(res=>{
            setData(res.data)
        })
    },[])
  return (
    <div className="prod">
        {
            data.map((item)=><div className="card">
                
                <img src={`http://localhost:5000/prodimgs/${item.img}`} alt={item.name}/>
               <div className='cardcont'>
                 <h3>{item.title}</h3>
                <p>Price: {item.price}</p>
                <p>Discount: {item.disc}%</p>
                <button>View details</button>
                <button>Add to cart</button>
               {obj.state.role=="admin"&&<>
               <button>Edit</button>
                <button>Delete</button></>}
                </div>
              

            </div>)
        }

    </div>
  )
}

export default Home