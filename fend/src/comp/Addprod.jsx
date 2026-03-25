import { useContext, useEffect } from "react"
import { useState } from "react"
import Ct from "./Ct"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Addprod = () => {
  let [msg,setMsg]=useState("")
  let [data,setData]=useState({"title":"","price":"","disc":"","img":"","cat":"","desc":""})
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let fun1=(e)=>{
    setData({...data,"img":e.target.files[0]})
  }
  let navigate=useNavigate()
  let obj=useContext(Ct)
  useEffect(()=>{
    if(obj.state.role!="admin")
    {
      navigate("/")
    }
  },[])
  let add=()=>{
    let fd=new FormData()
    for(let key in data)
    {
      fd.append(key,data[key])
    }
    axios.post("http://localhost:5000/addprod",fd).then(res=>{
      if(res.data.msg=="prod is added")
      {
navigate("/")
      }
      else{
        setMsg(res.data.msg)
      } 
      
    }).catch(err=>{
      console.log(err)
    })
  }
    
  return (
    <div className="formcon">
      <div className="form">
        <h2 style={{"color":"red"}}>{msg}</h2>
        <input type="text" placeholder="Title" name="title" value={data.title} onChange={fun}/>
        <input type="text" placeholder="Price" name="price" value={data.price} onChange={fun}/>
        <input type="text" placeholder="Discount" name="disc" value={data.disc} onChange={fun}/>
        <select name="cat" value={data.cat} onChange={fun}>
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
          <option value="books">Books</option>
          <option value="others">Others</option>
        </select>
        <textarea placeholder="Description" name="desc" value={data.desc} onChange={fun}></textarea>
        <input type="file" name="img" onChange={fun1}/>
        <button onClick={add}>Add Product</button>
      </div>

    </div>
  )
}

export default Addprod