import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    obj.updstate({"token":"","uid":"","role":"","name":""})
    navigate("/")
  },[])

  return (
    <div>Logout</div>
  )
}

export default Logout