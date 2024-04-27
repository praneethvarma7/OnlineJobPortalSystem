import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const PendingRecruiter = () => {
    const location = useLocation();
    const action = new URLSearchParams(location.search).get("action") || "Pending";
    const [showPassword, setShowPassword] = useState({});
    const [showPassword1, setShowPassword1] = useState({});
    const [data, setData] = useState([]);
    const [recruiter, setRecruiter] = useState([]);

    useEffect(() => {
        const fetchRecruiter = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/recruiterList?action=${action}`);
                console.log('Response:', response.data);

                if (response.data.Status === 'Success') {
                    setData(response.data.Result);
                } else {
                    alert('Error: ' + response.data.Message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error fetching data. Please check the console for more details.');
            }
        };

        fetchRecruiter();
    }, [action]);

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this User?"
        );
        if (confirmed) {
            axios
                .delete(`http://localhost:8081/deleteRecruiterList/${id}`)
                .then((res) => {
                    if (res.data.Status === "Success") {
                        setRecruiter(recruiter.filter((item) => item._id !== id));
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
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>{action} Recruiter !</h4>
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
                                                <th>Email ID</th>
                                                <th>Contact</th>
                                                <th>Gender</th>
                                                <th>Company</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='btn-info'>
                                            {data.map((x, index) => (
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
                                                    <td>{x.company}</td>
                                                    <td>
                                                        <img
                                                            src={`http://localhost:8081/images/` + x.recruiterimage}
                                                            width="70" height="70"
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td>{x.status}</td>
                                                    <td>
                                                        <button onClick={() => handleDelete(x._id)} className="btn btn-sm btn-danger btn-block radius-30">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                        &nbsp;
                                                        <Link to={`/changeStatus/${x._id}`} className="btn btn-sm btn-success btn-block radius-30">
                                                            Change Status
                                                        </Link>
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
    );
};

export default PendingRecruiter;
