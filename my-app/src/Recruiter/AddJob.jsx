import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AddJob = () => {
    const [data, setData] = useState({
        company: '',
    });

    useEffect(() => {
        axios
            .get('http://localhost:8081/recruiterHome')
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result || {});
                } else {
                    alert('Error: ' + res.data.Error);
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Error fetching profile data');
            });
    }, []);

    const navigate = useNavigate();

    const [job, setJob] = useState({
        company: data?.company || '',
        jobtitle: '',
        startdate: '',
        enddate: '',
        salary: '',
        companylogo: null, // Use null instead of an empty string
        location: '',
        experience: '',
        skills: '',
        description: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('company', data.company);
        formData.append('jobtitle', job.jobtitle);
        formData.append('startdate', job.startdate);
        formData.append('enddate', job.enddate);
        formData.append('salary', job.salary);
        formData.append('companylogo', job.companylogo);
        formData.append('location', job.location);
        formData.append('experience', job.experience);
        formData.append('skills', job.skills);
        formData.append('description', job.description);

        axios.post('http://localhost:8081/addJob', formData)
            .then(result => {
                alert("Job Added Successfully");
                navigate('/recruiterJobList');
            })
            .catch(err => {
                console.log(err);
                alert("Error adding job");
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setJob(prevJob => ({
            ...prevJob,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        setJob(prevJob => ({
            ...prevJob,
            companylogo: event.target.files[0], // Set the file object, not the file name
        }));
    };

    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Add Job !</h4>
            </marquee>
            <hr />
            <div className="container-fluid px-0" style={{ margin: '2rem 0' }}>
                <div className="container position-relative wow fadeInUp" data-wow-delay="0.1s" style={{ margintop: '-6rem' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className=" text-center p-5" style={{ backgroundColor: 'lightblue' }}>
                                <form >
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Company Name"
                                                    name="company"
                                                    value={data.company}
                                                    onChange={handleInputChange}
                                                    readOnly
                                                />

                                                <label htmlFor="name">Company Name.</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="title" placeholder="Job Title" name="jobtitle"
                                                    value={job.jobtitle}
                                                    onChange={handleInputChange}
                                                    required />
                                                <label for="title">Job Title.</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="date" placeholder="Start Date" name="startdate"
                                                    value={job.startdate}
                                                    onChange={handleInputChange}
                                                    required />
                                                <label for="date">Start Date.</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="date" placeholder="End Date" name="enddate"
                                                    value={job.enddate}
                                                    onChange={handleInputChange}
                                                    required />
                                                <label for="date">End Date.</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="salary" placeholder="Salary" name="salary"
                                                    value={job.salary}
                                                    onChange={handleInputChange}
                                                    required />
                                                <label for="salary">Salary.</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="company"
                                                    placeholder="Company Logo"
                                                    onChange={handleImageChange}
                                                    required
                                                />
                                                <label for="company">Company Logo.</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="location" placeholder="Location" name="location"
                                                    value={job.location}
                                                    onChange={handleInputChange}
                                                    required />
                                                <label for="location">Location.</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="experience" placeholder="Experience" name="experience"
                                                    value={job.experience}
                                                    onChange={handleInputChange}
                                                    required />
                                                <label for="experience">Experience.</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="skills" placeholder="Skills" name="skills"
                                                    value={job.skills}
                                                    onChange={handleInputChange}
                                                    required />
                                                <label for="skills">Skills.</label>
                                            </div>
                                        </div>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            placeholder="Description"
                                            name="description"
                                            value={job.description}
                                            onChange={handleInputChange}
                                            required
                                        />

                                        <div className="col-12">
                                            <button className="btn btn-success w-100 py-3" type="submit" value="Submit" onClick={handleSubmit}>Submit</button>
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

export default AddJob