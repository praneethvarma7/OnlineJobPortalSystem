import axios from "axios";
import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver"; // Import the file-saver library
import { Link } from 'react-router-dom';

const ApplyJobList = () => {
    const [showPassword, setShowPassword] = useState({});
    const [showPassword1, setShowPassword1] = useState({});
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        axios
            .get('http://localhost:8081/applyJobList')
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDownload = (pdfFilename) => {
        axios.get(`http://localhost:8081/pdf/${pdfFilename}`, { responseType: 'arraybuffer' })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'application/pdf/docx/txt/jpg/png/jpeg/svg' });
                saveAs(blob, pdfFilename);
            })
            .catch((error) => {
                console.error(error);
            });
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
            <div style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%', fontFamily: 'Monotype Corsiva', textAlign: 'center' }}>
                <h4>Apply Job List !</h4>
            </div>
            <hr />
            <div className="page-wrapper">
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
                                                <th>Email Id</th>
                                                <th>Title</th>
                                                <th>Contact</th>
                                                <th>Company</th>
                                                <th>Resume</th>
                                            </tr>
                                        </thead>
                                        <tbody className='btn-info'>
                                            {jobs.map((job, index) => (
                                                <tr key={job._id}>
                                                    <td>{index + 1}.</td>
                                                    <td>{job.userId ? `${job.userId.firstname} ${job.userId.lastname}` : 'N/A'}</td>
                                                    <td>
                                                        {showPassword[job._id] ? job.userId ? job.userId.email : 'N/A' : "********"}
                                                        <span
                                                            className={`fa ${showPassword[job._id] ? "fa-eye-slash" : "fa-eye"
                                                                } field-icon toggle-password-2 btn btn-primary`}
                                                            onClick={() => togglePasswordVisibility(job._id)}
                                                        ></span>
                                                    </td>
                                                    <td>{job.jobId ? job.jobId.jobtitle : 'N/A'}</td>
                                                    <td>
                                                        {showPassword1[job._id] ? job.userId ? job.userId.contact : 'N/A' : "********"}
                                                        <span
                                                            className={`fa ${showPassword1[job._id] ? "fa-eye-slash" : "fa-eye"
                                                                } field-icon toggle-password-2 btn btn-primary`}
                                                            onClick={() => togglePasswordVisibility1(job._id)}
                                                        ></span>
                                                    </td>
                                                    <td>{job.jobId ? job.jobId.company : 'N/A'}</td>
                                                    <td>
                                                        
                                                            <div>
                                                                {/* <iframe
                                                                    key={`PDF-${index}`}
                                                                    title={`PDF-${index}`}
                                                                    src={`http://localhost:8081/pdf/${job.pdf}`}
                                                                    width="100%"
                                                                    height="500px"
                                                                    frameBorder="0"
                                                                    allowFullScreen
                                                                /> */}
                                                                <button onClick={() => handleDownload(job.pdf)}>Download Resume <i className="fa fa-download"></i></button>
                                                            </div>
                                                       
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
}

export default ApplyJobList;
