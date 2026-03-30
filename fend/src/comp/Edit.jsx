import axios from "axios"
import { useContext, useEffect } from "react"
import { useState } from "react"
import Ct from "./Ct"
import { useNavigate, useParams } from "react-router-dom"

const Edit = () => {
  let [msg,setMsg]=useState("")
  let [data,setData]=useState({"_id":"","title":"","price":"","disc":"","img":"","cat":"","desc":""})
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let fun1=(e)=>{
    setData({...data,"img":e.target.files[0]})
  }
  let {pid}=useParams()
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    if(obj.state.role!="admin")
    {
      navigate("/")
    }
    else{
      axios.get(`https://ecommerce-application-zek1.onrender.com/getprod/${pid}`).then(res=>{
        setData(res.data)
      }).catch(err=>{
        console.log(err)
      } 
      )
    }
  },[])
  let editdet=()=>{
    let x={...data}
    delete x.img
    axios.post("https://ecommerce-application-zek1.onrender.com/upddet",x).then(res=>{
      setMsg(res.data.msg)
    }).catch(err=>{
      console.log(err)
    })
  } 
  let editimg=()=>{
    let fd=new FormData()
    fd.append("_id",data._id)
    fd.append("img",data.img)
    axios.post("https://ecommerce-application-zek1.onrender.com/updimg",fd).then(res=>{
      setMsg(res.data.msg)
    } ).catch(err=>{
      console.log(err)
    } )
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
        
        <button onClick={editdet}>Edit Product det</button>
      </div>
      <div>
        <input type="file" name="img" onChange={fun1}/>
        <button onClick={editimg}>Edit Product img</button>
      </div>

    </div>
  )
}

export default Edit