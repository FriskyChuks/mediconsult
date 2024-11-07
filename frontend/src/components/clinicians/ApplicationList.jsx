import {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";

import api from '../../AxiosInstance';

const ApplicationList = ({ baseURL }) => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')

    if(token === null){                            
        navigate('/login')
    }

    const fetchApplications = async () => {
      try {
          const { data } = await api.get(`${baseURL}/clinicians/apply/`, {
              headers: { "Authorization": `FRISKY ${token}` },
          });
          const filteredDate = data.filter(obj => obj.status === 'pending');
          setData(filteredDate);
      } catch (err) {
          console.log("Error fetching applications", err);
      }
  };
    

    useEffect(()=>{
      fetchApplications()
    },[])

    

  return (
    <>
      { data.length > 0 ? 
        <>
          <div className='container-fluid p-5'>
          <h2>Pending Applications  
            <span style={{fontSize:"small"}}>
              ({data.length} {data.length > 1 ? "applications" : "applications"})
            </span>
          </h2>
            <div className='table-responsive'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Category</th>
                    <th>Application Body</th>
                    <th>Date Applied</th>
                    <th>Licence Exp. Date</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map(application=>(
                    <>
                      <tr key={application.id}>
                        <td>
                          <div className='d-flex align-orders-center'>
                              <Link to={ `/application_detail/${application.id}`}>
                                <div className='ms-3'>
                                  <p className='fw-bold mb-1'>{application.applicant_info.name}</p>
                                  <p className='fw-bold mb-1'>{application.applicant_info.email}</p>
                                </div>
                              </Link>
                          </div>
                        </td>
                        <td>{application.category_info}</td>
                        <td>
                          {application.body.length > 20 ? application.body.slice(0, 20) + '...'
                            : application.body} <br />
                            <Link to={ `/application_detail/${application.id}`}>
                              <i style={{fontSize:"medium"}}>...view detail</i>
                            </Link>
                          </td>
                        <td>{application.date_created.split('T')[0]}</td>
                        <td>{application.licence_expiry_date}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        
        </> : 
        <>
          <h3 className="text-center"> There is no Pending Application to display</h3> <br />
        </>
      }
    </>
  )
}

export default ApplicationList