import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'   
import { useNavigate } from 'react-router-dom'  


const Cart = () => {
  let [arr,setArr]=useState([])
  let [f,setF]=useState(false)
  let obj=useContext(Ct)
  let [ctotal,setCtotal]=useState(0)
let navigate=useNavigate()
  useEffect(()=>{
    if(obj.state.token=="")
    {
        navigate("/login")
    }
    else{
      axios.get(`https://ecommerce-application-zek1.onrender.com/getcart/${obj.state.uid}`).then(res=>{
        setArr(res.data)
        obj.updstate({"cartlength":res.data.length})
        let total=0
        res.data.forEach(item=>{
          total+=(item.price*item.qty)-((item.price*item.qty*item.disc)/100)
        })
        setCtotal(total)
    }).catch(err=>{
        console.log(err)
    })

    }
    
  },[f])
  let delcart=(id)=>{
    axios.delete(`https://ecommerce-application-zek1.onrender.com/delcart/${id}`).then(res=>{
        setF(!f)

    }).catch(err=>{
        console.log(err)
    })
  } 
  let incqty=(id)=>{
    axios.get(`https://ecommerce-application-zek1.onrender.com/incqty/${id}`).then(res=>{
        setF(!f)  
    }).catch(err=>{
        console.log(err)
    })
  }
  let decqty=(id,qty)=>{
    if(qty>1)
    { 
      axios.get(`https://ecommerce-application-zek1.onrender.com/decqty/${id}`).then(res=>{
        setF(!f)
      }).catch(err=>{
        console.log(err)
      })
    }
    else{
      delcart(id)
    }
  }


  return (
    <div>
      {arr.length==0&&<h2>Cart is empty</h2>}
      {arr.map(item=><div className='cartcard'>
        <img src={`https://ecommerce-application-zek1.onrender.com/prodimgs/${item.img}`} alt={item.name}/>
        <div className='cartcont'>
          <h3>{item.title}</h3>
          <p>Price: {item.price}</p>
          <p>Discount: {item.disc}%</p>
          <p>Qty: <button onClick={()=>decqty(item._id,item.qty)}>-</button>{item.qty} <button onClick={()=>incqty(item._id)}>+</button></p>
          <p>Total: {item.price*item.qty}</p>
          <p>Disc Amt: {(item.price*item.qty*item.disc)/100}</p>
          <p>Final Amt after discount: {(item.price*item.qty)-((item.price*item.qty*item.disc)/100)}</p>
         
          
          <button onClick={()=>delcart(item._id)}>Remove from cart</button> 
        </div>
      </div>)}
      {arr.length>0&&<h2 className='ctotal'>Cart Total: {ctotal}</h2>}
    </div>

  )
}

export default Cart