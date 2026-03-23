import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'   
import { useNavigate } from 'react-router-dom'



const Home = () => {
    let [data,setData]=useState([])
    let obj=useContext(Ct)
    let [f,setF]=useState(false)
    let [msg,setMsg]=useState("")
    let navigate=useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:5000/prods").then(res=>{
            setData(res.data)
        })
    },[])
    let addcart=(item)=>{
        if(obj.state.token!="")
        {
            axios.post("http://localhost:5000/addcart",{"pid":item._id,"uid":obj.state.uid,"title":item.title,"price":item.price,"disc":item.disc,"img":item.img}).then(res=>{
                setMsg(res.data.msg)
                setF(true)
                setTimeout(()=>{
                    setF(false)
                },2000) 
            }).catch(err=>{
                console.log(err)
            })
        }
        else{
            navigate("/login")
        }
    }   
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
                <button onClick={()=>addcart(item)}>Add to cart</button>
               {obj.state.role=="admin"&&<>
               <button>Edit</button>
                <button>Delete</button></>}
                </div>
              

            </div>)
        }
        {f &&<div className='alert'>
            <p>{msg}</p>
            <div className='progress'></div>
            </div>
        }

    </div>
  )
}

export default Home