import api from '../../AxiosInstance'
import React, { useState } from 'react'

import { useMessage } from "../contexts/MessageContext";
import { Spinner } from '../layouts/Spinner';

const ResendActivation = ({ baseURL, loading, setLoading }) => {
    const [email, setEmail] = useState('')
    const { showMessage } = useMessage();

    const resendActivation = async(e)=>{
        e.preventDefault()
        setLoading(true)
        await api.post(`${baseURL}/auth/users/resend_activation/`, {email})
        showMessage('Check your email for confirmation link', 'success')
        setLoading(false)
    }


  return (
    <>
        <div className="container-fluid about py-5">
            <div className="container py-5">
                <div className="row g-3 align-items">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <h5 className="section-about-title pe-3">Resend Activation Link</h5>
                        <h4 style={{color:"red"}}>{showMessage}</h4>
                        <div className="row gy-1 gx-4 mb-4">
                            <div className="col-sm-12">
                                <p className="mb-0">Email</p>
                                <input type='text' className='form-control'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary rounded-pill py-3 px-5 mt-2" onClick={resendActivation} >
                            Send Activation Link
                        </button>
                        {loading && <Spinner/>}
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ResendActivation