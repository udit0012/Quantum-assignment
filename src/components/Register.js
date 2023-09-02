import axios from 'axios';
import React, { useState } from 'react'
import { Form, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BiLock, BiErrorCircle } from 'react-icons/bi';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [success,setSuccess] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleLogin = async (userdata) => {
        try {
            setError(null)
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, userdata, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            const data = await res?.data;
            if(data?.msg==="success"){
                navigate("/login")
                setSuccess("Registered Succesfull")
            }
            console.log("response", res);
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.error)
            
        }
    }
    return (
        <div className='login d-flex justify-content-center align-items-center'>
            <div className='loginBox position-relative d-flex flex-column align-items-center'>
                <div className='position-absolute px-5 py-2 rounded fw-bold'
                    style={{ fontSize: "2rem", backgroundColor: "rgb(18, 165, 109)", top: "-2rem" }}>Sign up</div>
                <Form onSubmit={handleSubmit(handleLogin)} className='dark mt-4 pt-1 d-flex flex-column '>
                    <div style={error ? { display: "flex" } : {display:"none"}} className='text-danger error mb-3 fw-bold align-items-center'><span className='me-2'><BiErrorCircle /></span>{error}</div>
                    <div style={success ? { display: "flex" } : {display:"none"}} className='text-success error mb-3 fw-bold align-items-center'><span className='me-2'><BiErrorCircle /></span>{success}</div>

                    <div as={Row} className="mb-1 d-flex bg-dark rounded py-3 px-4">
                        <Form.Label className='pe-3 mb-0 d-flex justify-conten-center align-items-center border-end border-secondary'>
                            <FaUser className='text-secondary' />
                        </Form.Label>
                        <input {...register("username", {
                            required: true,
                            pattern: /^[A-Za-z\s]+$/,
                            minLength: 3
                        })} type="text" className='ms-2 formControl' placeholder="Username" />
                    </div>
                    <div style={!errors?.username ? { visibility: "hidden" } : {}} className='text-danger error mb-3 fw-bold d-flex align-items-center'><span className='me-2'><BiErrorCircle /></span>Please enter a valid Username</div>
                    <div as={Row} className="mb-1 d-flex bg-dark rounded py-3 px-4">
                        <Form.Label className='pe-3 mb-0 d-flex justify-conten-center align-items-center border-end border-secondary'>
                            <FaUser className='text-secondary' />
                        </Form.Label>
                        <input {...register("email", {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: 'Invalid email address',
                            }
                        })} type="email" className='ms-2 formControl' placeholder="Email address" />
                    </div>
                    <div style={!errors?.email ? { visibility: "hidden" } : {}} className='text-danger error mb-3 fw-bold d-flex align-items-center'><span className='me-2'><BiErrorCircle /></span>Please enter a valid Email</div>
                    <div as={Row} className="mb-1 d-flex bg-dark rounded py-3 px-4">
                        <Form.Label className='pe-3 mb-0 d-flex justify-conten-center align-items-center border-end border-secondary'>
                            <FaUser className='text-secondary' />
                        </Form.Label>
                        <div className='d-flex w-100 justify-content-between position-relative'>
                            <input {...register("dob", {
                                required: 'Date is required',
                                validate: {
                                    isValidDate: (value) => {
                                        const selectedDate = new Date(value);
                                        const maxDate = new Date();
                                        maxDate.setFullYear(maxDate.getFullYear() - 10)
                                        return (
                                            !isNaN(selectedDate.getTime()) && selectedDate <= maxDate
                                        ) || `Date of birth must be before 10 years`
                                    }
                                }
                            })} type="date" className='ms-2 formControl w-100' style={{ zIndex: "4" }} placeholder="Date of birth" />
                            <span className='position-absolute end-0' style={{ zIndex: "3", marginRight: "2px" }}><BsFillCalendarDateFill className='text-secondary' /></span>
                        </div>
                    </div>
                    <div style={!errors?.dob ? { visibility: "hidden" } : {}} className='text-danger error mb-3 fw-bold d-flex align-items-center'><span className='me-2'><BiErrorCircle /></span>{errors?.dob?.message}</div>

                    <div as={Row} className="mb-1 d-flex bg-dark rounded py-3 px-4" controlId="formHorizontalPassword">
                        <Form.Label className='pe-3 mb-0 d-flex justify-conten-center align-items-center border-end border-secondary'>
                            <BiLock className='text-secondary' />
                        </Form.Label>
                        <input {...register("password", {
                            required: { value: true, message: "Password is required" },
                            minLength: { value: 6, message: "Password must be atleast 6 characters" },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character." },

                        })} type="password" className='ms-2 formControl' placeholder="Password" />

                    </div>
                    <div style={!errors?.password ? { visibility: "hidden" } : {}} className='text-danger error mb-3 fw-bold d-flex align-items-center'><span className='me-2'><BiErrorCircle /></span>{errors?.password?.message}</div>

                    <div as={Row} className="mb-3">
                        <Button type="submit" className='border-0 w-100 fw-semibold py-2' style={{ backgroundColor: "rgb(18, 165, 109)" }}>REGISTER</Button>
                    </div>
                </Form>
                <div>Already have account? <Link className='ps-2' style={{ color: "rgb(18,165,109)" }} to={"/login"}>Sign in</Link></div>
            </div>
        </div>
    )
}

export default Register