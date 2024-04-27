import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import swal from "sweetalert2";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    axios.defaults.withCredentials = true;
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      axios.post('http://localhost:8081/adminLogin', { username, password })
        .then(result => {
          console.log(result);
          if (result.data.message === "Login successful") {
            navigate('/home');
            swal.fire({
              position: "center",
              icon: "success",
              title: `Welcome, ${result.data.username}`,
            }).then(() => {
              window.location.reload();
            });
          } else {
            swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please enter valid details!",
            });
          }
        })
        .catch(err => {
          console.log(err);
          swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid details!",
          });
        });
    };
  
    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Admin Login !</h4>
            </marquee>
            <hr />
            <div className="container-fluid px-0" style={{ margin: '2rem 0' }}>
                <div className="container position-relative wow fadeInUp" data-wow-delay="0.1s" style={{ margintop: '-6rem' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="text-center p-5" style={{ backgroundColor: 'lightblue' }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3" >
                                        <div className="col-12 col-sm-12">
                                            <input type="text" className="form-control border-0" name='username' placeholder="User Name" style={{ height: '55px' }}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)} required />
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <input type="password" className="form-control border-0" name='password' placeholder="Enter Password" style={{ height: '55px' }}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} required />
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Submit</button>
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

export default AdminLogin