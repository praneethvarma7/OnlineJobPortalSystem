import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert2";

const UserSignup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [gender, setGender] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('contact', contact);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);
        formData.append('gender', gender);

        axios.post('http://localhost:8081/userSignup', formData)
            .then((result) => {
                navigate('/userLogin');
                swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registered successfully",
                });
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Email already registered",
                    });
                    console.log(err.response.data.error);
                } else {
                    console.log('Registration failed');
                }
            });
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>User Sign Up !</h4>
            </marquee>
            <hr />
            <div className="container-fluid px-0" style={{ margin: '2rem 0' }}>
                <div className="container position-relative wow fadeInUp" data-wow-delay="0.1s" style={{ margintop: '-6rem' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className=" text-center p-5" style={{ backgroundColor: 'lightblue' }}>
                                <form>
                                    <div className="row g-3">
                                        <div class="col-12 col-sm-6">
                                            <label className="form-label " style={{ marginRight: '300px' }}>Firstname:</label>
                                            <div className="form-control border-0">
                                                <input type="text" className="form-control border-0" placeholder="First Name"
                                                    onChange={e => setFirstname(e.target.value)}
                                                    required />
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6">
                                            <label className="form-label" style={{ marginRight: '300px' }}>Lastname:</label>
                                            <div className="form-control border-0">
                                                <input type="text" className="form-control border-0" placeholder="Last Name"
                                                    onChange={e => setLastname(e.target.value)}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <label className="form-label " style={{ marginRight: '690px' }}>Contact:</label>
                                            <div className="form-control border-0">
                                                <input type="text" className="form-control border-0" placeholder="Contact"
                                                    onChange={e => setContact(e.target.value)}
                                                    maxLength={10}
                                                    minLength={10}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <label className="form-label " style={{ marginRight: '690px' }}>Email:</label>
                                            <div className="form-control border-0">
                                                <input type="email" className="form-control border-0" placeholder="Email Address"
                                                    onChange={e => setEmail(e.target.value)}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <label className="form-label " style={{ marginRight: '670px' }}>Password:</label>
                                            <div className="form-control border-0">
                                                <input type="password" className="form-control border-0" placeholder="Enter Password"
                                                    onChange={e => setPassword(e.target.value)}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <label className="form-label " style={{ marginRight: '300px' }}>Gender:</label>
                                            <div className="form-control border-2">
                                                <label htmlFor="femaleRadio">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Female"
                                                        id="femaleRadio"
                                                        checked={gender === "Female"}
                                                        onChange={(e) => setGender(e.target.value)}
                                                        required
                                                    /> Female
                                                </label>&nbsp;
                                                <label htmlFor="maleRadio">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Male"
                                                        id="maleRadio"
                                                        checked={gender === "Male"}
                                                        onChange={(e) => setGender(e.target.value)}
                                                        required
                                                    /> Male
                                                </label>
                                            </div>
                                        </div>

                                        <div class="col-12 col-sm-6">
                                            <label className="form-label" style={{ marginRight: '300px' }}>Image:</label>
                                            <input type="file" className="form-control border-2" accept=".jpg,.png,.jpeg"
                                                onChange={handleImageChange}
                                                required />
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-success w-100 py-3" type="submit" value="Submit" onClick={handleSubmit}>Submit</button>
                                        </div>
                                        <p>Already a User?<Link to="/userLogin" className="thembo"> Login here</Link></p>
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

export default UserSignup