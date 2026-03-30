import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Reg = () => {
  let [msg, setMsg] = useState("")
  let navigate=useNavigate()
  const [data, setData] = useState({"name":"","_id":"","pwd":"","phno":""})
  let fun=(e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }
  let reg=()=>{
    axios.post("https://ecommerce-application-zek1.onrender.com/reg",data).then((res)=>{
      if(res.data.msg=="acc created")
      {
        navigate("/login")
      }
      else{
        setMsg(res.data.msg)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className='formcon'>
      <div className='form'>
        <h2 style={{"color":"red"}}>{msg}</h2>
        <input type="text" placeholder='Name' value={data.name} onChange={fun} name='name'/>
        <input type="email" placeholder='Email' value={data.email} onChange={fun} name='_id'/>
        <input type="password" placeholder='Password' value={data.pwd} onChange={fun} name='pwd'/>
        <input type="tel" placeholder='Phone Number' value={data.phno} onChange={fun} name='phno'/>
        <button onClick={reg}>Register</button>

      </div>
    </div>
  )
}

export default Reg