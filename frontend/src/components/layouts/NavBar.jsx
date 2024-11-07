import { useState, useEffect } from "react";
import { useContext } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import {SearchContext} from '../contexts/SearchContext'
import api from "../../AxiosInstance";

const NavBar = ({ baseURL }) => {
  const { search, user } = useContext(SearchContext);
  const [ searchQuery, setSearchQuery ] = search;
  const [email, setEmail] = user
  const firstName = localStorage.getItem('firstname')
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()
  const [userGroup, setUserGroup] = useState('')

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    navigate('/search');
  };

  useEffect(()=>{
    if(localStorage.getItem('access_token')){
        setEmail(localStorage.getItem('email'))
        setUserGroup(localStorage.getItem('user_group'))
    }
  },)

//   useEffect(() => {
//     if (email) {
//         const token = localStorage.getItem('access_token')
//         const interval = setInterval(() => {
//             api.post(`${baseURL}/accounts/update_activity/`, {}, {
//             headers: {
//                 "Authorization": `FRISKY ${token}`,
//             },
//             });
//       }, 30000);  // 30 seconds interval

//       return () => clearInterval(interval);
//     }
//   }, [email]);
  
  useEffect(() => {  
      const checkAuth = () => {  
      if (localStorage.getItem('access_token') !== null) {        
          setIsAuth(true);
          setEmail(localStorage.getItem('email'))
      }else {
        setIsAuth(false);
        setEmail('');
      }
    } 
    checkAuth();
  }, [isAuth]);

  const handleSignout = () => {
    api.post(`${baseURL}/accounts/set_user_offline/${email}/`)
    localStorage.clear()
    setIsAuth(false); // Update state immediately
    setEmail(''); // Clear email state
    navigate('/')
  }

  return (
    <>
        <div className="top">
            {/* <!-- Topbar Start --> */}
            <div className="container-fluid bg-primary px-5 d-none d-lg-block">
                <div className="row gx-0">
                    <div className="col-lg-4 text-center text-lg-start mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center" style={{height: "45px"}}>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-twitter fw-normal"></i></a>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-facebook-f fw-normal"></i></a>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-linkedin-in fw-normal"></i></a>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i className="fab fa-instagram fw-normal"></i></a>
                            <a className="btn btn-sm btn-outline-light btn-sm-square rounded-circle" href=""><i className="fab fa-youtube fw-normal"></i></a>  
                        </div>
                    </div>
                    <div className="navbar-search col-lg-4 mx-auto">
                        <input
                            className="form-control border-0 w-100 py-1 mt-1 ps-4 pe-5"
                            type="text"
                            placeholder="🔍 Search Item by name..."
                            // value={searchQuery}
                            // onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col-lg-4 text-center text-lg-end">
                        <div className="d-inline-flex align-items-center" style={{height: "45px"}}>
                            { email ? 
                                <>
                                <Link onClick={handleSignout}><small className="me-3 text-light"><i onClick={handleSignout} className="fa fa-sign-in-alt me-2"></i>Logout</small></Link>
                                <div className="dropdown">
                                <a href="#" className="dropdown-toggle text-light" data-bs-toggle="dropdown"><small><i className="fas fa-user-alt me-2"></i> {email}</small></a>
                                <div className="dropdown-menu rounded">
                                    <Link to="/auth/profile" className="dropdown-item"><i className="fas fa-user-alt me-2"></i> My Profile</Link>
                                    <a href="#" className="dropdown-item"><i className="fas fa-comment-alt me-2"></i> Inbox</a>
                                    <a href="#" className="dropdown-item"><i className="fas fa-bell me-2"></i> Notifications</a>
                                    <a href="#" className="dropdown-item"><i className="fas fa-cog me-2"></i> Account Settings</a>
                                    <Link onClick={handleSignout} className="dropdown-item"><i className="fas fa-power-off me-2"></i> Logout</Link>
                                </div>
                            </div>
                                </>
                                :
                                <>
                                <Link to="register"><small className="me-3 text-light"><i className="fa fa-user me-2"></i>Register</small></Link>
                                <Link to="login"><small className="me-3 text-light"><i className="fa fa-sign-in-alt me-2"></i>Login</small></Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}

            {/* <!-- Navbar & Hero Start --> */}
            <div className="container-fluid position-relative p-0">
                <nav style={{backgroundColor:"grey"}} className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <Link to="/" className="navbar-brand p-0">
                        <h1 className="m-0">
                        {/* <i className="fa fa-map-marker-alt me-3"></i> */}
                        Medics
                        </h1>
                        {/* <img src="assets/img/item_default.png" alt="Logo" /> */}
                    </Link>
                    <div className="middle">
                        { email ? 
                                    <>
                                    <div className="dropdown">
                                    <a href="#" className="dropdown-toggle text-light" data-bs-toggle="dropdown">
                                        <span><i className="fas fa-user-alt me-2"></i> 
                                            {firstName}
                                        </span>
                                    </a>
                                    <div className="dropdown-menu rounded">
                                        <Link to="/auth/profile" className="dropdown-item"><i className="fas fa-user-alt me-2"></i> My Profile</Link>
                                        <a href="#" className="dropdown-item"><i className="fas fa-comment-alt me-2"></i> Inbox</a>
                                        <a href="#" className="dropdown-item"><i className="fas fa-bell me-2"></i> Notifications</a>
                                        <a href="#" className="dropdown-item"><i className="fas fa-cog me-2"></i> Account Settings</a>
                                        <Link onClick={handleSignout} className="dropdown-item"><i className="fas fa-power-off me-2"></i> Logout</Link>
                                    </div>
                                </div>
                                    </>
                                    :
                                    <>
                                    <button
                            type="button"
                            className="btn btn-primary"
                            onClick={()=>navigate("/login")}
                        >
                            Login
                        </button>
                                    </>
                        }
                        
                        </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                            <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                            { userGroup==="manager" ? 
                                <>
                                    <div className="nav-item dropdown">
                                        <a to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Manager</a>
                                        { email ? 
                                        <>
                                            <div className="dropdown-menu m-0">
                                                <Link to="/application_list" className="dropdown-item">Application List</Link>
                                                <Link to="/orders" className="dropdown-item">Orders List</Link>
                                            </div>
                                        </> :
                                        <div className="dropdown-menu m-0">
                                            <Link to="/login">Login to continue</Link>
                                        </div>
                                        }
                                    </div> 
                                </> : ""
                            }
                            <NavLink to={email?"/apply":"/login"} className="nav-item nav-link">Apply Now</NavLink>
                            {/* <Link to="/" className="nav-item nav-link">Packages</Link> */}
                            {/* <Link to="/" className="nav-item nav-link">Blog</Link> */}
                            <div className="nav-item dropdown">
                                <a to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Orders</a>
                                { email ? 
                                    <>
                                        <div className="dropdown-menu m-0">
                                            <Link to="/place_order" className="dropdown-item">Place Order</Link>
                                            <Link to="/orders_list" className="dropdown-item">My Orders</Link>
                                        </div> 
                                    </> : 
                                    <div className="dropdown-menu m-0">
                                        <Link to="/login">Login to Place Order</Link>
                                    </div> 
                                }
                            </div>
                            <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                        </div>
                        <Link to={email ? "/auth/online_users" : "/login"} className="btn btn-primary rounded-pill py-2 px-4 ms-lg-4">Free Consultation</Link>
                    </div>
                </nav>
                <div className="bottomBar">
                    <input
                        className="form-control border-0 rounded-pill w-100 py-1 ps-4 pe-5"
                        type="text"
                        placeholder="🔍 Search for items"
                        // value={searchQuery}
                        // onChange={handleSearchChange}
                    />
                </div>
                
            </div>
        </div>
    </>
  );
};

export default NavBar;