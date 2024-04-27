import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from "sweetalert2";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    axios.defaults.withCredentials = true;
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      axios.post('http://localhost:8081/userLogin', { email, password })
      .then(result => { 
        console.log(result);
        if (result.data.message === "Login successful") {
          navigate('/userHome');
          swal.fire({
            position: "center",
            icon: "success",
            title: `Welcome, ${result.data.firstname}`,
          }).then(() => {
            window.location.reload();
          });
        } else {
          swal.fire({
            position: "center",
            icon: "error",
            title: "Invalid firstname or password",
          });
        }
      })
      .catch(err => {
        console.log(err);
        swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid firstname or password",
        });
      });
      };
    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>User Login !</h4>
            </marquee>
            <hr />
            <div className="container-fluid px-0" style={{ margin: '2rem 0' }}>
                <div className="container position-relative wow fadeInUp" data-wow-delay="0.1s" style={{ margintop: '-6rem' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className=" text-center p-5" style={{ backgroundColor: 'lightblue' }}>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-12">
                                            <input type="text" className="form-control border-0" name='email' placeholder="Email Id" style={{ height: '55px' }} 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <input type="password" className="form-control border-0" name='password' placeholder="Enter Password" style={{ height: '55px' }} 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}/>
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit" value="Login" onClick={handleSubmit}>Submit</button>
                                        </div>
                                        <p>Don't have an account? <Link to="/userSignup" className="thembo"> Register here</Link></p>
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

export default UserLogin