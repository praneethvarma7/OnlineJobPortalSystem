import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChangeStatus = () => {
    const { id } = useParams();
    const [data, setData] = useState({
      firstname: '',
      status: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchRecruiterData = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/getRecruiter/${id}`);
          if (response.data) {
            setData(response.data);
          } else {
            setError('Error fetching Recruiter data');
          }
        } catch (error) {
          console.error('An error occurred while fetching Recruiter data:', error);
          setError('Error fetching Recruiter data');
        }
      };
  
      fetchRecruiterData();
    }, [id]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      axios.put(`http://localhost:8081/updateRequest/${id}`, {
        status: data.status,
      })
      .then((res) => {
        if (res.data.status === 'Success') {
          alert('Update successful');
          navigate('/');
        }
      })
      .catch((err) => console.error('Error updating request:', err));
    };
  
    return (
        <div>
            <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
                <h4 style={{ fontFamily: 'Monotype Corsiva' }}>Change Status !</h4>
            </marquee>
            <hr />
            <div className="container-fluid px-0" style={{ margin: '2rem 0' }}>
                <div className="container position-relative wow fadeInUp" data-wow-delay="0.1s" style={{ margintop: '-6rem' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className=" text-center p-5" style={{ backgroundColor: 'lightblue' }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-12">
                                            <input type="text" className="form-control border-0" name='firstname' placeholder="Recruiter Name" value={data.firstname} style={{ height: '55px' }} readOnly />
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <select
                                                className="form-control"
                                                id="status"
                                                name="status"
                                                value={data.status}
                                                required
                                                onChange={(e) => setData({ ...data, status: e.target.value })}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Accepted">Accepted</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
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
    );
}

export default ChangeStatus;
