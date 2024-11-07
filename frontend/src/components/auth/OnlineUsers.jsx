import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../AxiosInstance';

const OnlineUsers = ({ baseURL }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const response = await api.get(`${baseURL}/accounts/online_clinicians/`);
                const filteredUsers = response.data.filter(user => parseInt(user.user) !== parseInt(userId))
                setOnlineUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching online users:', error);
            }
        };

        fetchOnlineUsers();
        const interval = setInterval(fetchOnlineUsers, 60000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, []);
    

    return (
        <>
            <div className='text-center'>
                { onlineUsers.length > 0 ?
                <>
                    <h3>Clinicians currently Online </h3>
                    <i>Click a clinician to start consultation now</i>
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-md-3 mb-4">
                                    <div className="column-header bg-primary text-white text-center">Doctors</div>
                                        {onlineUsers.map(user=>(
                                            <> 
                                                {user.category_info==='Doctor' && user.applicant !== parseInt(userId) ? 
                                                <div className="column-item text-left">
                                                    🟢 <Link to={ `/message/${user.applicant}` }>
                                                            {user.applicant_info.name} 
                                                        </Link>
                                                </div> : ""
                                                }
                                            </>
                                        ))}
                                    </div>
                                    <div className="col-md-3 mb-4">
                                        <div className="column-header bg-primary text-white text-center">Pharmacists</div>
                                        {onlineUsers.map(user=>(
                                            <> 
                                                {user.category_info==='Pharmacist' && user.applicant !== parseInt(userId) ? 
                                                <div className="column-item text-left">
                                                    🟢 <Link to={ `/message/${user.applicant}` }>
                                                            {user.applicant_info.name} 
                                                        </Link>
                                                </div> : ""
                                                }
                                            </>
                                        ))}
                                    </div>
                                    <div className="col-md-3 mb-4">
                                        <div className="column-header bg-primary text-white text-center">Medical Lab Scientists</div>
                                        {onlineUsers.map(user=>(
                                            <> 
                                                {user.category_info==='MLS' && user.applicant !== parseInt(userId) ? 
                                                <div className="column-item text-left">
                                                    🟢 <Link to={ `/message/${user.applicant}` }>
                                                            {user.applicant_info.name} 
                                                        </Link>
                                                </div> : ""
                                                }
                                            </>
                                        ))}
                                    </div>
                                    <div className="col-md-3 mb-4">
                                    <div className="column-header bg-primary text-white text-center">Nurses</div>
                                    {onlineUsers.map(user=>(
                                        <> 
                                            {user.category_info==='Nurse' && user.applicant !== parseInt(userId) ? 
                                            <div className="column-item text-left">
                                                🟢 <Link to={ `/message/${user.applicant}` }>
                                                        {user.applicant_info.name} 
                                                    </Link>
                                            </div> : ""
                                            }
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                </> :
                    <h2> No Clinician Online at the moment </h2>
                }
                <br />
            </div>
        </>
    );
};

export default OnlineUsers;
