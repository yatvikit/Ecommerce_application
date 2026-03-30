import axios from 'axios'
import {useState, useContext} from 'react'
import Ct from './Ct'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  let [msg, setMsg] = useState("")
  let [data, setData] = useState({"_id":"","pwd":""})
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }
  let login=()=>{
    axios.post("https://ecommerce-application-zek1.onrender.com/login",data).then((res)=>{
      if(res.data.token!=undefined)
      {
        obj.updstate(res.data)
        navigate("/")
      }
      else{
        setMsg(res.data.msg)
      }
  })
    }

  return (
    <div className='formcon'>
      <div className='form'>
        <h2 style={{"color":"red"}}>{msg}</h2>
        <input type="text" placeholder='Email' value={data._id} onChange={fun} name='_id'/>
        <input type="password" placeholder='Password' value={data.pwd} onChange={fun} name='pwd'/>
        <button onClick={login}>Login</button>
        <Link to="/resetpwd">Forgot password?</Link>
      </div>
    </div>
  )
}

export default Login