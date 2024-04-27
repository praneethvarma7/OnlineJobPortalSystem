import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecruiterJobList = () => {
  const [job, setJob] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = () => {
    axios
      .get("http://localhost:8081/recruiterJobList")
      .then((response) => {
        console.log("Response data:", response.data);
        setJob(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Job?");
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteJobList/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setJob(job.filter((item) => item._id !== id));
          } else {
            setError("Failed to delete the job. Please try again.");
          }
        })
        .catch((err) => {
          console.log(err);
          setError("An error occurred while deleting the job.");
        });
    }
  };

  return (
    <div>
      <marquee
        style={{
          height: "35px",
          backgroundColor: "lightblue",
          fontWeight: "bold",
          marginTop: "1%",
        }}
      >
        <h4 style={{ fontFamily: "Monotype Corsiva" }}>Job List !</h4>
      </marquee>
      <hr />
      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="card radius-10 overflow-hidden">
              <div className="card-body p-5">
                <div className="table-responsive">
                  <table className="table mb-2">
                    <thead className="btn-dark">
                      <tr>
                        <th>S.No.</th>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Experience</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Post Date</th>
                        <th>Last Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="btn-info">
                          {job.map((x, index) => (
                            <tr key={x._id}>
                              <td>{index + 1}.</td>
                              <td>{x.company}</td>
                              <td>{x.jobtitle}</td>
                              <td>{x.experience}</td>
                              <td>{x.description}</td>
                              <td>{x.location}</td>
                              <td>{x.startdate}</td>
                              <td>{x.enddate}</td>
                              <td>
                                <button
                                  onClick={() => handleDelete(x._id)}
                                  className="btn btn-sm btn-danger btn-block radius-30"
                                >
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
  );
};

export default RecruiterJobList;
