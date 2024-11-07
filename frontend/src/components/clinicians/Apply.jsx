import { useEffect, useState } from 'react'
import api from '../../AxiosInstance'
import { Spinner } from '../layouts/Spinner'

import { useMessage } from "../contexts/MessageContext";


const Apply = ({ baseURL, loading, setLoading }) => {
    const { showMessage } = useMessage();
    const [categories, setCategories] = useState([])
    const [apps, setApps] = useState([])
    const [selectedCat, setSelectedCat] = useState('')
    const [body, setBody] = useState('')
    const [licenceExpDate, setLicenceExpDate] = useState('')
    const [licenceNumber, setLicenceNumber] = useState('')
    const [licenceImage, setLicenceImage] = useState('')

    const token = localStorage.getItem('access_token')
    const userId = parseInt(localStorage.getItem('user_id'))

    const getApplications = () => {
        api.get(`${baseURL}/clinicians/get_pending_application/${userId}/`)
        .then(res=>{setApps(res.data)})
    }

    useEffect(()=>{
        getApplications()
    },[])

    useEffect(()=>{
        api.get(`${baseURL}/clinicians/category/`)
        .then(response => {
            setCategories(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the category options!', error);
          });
    }, [])

    const handleSelect = (e) => {
        setSelectedCat(e.target.value)
    }

    const handleImage = (e) => {
        setLicenceImage(e.target.files[0]);
    }

    const appData = {
        applicant:parseInt(localStorage.getItem('user_id')),
        category:selectedCat, body:body, licence_expiry_date:licenceExpDate,
        licence_image:licenceImage, licence_number:licenceNumber
    }

    const handleApplication = (e) => {
        e.preventDefault()
        setLoading(true)

        api.post(`${baseURL}/clinicians/apply/`, appData, {
            headers: {
                "Authorization": `FRISKY ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(() => {
            showMessage('Application successful','success');
            setLoading(false)
          })
        .catch(error => {
            showMessage('Application Failed','error')
            setLoading(false)
          });
        setBody('')
        // setCategories('')
        setLicenceExpDate('')
        setLicenceImage('')
        setLicenceNumber('')
    }

  return (
    <>
        <div className="container-fluid about p-5">
            <div className="container py-12">
                <div className="row g-1 align-items">
                    <div style={{color:"darkblue"}} className="col-lg-4">
                        <h5 className="section-about-title pe-3">WORK WITH US</h5>
                        <br /><br />
                        <span style={{fontSize:"x-large"}}>
                        Here's an opportunity to work with us. Are you a seasoned Clinician, kindly resgister
                        with us to consult patients online.
                        </span>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-7">
                        {apps.length < 1 ? 
                        <>
                            <h4 style={{color:"green"}}>{showMessage}</h4>
                            <h5 className="section-about-title pe-3">APPLICATION PAGE</h5>
                            {/* <h1 className="mb-4">{firstname} {lastname} <span className="text-primary">Travela</span></h1> */}
                            <div className="row gy-2 gx-4 mb-4">
                                <div className="col-sm-4">
                                    <p className="mb-0">Select your Profession</p>
                                    <select value={selectedCat} onChange={handleSelect} className='form-control' required>
                                        <option value="">Select an option</option>
                                        {categories.map(category=>(
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <p className="mb-0">Licence Expiry Date</p>
                                    <input type="date" className='form-control' required
                                        value={licenceExpDate}
                                        onChange={e=>setLicenceExpDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <p className="mb-0">Licence Number</p>
                                    <input type="text" className='form-control' required 
                                        value={licenceNumber}
                                        onChange={e=>setLicenceNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row gy-1 gx-4 mb-4">
                                <div className="col-sm-12">
                                    <p className="mb-0">Upload Your Licence</p>
                                    <input type="file" accept="image/*" className='form-control' required 
                                        onChange={handleImage}
                                    />
                                </div>
                            </div>
                            <div className="row gy-1 gx-4 mb-4">
                                <div className="col-sm-12">
                                    <p className="mb-0">Why do you want to work with? </p>
                                    <textarea name='' id='' className='form-control' placeholder='Enter your application here'
                                        value={body}
                                        onChange={e=>setBody(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button onClick={handleApplication} className="btn btn-primary rounded-pill py-3 px-5 mt-2" >
                                Apply Now
                            </button>
                            {loading && <Spinner/>}
                        </> : <h3>You have a Pending Application</h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Apply