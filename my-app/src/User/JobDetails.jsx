import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const JobDetails = () => {
    const [job, setJob] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/jobDetails/${id}`);
                setJob(response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [id]);

    const isJobOpen = () => {
        const currentDate = new Date();
        const startDate = new Date(job.startdate);
        const endDate = new Date(job.enddate);
        
        return startDate <= currentDate && currentDate <= endDate;
      };
    

    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightgreen', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Welcome to Our Job Portal !</h4>
            </marquee>

            <div className="container-xxl py-5">
                <div className="container" >
                    <div className="row g-6">
                        <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-light p-4 h-100 d-flex align-items-center" >
                                <div className="container mt-6" style={{ marginLeft: '10%' }}>
                                    <h3 className="text-primary " style={{ fontFamily: 'Monotype Corsiva' }}>Job Details</h3>
                                    <hr />
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Job Title: <span className="text-secondary">{job.jobtitle}</span></h3>
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Company Name: <span className="text-secondary">{job.company}</span></h3>
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Salary: <span className="text-secondary">{job.salary} Rs.</span></h3>
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Location: <span className="text-secondary">{job.location}</span></h3>
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Experience: <span className="text-secondary">{job.experience}</span></h3>
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Description: <span className="text-secondary">{job.description}</span></h3>
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Post Date: <span className="text-secondary">{job.startdate}</span></h3>
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Last Date: <span className="text-secondary">{job.enddate}</span></h3>
                                    <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Skills: <span className="text-secondary">{job.skills}</span></h3>

                                    <hr />
                                    <div className="col-12">
                                        {isJobOpen() ? (
                                            <Link className="btn btn-success w-100 py-1" to={`/jobApply/${job._id}`}>
                                                <h3 style={{ fontFamily: 'Monotype Corsiva' }}>Apply Now</h3>
                                            </Link>
                                        ) : (
                                            <h3><p style={{ fontFamily: 'Monotype Corsiva', color: 'red' }}>Applications closed</p></h3>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-6 pt-4" style={{ height: '300px', marginTop: '-9%' }}>
                                    <div className="position-relative h-100 wow fadeInUp" data-wow-delay="0.5s">
                                        <img class=" bg-white h-120 w-100" src={`http://localhost:8081/images/` + job.companylogo} alt="" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails