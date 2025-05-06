import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({email: "", password: ""})
    const [otp, setOtp] = useState("")
    const [otpSent, setotpSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(60)
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("")
    useEffect(()=>{
        if(timer && otpSent > 0){
            const interval = setInterval(()=>{
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer, otpSent])
    const handleLogin = async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8080/api/employees/login",form);
            setotpSent(true)
            setSuccess(response.data)
            setError("")
            setTimer(60)
        } catch (error) {
            console.log("error",error)
            setError(error.response?.data)
        } finally {
            setLoading(false)
        }
    }
    const handleValidationLogin = async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`http://localhost:8080/api/employees/validateEmployeeLogin?email=${form.email}&otpCode=${otp}`)
            localStorage.setItem("token", response.data);
            console.log(localStorage.getItem("token", response.data))
            setSuccess(response.data)
            const token = localStorage.getItem("token");
            const decode = jwtDecode(token);
            const userRole = decode.role;
            if (userRole == "ADMIN") {
              navigate("/admin")
            } else if(userRole == "USER"){
              navigate("/user")
            } else{
              setError("Unknown User")
            }
            setError("")
        } catch (error) {
            console.log(error,"error")
            setError(error.response?.data)
        } finally {
            setLoading(false)
        }
    }
    const handleResendOtp = ()=>{
        handleLogin()
    }
  return (
    <div>
      {!otpSent ? (
        <>
          <div>
            <label htmlFor="">Email</label>
            <div>
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <div>
              <input
                type="text"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>
          </div>
          <div>
            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Sending OTP...." : "Login"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="">OTP</label>
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button onClick={handleValidationLogin} disabled={loading}>
              {loading ? "Verfying OTP" : "verfy"}
            </button>
            {timer > 0 ? (
                <p>resend otp in {timer} second</p>
            ) : (
                <button onClick={handleResendOtp}>Resend</button>
            )}
          </div>
          {success && <p style={{color: "green"}}>{success}</p>}
          {error && <p style={{color: "red"}}>{error}</p>}

        </>
      )}
    </div>
  );
}

export default Login