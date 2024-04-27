import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        contact: '',
        email: '',
        gender: '',
        image: null,
    });

    useEffect(() => {
        axios
            .get('http://localhost:8081/userHome')
            .then((res) => {
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('contact', data.contact);
        formData.append('email', data.email);
        formData.append('gender', data.gender);

        try {
            const response = await axios.put('http://localhost:8081/userProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.Status === 'Success') {
                console.log('Profile updated successfully');
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: 'Your profile has been updated successfully.',
                });
                navigate('/userHome');
            } else {
                console.error('Error updating profile');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error updating profile: ' + response.data.Error,
                });
            }
        } catch (error) {
            console.error('Error updating profile', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error updating profile: ' + error.message,
            });
        } 
    };

    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Update Profile !</h4>
            </marquee>
            <hr />
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-light p-5 h-100 d-flex align-items-center">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="row g-3" style={{ marginRight: '300px' }}>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" name="firstname" placeholder="Your First Name" value={data.firstname}
                                                    onChange={(e) => setData({ ...data, firstname: e.target.value })} />
                                                <label for="name">First Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" name="lastname" placeholder="Your Last Name" value={data.lastname}
                                                    onChange={(e) => setData({ ...data, lastname: e.target.value })} />
                                                <label for="name">Last Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="contact" placeholder="Enter Contact" name="contact"
                                                    value={showPassword1 ? data.contact : "******"}
                                                    onChange={(e) => {
                                                        if (showPassword1) {
                                                            setData(prevData => ({ ...prevData, contact: e.target.value }));
                                                        }
                                                    }}
                                                    maxLength={10}
                                                    minLength={10}
                                                    autoComplete="off"
                                                    required
                                                />
                                                <span
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '60%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        padding: "11px", color: "blue"
                                                    }}
                                                    className={`input-group-text toggle-password-2 ${showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"}`} onClick={togglePasswordVisibility1} ></span>
                                                <label for="contact">Contact No.</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type='text' className="form-control" placeholder="Your Email" id="email" name="email"
                                                    value={showPassword ? data.email : "******"}
                                                    onChange={(e) => {
                                                        if (showPassword) {
                                                            setData(prevData => ({ ...prevData, email: e.target.value }));
                                                        }
                                                    }}
                                                    autoComplete="off"
                                                    required
                                                />
                                                <span
                                                    style={{
                                                        position: 'absolute',
                                                        right: '12px',
                                                        top: '60%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        padding: "11px", color: "blue"
                                                    }}
                                                    className={`input-group-text toggle-password-2 ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                                                    onClick={togglePasswordVisibility}></span>
                                                <label for="email">Email ID</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <label className="form-label" style={{ marginRight: '300px' }}>
                                                Gender:
                                            </label>
                                            <div className="form-control border-2">
                                                <label htmlFor="femaleRadio">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Female"
                                                        id="femaleRadio"
                                                        checked={data.gender === 'Female'}
                                                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                                                    />{' '}
                                                    Female
                                                </label>
                                                &nbsp;
                                                <label htmlFor="maleRadio">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Male"
                                                        id="maleRadio"
                                                        checked={data.gender === 'Male'}
                                                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                                                    />{' '}
                                                    Male
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <label className="form-label" style={{ marginRight: '300px' }}>Image:</label>
                                            <input
                                                type="file"
                                                className="form-control border-2"
                                                name="image"
                                                accept=".jpg,.png,.jpeg"
                                                onChange={(e) => {
                                                    const selectedFile = e.target.files[0];
                                                    setData({ ...data, image: selectedFile });
                                                }}
                                            />
                                            {data.image && (
                                                <p style={{ marginTop: '5px' }}>Selected File: {data.image}</p>
                                            )}
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s" style={{ marginLeft: '73%', marginTop: '-31%' }}>
                            <div class="position-relative h-100 wow fadeInUp" data-wow-delay="0.5s">
                                <img class=" bg-lightblue w-50 h-59" src={`http://localhost:8081/images/` + data.image} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default UserProfile