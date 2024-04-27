import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchJob();
    }, []);
  
    const fetchJob = () => {
      axios
        .get("http://localhost:8081/userJobList")
        .then((response) => {
          console.log("Response data:", response.data);
          setJobs(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const handleDelete = () => {
        const confirmed = window.confirm(
            "You have already applied for this job."
        );
    };
    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Job List !</h4>
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
                                                <th>Post Date</th>
                                                <th>Last Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='btn-info'>
                                        {jobs.map((x, index) => (
                                                <tr key={x._id}>
                                                    <td>{index + 1}.</td>
                                                    <td>{x.company}</td>
                                                    <td>{x.jobtitle}</td>
                                                    <td>{x.location}</td>
                                                    <td>{x.startdate}</td>
                                                    <td>{x.enddate}</td>
                                                    <td>
                                                    {x.applied ? (
                                                        <button onClick={() => handleDelete()} className="btn btn-danger radius-30">Applied <i className="fa fa-check"></i></button>
                                                    ) : (
                                                        <button className="btn btn-success"><Link to={`/jobDetails/${x._id}`} className="btn-block radius-30" style={{color:"whitesmoke"}}>
                                                        Apply <i className="fa fa-check"></i>
                                                    </Link></button>
                                                    )}
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

export default UserJobList