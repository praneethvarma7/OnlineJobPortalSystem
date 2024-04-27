import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Contact Us !</h4>
            </marquee>
            <hr />
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="text-secondary text-uppercase"></h6>
                            <h1 className="mb-4">Contact Us</h1>
                            <p className="mb-4"></p>
                        
                        </div>
                        <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-light p-5 h-100 d-flex align-items-center">
                                <form>
                                    <div className="row g-3">
                                        <div className="contact-1 content-area-6">
                                            <div className="container">
                                                    <div className=" col-md-12 col-sm-12">
                                                        <div className="contact-details">
                                                            <div className="contact-item d-flex ">
                                                                <div className="icon">
                                                                    <i className="fa fa-map-marker"></i>
                                                                </div>
                                                                <div className="contant">
                                                                    <h4>Office Address</h4>
                                                                    <p>KL UNIVERSITY</p> 
                                                                </div>
                                                            </div>
                                                            <div className="contact-item d-flex mb-3">
                                                                <div className="icon">
                                                                    <i className="fa fa-phone"></i>
                                                                </div>
                                                                <div className="contant">
                                                                    <h4>Phone Number</h4>
                                                                    <p>
                                                                        <Link to="">Office: 733730****</Link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="contact-item d-flex mb-3">
                                                                <div className="icon">
                                                                    <i className="fa fa-envelope"></i>
                                                                </div>
                                                                <div className="contant">
                                                                    <h4>Email Address</h4>
                                                                    <p>
                                                                        <Link to="">abc123***@xyz.com</Link>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="contact-item d-flex">
                                                                <div className="icon">
                                                                    <i className="fa fa-fax"></i>
                                                                </div>
                                                                <div className="contant">
                                                                    <h4>Fax</h4>
                                                                    <p>
                                                                        <Link to="">417 6348*****</Link>
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact