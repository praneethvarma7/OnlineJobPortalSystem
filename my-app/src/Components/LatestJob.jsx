import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const LatestJob = () => {
    const [job, setJob] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = () => {
        axios
            .get("http://localhost:8081/latestJob")
            .then((response) => {
                console.log("Response data:", response.data);
                setJob(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Latest Job !</h4>
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
                                                <th>Company</th>
                                                <th>Title</th>
                                                <th>Location</th>
                                                <th>Start Date</th>
                                                <th>Last Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='btn-info'>
                                            {job.map((x, index) => (
                                                <tr key={x._id}>
                                                    <td>{index + 1}.</td>
                                                    <td>{x.company}</td>
                                                    <td>{x.jobtitle}</td>
                                                    <td>{x.location}</td>
                                                    <td>{x.startdate}</td>
                                                    <td>{x.enddate}</td>
                                                    <td>
                                                        <Link to="/userLogin" className="text-danger btn-block radius-30">
                                                            Login to apply<i className="fa fa-check"></i>
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
    )
}

export default LatestJob