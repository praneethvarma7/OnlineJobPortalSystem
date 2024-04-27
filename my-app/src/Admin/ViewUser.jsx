import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViewUser = () => {
    const [showPassword, setShowPassword] = useState({});
    const [showPassword1, setShowPassword1] = useState({});
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        axios
            .get("http://localhost:8081/viewUser") // Corrected endpoint URL
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this User?"
        );
        if (confirmed) {
          axios
            .delete(`http://localhost:8081/deleteviewUser/${id}`)
            .then((res) => {
              if (res.data.Status === "Success") {
                setUser(user.filter((user) => user._id !== id));
              } else {
                alert("Error");
              }
            })
            .catch((err) => console.log(err));
        }
      };

    const togglePasswordVisibility = (id) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    const togglePasswordVisibility1 = (id) => {
        setShowPassword1((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>View User !</h4>
            </marquee>
            <hr />
            <div className="page-wrapper" >
                <div className="page-content-wrapper">
                    <div className="page-content">
                        <div className="card radius-10 overflow-hidden">
                            <div className="card-body p-5">
                                <div className="table-responsive">
                                    <table className="table mb-2">
                                        <thead className='btn-dark'>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Full Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Gender</th>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='btn-info'>
                                            {user.map((x, index) => (
                                                <tr key={x._id}>
                                                    <td>{index + 1}.</td>
                                                    <td>{x.firstname} {x.lastname}</td>
                                                    <td>
                                                        {showPassword[x._id] ? x.email : "********"}
                                                        <span
                                                            className={`fa ${showPassword[x._id] ? "fa-eye-slash" : "fa-eye"
                                                                } field-icon toggle-password-2 btn btn-primary`}
                                                            onClick={() => togglePasswordVisibility(x._id)}
                                                        ></span>
                                                    </td>
                                                    <td>
                                                        {showPassword1[x._id] ? x.contact : "********"}
                                                        <span
                                                            className={`fa ${showPassword1[x._id] ? "fa-eye-slash" : "fa-eye"
                                                                } field-icon toggle-password-2 btn btn-primary`}
                                                            onClick={() => togglePasswordVisibility1(x._id)}
                                                        ></span>
                                                    </td>
                                                    <td>{x.gender}</td>
                                                    <td>
                                                        <img
                                                            src={`http://localhost:8081/images/` + x.image}
                                                            width="70" height="70"
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleDelete(x._id)} className="btn btn-sm btn-danger btn-block radius-30">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser