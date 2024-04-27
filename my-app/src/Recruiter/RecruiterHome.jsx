import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const RecruiterHome = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        contact: '',
        company: '',
        email: '',
        recruiterimage: '',
        gender: '',
    });

    useEffect(() => {
        axios
            .get('http://localhost:8081/recruiterHome')
            .then((res) => {
                console.log('Profile Data:', res.data);
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                } else {
                    alert('Error: ' + res.data.Error);
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Error fetching profile data');
            });
    }, []);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };
    return (
        <div>
            <marquee style={{ fontFamily: 'Monotype Corsiva', height: '35px', backgroundColor: 'lightgreen', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Welcome to Our Job Portal !</h4>
            </marquee>

            <div className="container-xxl py-5">
                <div className="container" >
                    <div className="row g-6">
                        <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s"style={{ fontFamily: 'Monotype Corsiva' }}>
                            <div className="bg-light p-4 h-100 d-flex align-items-center">
                                <div className="container mt-6" style={{ marginLeft: '10%' }}>
                                    <h3 className="text-primary " style={{ fontFamily: 'Monotype Corsiva' }}>Recruiter Profile</h3>
                                    <hr />
                                    <table className="table table-bordered mt-4">
                                        <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Company: <span className="text-secondary"style={{ fontFamily: 'Monotype Corsiva' }}>{data.company}</span></h3>
                                        <h3 style={{ fontFamily: 'Monotype Corsiva' }}>First Name:  <span className="text-secondary" style={{ fontFamily: 'Monotype Corsiva' }}>{data.firstname}</span></h3>
                                        <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Last Name: <span className="text-secondary" style={{ fontFamily: 'Monotype Corsiva' }}>{data.lastname}</span></h3>
                                        <h3>
                                            <th style={{ position: 'relative',fontFamily: 'Monotype Corsiva' }}>
                                                Contact:
                                                <span
                                                    style={{
                                                        marginTop: '-46%',
                                                        marginLeft: '270%',
                                                        position: 'absolute',
                                                        backgroundColor: 'orange',
                                                        color: "red"
                                                    }}
                                                    className={`input-group-text toggle-password-2 ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                                                    onClick={togglePasswordVisibility}
                                                ></span>
                                            </th>
                                            <th className="text-secondary">{showPassword ? data.contact : "*********"}</th>
                                        </h3>
                                        <h3> <th style={{ position: 'relative',fontFamily: 'Monotype Corsiva' }}>
                                            Email ID:
                                            <span
                                                style={{
                                                    marginTop: '-37%',
                                                    marginLeft: '340%',
                                                    position: 'absolute',
                                                    backgroundColor: 'orange',
                                                    color: "red"
                                                }}
                                                className={`input-group-text toggle-password-2 ${showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"}`}
                                                onClick={togglePasswordVisibility1}
                                            ></span>
                                        </th>
                                            <th className="text-secondary">{showPassword1 ? data.email : "******************"}</th></h3>
                                        <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Gender: <span className="text-secondary" style={{ fontFamily: 'Monotype Corsiva' }}>{data.gender}</span></h3>
                                    </table>
                                    <hr />
                                    <Link to="/recruiterProfile/:id">
                                        <div className="d-flex align-items-center p-1 mt-4">
                                            <div className="ms-3" >
                                                <h4 className="m-0 text-primary" style={{ fontFamily: 'Monotype Corsiva' }}>Edit Profile...</h4>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                                <div className="col-lg-6 pt-4" style={{ height: '400px', marginRight: '-9%' }}>
                                    <div className="position-relative h-100 wow fadeInUp" data-wow-delay="0.5s">
                                    <img className="bg-white h-100 w-95" src={`http://localhost:8081/images/` + data.recruiterimage} alt="" />

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

export default RecruiterHome