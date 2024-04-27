import React from 'react'
import { Link } from 'react-router-dom'

const IndexHome = () => {
  return (
    <div>
         <div className="container-fluid p-0 mb-5">
        <div className=" header-carousel position-relative">
          <div className="owl-carousel-item position-relative">
            <img className="img-fluid" src="img/carousel-1.jpg" alt="" style={{ width: '100%', height: '500px' }} />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(0, 0, 0, .4)' }}>
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h5 className="text-warning text-uppercase mb-3 animated slideInDown font-weight-bold"><em> Online Job </em><span className="text-info font-weight-bold" ><em> Portal System</em></span></h5>
                    <h3 className="display-5 text-white animated slideInDown mb-4 font-weight-bold" ><em>""Don't wait for the right
opportunity: create it."</em></h3>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5" style={{ width: '100%', height: '100%' }}>
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-5">--! Our Placed Peoples !--</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s" >
              <div className="team-item" >
                <div className="position-relative overflow-hidden" >
                  <img className="img-fluid" style={{ width: '100%', height: '150px' }} src="img/team-1.jpg" alt="" />
                  
                </div>
                <div className="team-text">
                  
                  <div className="bg-primary">
                    <Link className="btn btn-square mx-1" to=""><i className="fab fa-facebook-f"></i></Link>
                    <h4 style={{ fontFamily: 'Monotype Corsiva',color:'whitesmoke' }}>Facebook</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item">
                <div className="position-relative overflow-hidden" >
                  <img className="img-fluid" style={{ width: '100%', height: '150px' }} src="img/team-2.jpg" alt="" />
                  
                </div>
                <div className="team-text">
                  
                  <div className="bg-primary">
                    <Link className="btn btn-square mx-1" to=""><i className="fab fa-twitter"></i></Link>
                    <h4 style={{ fontFamily: 'Monotype Corsiva',color:'whitesmoke' }}>Twitter</h4>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item">
                <div className="position-relative overflow-hidden" >
                  <img className="img-fluid" style={{ width: '100%', height: '150px' }} src="img/team-3.jpg" alt="" />
                </div>
                <div className="team-text">
                  <div className="bg-primary">
                    <Link className="btn btn-square mx-1" to=""><i className="fa fa-users"></i></Link>
                    <h4 style={{ fontFamily: 'Monotype Corsiva',color:'whitesmoke' }}>Wipro</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="team-item">
                <div className="position-relative overflow-hidden" >
                  <img className="img-fluid" style={{ width: '100%', height: '150px' }} src="img/team-4.jpg" alt="" />
                </div>
                <div className="team-text">
                  <div className="bg-primary">
                    <Link className="btn btn-square mx-1" to=""><i className="fab fa-amazon"> </i> </Link>
                    <h4 style={{ fontFamily: 'Monotype Corsiva',color:'whitesmoke' }}>Amazon</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexHome