import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const ResetPassword = ({ baseURL }) => {
    const [msg, setMsg] = useState("")
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')

    const passwords = {
        current_password:currentPassword, new_password:newPassword, re_new_password:reNewPassword
    }

    const handleResetPassword = async(e)=>{
        const accessToken = localStorage.getItem('access_token')
        e.preventDefault()
        await axios.post(`${baseURL}/auth/users/set_password/`, passwords,{
                        headers:{Authorization: `FRISKY ${accessToken}`}
                    }).then((()=>{
                        setMsg("Password changed successfully!")
                    }))
        
    }

  return (
    <>
        <div className="container-fluid about py-5">
            <div className="container py-5">
                <div className="row g-3 align-items">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <h4 style={{color:"green"}}>{msg}</h4>
                        <h5 className="section-about-title pe-3">Reset Password</h5>
                        <div className="row gy-1 gx-4 mb-4">
                            <div className="col-sm-12">
                                <p className="mb-0">Current Password</p>
                                <input type='password' className='form-control'
                                    placeholder='Enter your current password'
                                    value={currentPassword}
                                    onChange={e=>setCurrentPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row gy-1 gx-4 mb-4">
                            <div className="col-sm-12">
                                <p className="mb-0">New Password</p>
                                <input type='password' className='form-control'
                                    placeholder='Enter new password'
                                    value={newPassword}
                                    onChange={e=>setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row gy-1 gx-4 mb-4">
                            <div className="col-sm-12">
                                <p className="mb-0">Comfirm New Password</p>
                                <input type='password' className='form-control'
                                    placeholder='Confirm your new password'
                                    value={reNewPassword}
                                    onChange={e=>setReNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary rounded-pill py-3 px-5 mt-2" onClick={handleResetPassword} >
                            Change Password
                        </button>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ResetPassword