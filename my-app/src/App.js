import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './auth';
import Index from "./Components/Index";
import IndexHome from "./Components/IndexHome";
import AdminLogin from "./Components/AdminLogin";
import RecruiterLogin from "./Components/RecruiterLogin";
import RecruiterSignup from "./Components/RecruiterSignup";
import UserLogin from "./Components/UserLogin";
import UserSignup from "./Components/UserSignup";
import LatestJob from "./Components/LatestJob";
import Contact from "./Components/Contact";
import Home from "./Admin/Home";
import UserHome from "./User/UserHome";
import UserProfile from "./User/UserProfile";
import UserChangePassword from "./User/UserChangePassword";
import PrivateRoute from "./PrivateRoute";
import UserJobList from './User/UserJobList';
import RecruiterHome from './Recruiter/RecruiterHome';
import RecruiterProfile from './Recruiter/RecruiterProfile';
import RecruiterChangePassword from './Recruiter/RecruiterChangePassword';
import AddJob from './Recruiter/AddJob';
import RecruiterJobList from './Recruiter/RecruiterJobList';
import ApplyJobList from './Recruiter/ApplyJobList';
import ChangePassword from './Admin/ChangePassword';
import ViewUser from './Admin/ViewUser';
import JobDetails from './User/JobDetails';
import JobApply from './User/JobApply';
import PendingRecruiter from './Admin/PendingRecruiter';
import ChangeStatus from './Admin/ChangeStatus';

function App() {
  return (
<AuthProvider>
    <Routes>
      <Route path="/" element={<Index />} >
        <Route path="" element={<IndexHome />} />
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/changePassword'element={<ChangePassword />} />
        <Route path='/viewUser'element={<ViewUser />} />
        <Route path='/pendingRecruiter'element={<PendingRecruiter />} />
        <Route path='/changeStatus/:id'element={<ChangeStatus />} />
        <Route path='/recruiterLogin' element={<RecruiterLogin />}></Route>
        <Route path='/recruiterSignup' element={<RecruiterSignup />}></Route>
        <Route path='/userLogin' element={<UserLogin />}></Route>
        <Route path='/userSignup' element={<UserSignup />}></Route>
        <Route path='/latestJob' element={<LatestJob />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/home' element={<Home />} />
        <Route path='/recruiterHome' element={<RecruiterHome />} />
        <Route path='/recruiterProfile/:id' element={<RecruiterProfile />} />
        <Route path='/recruiterChangePassword' element={<RecruiterChangePassword />} />
        <Route path='/addJob' element={<AddJob />} />
        <Route path='/recruiterJobList' element={<RecruiterJobList />} />
        <Route path='/applyJobList' element={<ApplyJobList />} />
        <Route path='/userHome' element={<PrivateRoute element={<UserHome />} />} />
        <Route path='/userProfile/:id'element={<PrivateRoute element={<UserProfile />} />} />
        <Route path='/userChangePassword'element={<PrivateRoute element={<UserChangePassword />} />} />
        <Route path='/userJobList'element={<PrivateRoute element={<UserJobList />} />} />
        <Route exact path='/jobDetails/:id' element={<JobDetails />} />
        <Route exact path='/jobApply/:id' element={<JobApply />} />
        {/* <Route path='/latestJob' element={<LatestJob />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/adminLogin' element={<AdminLogin />}></Route>
      <Route path='/recruiterLogin' element={<RecruiterLogin />}></Route>
      <Route path='/recruiterSignup' element={<RecruiterSignup />}></Route>
      <Route path='/userLogin' element={<UserLogin />}></Route>
      <Route path='/userSignup' element={<UserSignup />}></Route>
      <Route path='/footer' element={<Footer />}/>
      <Route path='/' element={<AdminIndex />}>
      <Route path='' element={<Home />}/> */}
      </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;
