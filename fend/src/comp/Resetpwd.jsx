import axios from 'axios'
import { set } from 'mongoose'
import React, { useState } from 'react'

const Resetpwd = () => {
  let [email, setEmail] = React.useState("")
  let [msg, setMsg] = React.useState("")
  let [f, setF] = React.useState(false)
  let [otp, setOtp] = React.useState("")
  let [npwd, setNpwd] = React.useState("")
  let [c,setC]=useState(300)
  let [iid,setIid]=useState("")
 let sendotp=()=>{
  axios.get(`https://ecommerce-application-zek1.onrender.com/sendotp/${email}`).then(res=>{
    setMsg(res.data.msg)
    if(res.data.msg=="otp sent")
    {
      setF(true)
    setIid(setInterval(()=>{
        setC((prev)=>prev-1)
      },1000))
    }
      setTimeout(()=>{
        setF(false)
        clearInterval(iid)
        setC(300)
      },300000)
    }
  ).catch(err=>{
    console.log(err)
  })
  }



  return (
    <div>
      <h2 style={{"color":"red"}}>{msg}</h2>
      <input type="text" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} readOnly={f}/>
     { !f&&<button onClick={sendotp}>Send OTP</button> }
      {f&&<h2>{parseInt(c/60)}:{c%60}</h2>}
      {f&&<input type="text" placeholder='Enter OTP' value={otp} onChange={(e)=>setOtp(e.target.value)}/>}
      {f&&<input type="password" placeholder='Enter new password' value={npwd} onChange={(e)=>setNpwd(e.target.value)}/>}
      {f&&<button onClick={()=>{
        axios.post("https://ecommerce-application-zek1.onrender.com/resetpwd",{"_id":email,"otp":otp,"pwd":npwd}).then(res=>{
          setMsg(res.data.msg)
        })
      }}>Reset Password</button>}
    </div>
  )
}

export default Resetpwd