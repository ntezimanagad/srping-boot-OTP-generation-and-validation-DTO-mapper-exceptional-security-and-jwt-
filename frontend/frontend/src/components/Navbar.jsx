import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleLogout = async (e) =>{
        e.preventDefault();
        try {
            if(token){
                await axios.post("http://localhost:8080/api/employees/logout",{}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
        } catch (error) {
            console.log("error",error)
        } finally {
            localStorage.removeItem("token");
            navigate("/login")
        }
    }
  return (
    <div>
        <Link to="/">Home</Link>
        {!token && <Link to="/register">Register</Link>}
        {!token && <Link to="/login">Login</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
    </div>
  )
}

export default Navbar