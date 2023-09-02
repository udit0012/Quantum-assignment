import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiErrorCircle, BiLock } from 'react-icons/bi';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate()
    const [success,setSuccess] = useState()
    const pass = useRef()
    const [eye, setEye] = useState(false)
    const [error, setError] = useState()
    const [showPass, setShowPass] = useState(false)
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    useEffect(() => {
        if (credentials.password.length) {
            setEye(true)
        }
        else setEye(false)
    }, [credentials])
    const showPassword = () => {
        let password = pass.current
        if (password.type == "password") {
            password.type = "text"
        } else {
            password.type = "password"
        }
        setShowPass(!showPass)
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        if(!credentials.email.length || !credentials.password.length){
            setError("Email and Password is required")
            return
        }
        setError()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, credentials, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            const data = await res?.data;
            if(data.msg==="success"){
                localStorage.setItem('quant_token',data?.data?.authtoken)
                navigate("/")
                setSuccess("Login Succesfull")
            }
        } catch (error) {
            console.log(error.response);
            setError(error?.response?.data?.error)
        }
    }
    return (
        <div className='login d-flex justify-content-center align-items-center'>
            <div className='loginBox position-relative d-flex flex-column align-items-center'>
                <div className='position-absolute px-5 py-2 rounded fw-bold'
                    style={{ fontSize: "2rem", backgroundColor: "rgb(18, 165, 109)", top: "-2rem" }}>Sign In</div>
                <Form onSubmit={handleLogin} className='dark mt-4 pt-1 d-flex flex-column '>
                    <div style={error ? { display: "flex" } : {display:"none"}} className='text-danger mb-3 fw-bold align-items-center'><span className='me-2'><BiErrorCircle /></span>{error}</div>
                    <div style={success ? { display: "flex" } : {display:"none"}} className='text-success mb-3 fw-bold align-items-center'><span className='me-2'><BsFillHandThumbsUpFill /></span>{success}</div>
                    <div as={Row} className="mb-4 d-flex bg-dark rounded py-3 px-4">
                        <Form.Label className='pe-3 mb-0 d-flex justify-conten-center align-items-center border-end border-secondary'>
                            <FaUser className='text-secondary' />
                        </Form.Label>
                        <input type="email" className='ms-2 formControl' name='email' value={credentials.email} onChange={handleChange} style={{}} placeholder="Email address" />
                    </div>

                    <div as={Row} className="mb-4 d-flex bg-dark rounded py-3 px-4">
                        <Form.Label className='pe-3 mb-0 d-flex justify-conten-center align-items-center border-end border-secondary'>
                            {eye ? showPass ? <AiOutlineEyeInvisible className='text-secondary' style={{ cursor: "pointer" }} onClick={showPassword} /> : <AiOutlineEye className='text-secondary' style={{ cursor: "pointer" }} onClick={showPassword} /> : <BiLock className='text-secondary' />}
                        </Form.Label>
                        <input type="password" ref={pass} className='ms-2 formControl' name='password' value={credentials.password} onChange={handleChange} placeholder="Password" />

                    </div>

                    <div as={Row} className="mb-3">
                        <Button type="submit" className='border-0 w-100 fw-semibold' style={{ backgroundColor: "rgb(18, 165, 109)" }}>LOGIN</Button>
                    </div>
                </Form>
                <div>Don't have account? <Link className='ps-2' style={{ color: "rgb(18,165,109)" }} to={"/register"}>Sign up</Link></div>
            </div>
        </div>
    )
}

export default Login