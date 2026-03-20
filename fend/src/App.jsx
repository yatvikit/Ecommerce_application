import Ct from "./comp/Ct"
import Nav from "./comp/Nav"
import Home from "./comp/Home"
import Reg from "./comp/Reg"
import Login from "./comp/Login"
import Logout from "./comp/Logout"
import Addprod from "./comp/Addprod"
import Edit from "./comp/Edit"
import Cart from "./comp/Cart"
import Resetpwd from "./comp/Resetpwd"
import Km from "./comp/Km"
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


const App = () => {
  let [state,setState]=useState({"token":"","uid":"","role":"","name":""})
  let updstate=(data)=>{
    setState({...state, ...data})
  }
  let obj={"state":state,"updstate":updstate}
  return (
        <BrowserRouter>
        <Ct.Provider value={obj}>
          <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/reg" element={<Reg/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/addprod" element={<Addprod/>}/>
          <Route path="/edit/:pid" element={<Edit/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/resetpwd" element={<Resetpwd/>}/>
          <Route path="/km/:pid" element={<Km/>}/>
          
        </Routes>
        </Ct.Provider>
        
        </BrowserRouter>

  )
}

export default App