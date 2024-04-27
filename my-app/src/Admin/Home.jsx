import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [userCount, setUserCount] = useState()
  const [recruiterCount, setRecruiterCount] = useState()
  const [jobCount, setJobCount] = useState()
  const [applyJobCount, setApplyJobCount] = useState()

  useEffect(() => {
      axios.get('http://localhost:8081/userCount')
          .then(res => {
            setUserCount(res.data[0].user)
          }).catch(err => console.log(err));

      axios.get('http://localhost:8081/recruiterCount')
          .then(res => {
            setRecruiterCount(res.data[0].recruiter)
          }).catch(err => console.log(err));
          
      axios.get('http://localhost:8081/jobCount')
          .then(res => {
            setJobCount(res.data[0].job)
          }).catch(err => console.log(err));

      axios.get('http://localhost:8081/applyJobCount')
      .then(res => {
        setApplyJobCount(res.data[0].apply)
      }).catch(err => console.log(err));
  }, [])

  return (
    <div>
      <marquee style={{ height: '35px', backgroundColor: 'lightgreen', fontWeight: 'bold', marginTop: '1%' }}>
        <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Welcome to Our Job Portal !</h4>
      </marquee>
      <hr />
      <div className="container mt-5">
        <div className="page-wrapper" style={{ marginTop: '20px' }}>
          <div className="page-content-wrapper">
            <div className="page-content">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="card radius-20 bg-success">
                    <Link to="/viewUser">
                      <div className="card-body">
                        <div className="d-flex align-center">
                          <div>
                            <h3 className="text-center" style={{ fontFamily: 'Monotype Corsiva' }}>Total User!</h3>
                          </div>
                          <div className="ms-auto font-35 text-white"><i className="bx bx-calendar-x"></i></div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div>
                            <h5 className="mb-0 text-white" style={{ fontStyle: 'italic' }}>{userCount}</h5>
                          </div>
                          <div className="ms-auto font-14 text-white"></div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card radius-20 bg-primary">
                    <Link to="/pendingRecruiter/?action=All">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div>
                            <h3 className="text-center" style={{ fontFamily: 'Monotype Corsiva' }}>Total Recruiter</h3>
                          </div>
                          <div className="ms-auto font-35 text-white"><i className="bx bx-check-double"></i></div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div>
                            <h5 className="mb-0 text-white" style={{ fontStyle: 'italic' }}>{recruiterCount}</h5>
                          </div>
                          <div className="ms-auto font-14 text-white"></div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-wrapper" style={{ marginTop: '20px' }}>
          <div className="page-content-wrapper">
            <div className="page-content">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="card radius-20 bg-secondary">
                    <Link to="">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div>
                            <h3 className="text-center" style={{ fontFamily: 'Monotype Corsiva' }}>Total Job</h3>
                          </div>
                          <div className="ms-auto font-35 text-white"><i className="bx bx-calendar-x"></i></div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div>
                            <h5 className="mb-0 text-white" style={{ fontStyle: 'italic' }}>{jobCount}</h5>
                          </div>
                          <div className="ms-auto font-14 text-white"></div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="card radius-20 bg-danger">
                    <Link to="">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div>
                            <h3 className="text-center" style={{ fontFamily: 'Monotype Corsiva' }}>Total Apply Job</h3>
                          </div>
                          <div className="ms-auto font-35 text-white"><i className="bx bx-check-double"></i></div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div>
                            <h5 className="mb-0 text-white" style={{ fontStyle: 'italic' }}>{applyJobCount}</h5>
                          </div>
                          <div className="ms-auto font-14 text-white"></div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
