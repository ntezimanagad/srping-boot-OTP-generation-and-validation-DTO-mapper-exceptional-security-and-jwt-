import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({name: "", email:"", password:"", cpassword:""})
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [timer, setTimer] = useState(60)
    useEffect(()=>{
        if(timer && otpSent  > 0){
            const interval = setInterval(()=>{
                setTimer(prev => prev - 1)
            }, 1000)
            return ()=> clearInterval(interval)
        }
    }, [timer, otpSent])
    const handleRegister = async (e) =>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8080/api/employees/create", form);
            setOtpSent(true)
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
    const handleValidateRegister = async (e) =>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`http://localhost:8080/api/employees/validateEmployeeRegister?email=${form.email}&otpCode=${otp}`);
            setSuccess(response.data)
            setError("")
            navigate("/login")
        } catch (error) {
            console.log("error",error)
            setError(error.response?.data)
        } finally {
            setLoading(false)
        }
    }
    const handleResentOtp = ()=>{
        handleRegister()
    }
  return (
    <div>
      {!otpSent ? (
        <>
          <div>
            <label htmlFor="">Name</label>
            <div>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Email</label>
            <div>
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Password</label>
            <div>
              <input
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Confirm Password</label>
            <div>
              <input
                type="text"
                value={form.cpassword}
                onChange={(e) =>
                  setForm({ ...form, cpassword: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <button onClick={handleRegister} disabled={loading}>
              {loading ? "Sending OTP....." : "Register"}
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
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <button onClick={handleValidateRegister} disabled={loading}>
              {loading ? "Verfying OTP....." : "Verfy"}
            </button>
            {
                timer > 0 ? (
                    <p>resent OTP in {timer} second</p>
                ) : (
                    <button onClick={handleResentOtp}>Resend</button>
                )
            }
          </div>
        </>
      )}
    </div>
  );
}

export default Register