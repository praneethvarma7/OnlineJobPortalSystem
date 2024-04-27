import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import swal from "sweetalert2";

const Index = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [active, setActive] = useState(null);
  const [username, setUsername] = useState(null);
  const [firstname, setFirstname] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/home")
      .then((result) => {
        console.log(result);
        if (result.data && result.data.Status === "Success") {
          setUserRole(result.data.role);
          setUsername(result.data.username);
          setFirstname(result.data.firstname);
          setActive(result.data.active === true);
          console.log('Updated username state:', result.data.active);
        } else {
          setUserRole(null);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        setUserRole(null);
        setUsername(null);
        swal.fire({
          title: "Oops...",
          text: "Log-Out Successfully !",
        }).then(() => {
          window.location.reload();
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="container-fluid bg-white d-none d-lg-block">
        <div className="row align-items-center top-bar">
          <div className="col-lg-3 col-md-12 text-center text-lg-start">
            <Link  className="navbar-brand m-0 p-0">
              <h2 className="text-warning m-0 font-weight-bold"style={{ fontFamily: 'Monotype Corsiva' }}><em>Online Job </em><span className="text-primary font-weight-bold" ><em>Portal System</em></span></h2>
            </Link>
          </div>
          <div className="col-lg-9 col-md-12 text-end">
            <div className="h-100 d-inline-flex align-items-center me-4">
              <img className="img-fluid" src="img/job-portal.png" alt="" style={{ width: '195px', height: '85px', marginRight: '400px' }} />

              <div className="h-90 d-inline-flex align-items-center" >
                <Link className="btn btn-sm-square bg-white text-primary me-1" to=""><i className="fab fa-facebook-f"></i></Link>
                <Link className="btn btn-sm-square bg-white text-primary me-1" to=""><i className="fab fa-twitter"></i></Link>
                <Link className="btn btn-sm-square bg-white text-primary me-1" to=""><i className="fab fa-linkedin-in"></i></Link>
                <Link className="btn btn-sm-square bg-white text-primary me-0" to=""><i className="fab fa-instagram"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid nav-bar bg-white">
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 py-lg-0 px-lg-4">
          <Link to="" className="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none">
            <h1 className="text-primary m-0 " >Online Job Portal System</h1>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">

            {!userRole && (
              <>
                <div className="navbar-nav me-auto">
                  <Link to="/" className="nav-item nav-link active"><i class="fa fa-home mr-1"></i> Home</Link>
                  <Link to="/latestJob" className="nav-item nav-link"><i class="fa fa-users mr-1"></i> Latest Job</Link>
                  <Link to="/userLogin" className="nav-item nav-link"><i class="fa fa-user-plus mr-1"></i> User Login</Link>
                  <Link to="/recruiterLogin" className="nav-link" ><i class="fa fa-sign-language mr-1"></i> Recruiter Login</Link>
                  <Link to="/adminLogin" className="nav-link" ><i class="fa fa-unlock mr-1"></i> Admin Login</Link>
                  <Link to="/contact" className="nav-item nav-link"><i class="fa fa-phone mr-1"></i> Contact</Link>
                </div>
                <div className="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '45px', height: '45px' }}>
                    <i className="fa fa-user text-success"></i>
                  </div>
                  <div className="ms-3">
                    <h3 className="m-0 text-white font-weight-bold" style={{ fontFamily: 'Monotype Corsiva' }}>
                      Job Portal
                    </h3>
                  </div>

                </div>
              </>
            )}
            {userRole === "admin" && (
              <>
                <div className="navbar-nav me-auto">
                  <Link to="/home" className="nav-item nav-link active"><i class="fa fa-home mr-1"></i> Home</Link>
                  <div class="nav-item dropdown">
                    <Link to="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i class="fa fa-sign-language mr-1"></i> Recruiter</Link>
                    <div class="dropdown-menu fade-up m-0">
                      <Link to="/pendingRecruiter/?action=Pending" class="dropdown-item">Pending</Link>
                      <Link to="/pendingRecruiter/?action=Accepted" class="dropdown-item">Accepted</Link>
                      <Link to="/pendingRecruiter/?action=Rejected" class="dropdown-item">Rejected</Link>
                      <Link to="/pendingRecruiter/?action=All" class="dropdown-item">All Recruiter</Link>
                    </div>
                  </div>
                  <Link to="/viewUser" className="nav-link" ><i class="fa fa-users mr-1"></i> View User</Link>
                  <Link to="/changePassword" className="nav-item nav-link"><i class="fa fa-user-circle mr-1"></i> Change Password</Link>
                  <Link className="nav-link" onClick={handleLogout}><i class="fa fa-unlock mr-1"></i> Logout</Link>

                </div>
                <div className="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '45px', height: '45px' }}>
                    <i className="fa fa-user text-success"></i>
                  </div>
                  <div className="ms-3">
                    <h3 className="m-0 text-white font-weight-bold" style={{ fontFamily: 'Monotype Corsiva' }}>
                      Hi.... {username}
                    </h3>
                  </div>

                </div>
              </>
            )}
            {userRole === "user" && (
              <>
                <div className="navbar-nav me-auto">
                  <Link to="/userHome" className="nav-item nav-link active"><i class="fa fa-home mr-1"></i> Home</Link>
                  <Link to="/userJobList" className="nav-item nav-link"><i class="fa fa-list mr-1"></i> Job List</Link>
                  <Link to="/userChangePassword" className="nav-item nav-link"><i class="fa fa-user-circle mr-1"></i> Change Password</Link>
                  <Link className="nav-link" onClick={handleLogout}><i class="fa fa-unlock" ></i> Logout</Link>
                </div>
                <div className="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '45px', height: '45px' }}>
                    <i className="fa fa-user text-success"></i>
                  </div>
                  <div className="ms-3">
                    <h3 className="m-0 text-white font-weight-bold" style={{ fontFamily: 'Monotype Corsiva' }}>
                      Hello...{firstname}
                    </h3>
                  </div>

                </div>
              </>
            )}
            {userRole === "recruiter" && (
              <>
                <div className="navbar-nav me-auto">
                  <Link to="/recruiterHome" className="nav-item nav-link active"><i class="fa fa-home mr-1"></i> Home</Link>
                  <Link to="/addJob" className="nav-item nav-link"><i class="fa fa-plus-circle mr-1"></i> Add Job</Link>
                  <Link to="/recruiterJobList" className="nav-item nav-link"><i class="fa fa-list mr-1"></i> Job List</Link>
                  <Link to="/applyJobList" className="nav-link" ><i class="fa fa-hand-peace mr-1"></i> Apply Job List</Link>
                  <Link to="/recruiterChangePassword" className="nav-item nav-link"><i class="fa fa-user-circle mr-1"></i> Change Password</Link>
                  <Link className="nav-link" onClick={handleLogout}><i class="fa fa-unlock" ></i> Logout</Link>
                </div>
                <div className="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '45px', height: '45px' }}>
                    <i className="fa fa-user text-success"></i>
                  </div>
                  <div className="ms-3">
                    <h3 className="m-0 text-white font-weight-bold" style={{ fontFamily: 'Monotype Corsiva' }}>
                      Hello...{firstname}
                    </h3>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>

      <Outlet />
      <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Contact information</h4>
              <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>vaddeswaram kl university</p>
              <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>7337302164*</p>
              <p className="mb-2"><i className="fa fa-envelope me-3"></i>praneethvarma@gmail.com</p>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-twitter"></i></Link>
                <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-facebook-f"></i></Link>
                <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-youtube"></i></Link>
                <Link className="btn btn-outline-light btn-social" to=""><i className="fab fa-linkedin-in"></i></Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Opening Hours</h4>
              <h6 className="text-light">Monday - Friday:</h6>
              <p className="mb-4">09.00 AM - 09.00 PM</p>
              <h6 className="text-light">Saturday - Sunday:</h6>
              <p className="mb-0">09.00 AM - 12.00 PM</p>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Online Placement</h4>
              <p>An employment website is a website that deals specifically with employment or carrer placement .</p>
              <div className="position-relative mx-auto" style={{ maxwidth: '400px' }}>
                <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy; <Link className="border-bottom" to="#">Online Job Portal System {new Date().getFullYear()}</Link>, All Right Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">

                Designed By <Link className="border-bottom" to="#">Online Job Portal System.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to="#" className="btn btn-lg btn-primary btn-lg-square rounded-0 back-to-top"><i className="bi bi-arrow-up"></i></Link>
    </div>
  )
}

export default Index