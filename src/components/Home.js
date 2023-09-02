import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiFillSetting, AiOutlineCloseCircle } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    if (!localStorage.getItem('quant_token')) {
      navigate('/login')
    }
  })
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getData`, {
          headers: {
            'Content-Type': "application/json"
          }
        })
        const data = await res?.data;
        if (data?.msg === "success") {
          console.log("response", data?.data);
          setData(data?.data)
        }
      } catch (error) {
        console.log(error.response.data);
        // setError(error?.response?.data?.error)

      }
    }
    getData()
  }, [])
  const handleLogout = () => {
    localStorage.removeItem('quant_token')
    navigate("/login")
  }
  return (
    <div>
      <div className='d-flex justify-content-end py-2' style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Button className='bg-success' onClick={handleLogout}>Logout</Button>
      </div>
      <div className='mt-4 pt-4 mx-4 px-4'>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date created</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>

            {data?.map((person,index) => {
              return <tr>
                <td>{index+1}</td>
                <td className='fw-semibold'>{person?.name}</td>
                <td>{person?.dateCreated}</td>
                <td>{person?.role}</td>
                <td><BsDot className={`fs-2`} style={person?.status==="active"?{color:"rgb(29, 233, 29)"}:{color:"red"}} /></td>
                <td><span className='text-primary me-1' style={{cursor:'pointer'}}><AiFillSetting /></span> <span className='text-danger' style={{cursor:'pointer'}}><AiOutlineCloseCircle/></span></td>
              </tr>
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Home