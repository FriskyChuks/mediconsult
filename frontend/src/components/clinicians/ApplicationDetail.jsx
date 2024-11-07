import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../AxiosInstance'

const ApplicationDetail = ({ baseURL }) => {
    const [loading, setLoading] = useState(true);
    const {id} = useParams()
    const [appData, setAppData] = useState([])
    const token = localStorage.getItem('access_token')

    const applicationDetail = async () => {
        try {
            const res = await api.get(`${baseURL}/clinicians/application_detail/${id}/`, {
                headers: { 'authorization': `FRISKY ${token}` }
            });
            setAppData(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        console.log(appData)
    };

    useEffect(() => {
        applicationDetail();
    }, [id,token]);

    const handleApprove = (id) => {
        api.patch(`${baseURL}/clinicians/approve_application/${id}/`, {}, {
            headers: {"Authorization": `FRISKY ${token}`}
        }).then(()=>{
            applicationDetail()
        })
        .catch(err => {
            console.log("Error approving application", err);
        });
    };
    
  
      const handleDecline = (id)=>{
        api.patch(`${baseURL}/clinicians/decline_application/${id}/`, {}, {
          headers: {"Authorization": `FRISKY ${token}`}
        }).then(()=>{
            applicationDetail()
        }).catch(err => {
          console.log("Error approving application", err);
         })
      }
    
    if (loading) {
        return <p>Loading...</p>;
    }

  return (
    <>
        <div className='container text-center'>
            <div>
                {appData.status==='approved' ? <span style={{color:"green"}}> <i>Approved</i></span> :
                    <button onClick={()=>handleApprove(appData.id)} className='btn'> ✔️ Approve </button> 
                }
                {appData.status==='declined' ? <span style={{color:"red"}}> <i>Declined</i></span> :
                <button onClick={()=>handleDecline(appData.id)} className='btn'> ❌ Decline </button>
                }
            </div>
            <div className="card mb-3" style={{maxWidth: "100%"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                    <img
                        src={appData.licence_image}
                        alt="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
                        className="img-fluid rounded-start"
                    />
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{appData.applicant_info.name}</h5>
                        <h5 className="card-title">{appData.applicant_info.email}</h5>
                        <hr />
                        Applied Role: <b>{appData.category_info}</b> <br />
                        Licence Exp. Date: <b>{appData.licence_expiry_date}</b> <br />
                        Date Applied: <b>{appData.date_created.split("T")[0]}</b> <br />
                        Status: <b>{appData.status}</b> <br />
                        <hr />
                        <p className="card-text">
                            {appData.body}
                         </p>
                        <p className="card-text">
                        <small className="text-muted">Last updated 3 mins ago</small>
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <br />
    </>
  )
}

export default ApplicationDetail