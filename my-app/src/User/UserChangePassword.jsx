import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const changePassword = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Make a POST request to your changePassword endpoint
    axios
      .put(
        "http://localhost:8081/userChangePassword",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200 && response.data.message === "Password changed successfully") {
          alert("Password changed successfully!");
          navigate("/userLogin");
        } else {
          alert("An error occurred during password change.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          console.error("Error:", error.message);
        }
      });
  };
  return (
    <div>
      <marquee style={{ height: '35px', backgroundColor: 'lightblue', fontWeight: 'bold', marginTop: '1%' }}>
        <h4 style={{ fontFamily: 'Monotype Corsiva' }}> User Change Password !</h4>
      </marquee>
      <hr />
      <div className="container-fluid px-0" style={{ margin: '2rem 0' }}>
        <div className="container position-relative wow fadeInUp" data-wow-delay="0.1s" style={{ margintop: '-6rem' }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className=" text-center p-5" style={{ backgroundColor: 'lightblue' }}>
                <form>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Current Password" name=""
                          value={currentPassword}
                          onChange={(event) => {
                            setCurrentPassword(event.target.value);
                          }} />

                        <label for="contact">Current Password.</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="New Password" name=""
                          value={newPassword}
                          onChange={(event) => {
                            setNewPassword(event.target.value);
                          }} />

                        <label for="contact">New Password.</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Confirm Password" name=""
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfirmPassword(event.target.value);
                          }} />

                        <label for="contact">Confirm Password.</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-success w-100 py-3" type="submit" value="Submit" onClick={changePassword}>Submit</button>
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

export default UserChangePassword