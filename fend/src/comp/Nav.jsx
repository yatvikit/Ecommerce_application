import { useContext } from "react"
import { Link } from "react-router-dom"
import Ct from "./Ct"

const Nav = () => {
    let obj=useContext(Ct)
  return (
    <div className="nav">
        <Link to="/">Home</Link>
        {obj.state.token=="" ?<>
        <Link to="/reg">Reg</Link>
        <Link to="/login">Login</Link>
        </>:<>
       {obj.state.role==="admin" && <Link to="/addprod">Addprod</Link>}
        <Link to="/cart">Cart <sup>{obj.state.cartlength}</sup></Link>
        <Link to="/logout">Logout</Link>
        <p>{obj.state.name} </p>
        </>}
    </div>
  )
}

export default Nav