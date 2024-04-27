import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams  } from 'react-router-dom';

function JobApply() {
    const { id: jobId } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        pdf: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('pdf', job.pdf);
        formData.append('jobId', jobId);

        axios.post(`http://localhost:8081/jobApply/${jobId}`, formData)  // Include jobId in the URL
            .then(result => {
                alert("Apply Successfully");
                navigate('/userJobList');
            })
            .catch(err => {
                console.log(err);
                alert("Error applying for the job");
            });
    };

    const handleImageChange = (event) => {
        setJob(prevJob => ({
            ...prevJob,
            pdf: event.target.files[0],
        }));
    };


  return (
    <div>
           <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Apply Job !</h4>
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
                                            <input type="file" className="form-control border-0" name='pdf'style={{ height: '55px' }} 
                                            onChange={handleImageChange}/>
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit" value="Login" onClick={handleSubmit}>Submit</button>
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

export default JobApply