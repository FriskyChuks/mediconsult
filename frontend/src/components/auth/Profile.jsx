import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = ({baseURL, getUserInfo}) => {
    const navigate = useNavigate()

    if(localStorage.getItem('access_token') === null){                            
        navigate('/login')
    } 

    const [firstname, setFirstname] = useState(localStorage.getItem('firstname'))
    const [lastname, setLastname] = useState(localStorage.getItem('lastname'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [phone, setPhone] = useState(localStorage.getItem('phone'))
    // const [is_clinician, setIs_clinician] = useState(localStorage.getItem('is_clinician'))
    const token = localStorage.getItem('access_token')
    const [msg, setMsg] = useState("")
    
    const userDate = {
        firstname:firstname, lastname:lastname, email:email, phone:phone
    }

    const UpdateBio = async (e) => {
        e.preventDefault
        await axios.patch(`${baseURL}/auth/users/me/`,userDate, {
            headers: {Authorization: `FRISKY ${token}`}
        }).then((()=>{
            setMsg("Updated Successfully")
        })).finally(()=>{
            localStorage.setItem('firstname',firstname)
            localStorage.setItem('lastname',lastname)
            localStorage.setItem('email',email)
            localStorage.setItem('phone',phone)
        })
    }


  return (
    <>
        <div className="container-fluid about py-5">
            <div className="container py-5">
                <div className="row g-3 align-items">
                    <div className="col-lg-2">
                        <div className="h-50">
                            <img src="/static/assets/img/guide-4.jpg" className="img-fluid w-100 h-100" alt=""/>
                        </div>
                        <div className="col-sm-6">
                            <p className="mb-0">
                                {firstname}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <h4 style={{color:"green"}}>{msg}</h4>
                        <h5 className="section-about-title pe-3">Bio</h5>
                        {/* <h1 className="mb-4">{firstname} {lastname} <span className="text-primary">Travela</span></h1> */}
                        <div className="row gy-1 gx-4 mb-4">
                            <div className="col-sm-12">
                                <p className="mb-0">Email</p>
                                <input type='text' className='form-control'
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">Firstname</p>
                                <input type='text' className='form-control'
                                value={firstname} 
                                onChange={e=>setFirstname(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">Lastname</p>
                                <input type='email' className='form-control'
                                    value={lastname} 
                                    onChange={e=>setLastname(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-6">
                                <p className="mb-0">Phone</p>
                                <input type='number' className='form-control'
                                    value={phone} 
                                    onChange={e=>setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <button onClick={UpdateBio} className="btn btn-primary rounded-pill py-3 px-5 mt-2" >Update Profile</button>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-4">
                        <h5 className="section-about-title pe-3">Address Info</h5>
                        {/* <h1 className="mb-4">{firstname} {lastname} <span className="text-primary">Travela</span></h1> */}
                        <div className="row gy-1 gx-4 mb-4">
                            <div className="col-sm-12">
                                <p className="mb-0">LGA</p>
                                <input type='text' className='form-control'/>
                            </div>
                            <div className="col-sm-12">
                                <p className="mb-0">State</p>
                                <input type='text' className='form-control'/>
                            </div>
                            <div className="col-sm-12">
                                <p className="mb-0">Country</p>
                                <input type='text' className='form-control'/>
                            </div>
                            <div className="col-sm-12">
                                <p className="mb-0">Address</p>
                                <textarea placeholder='Enter Address' className='form-control'/>
                            </div>
                        </div>
                        <a className="btn btn-primary rounded-pill py-3 px-5 mt-2" href="">Update Address Info</a>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile