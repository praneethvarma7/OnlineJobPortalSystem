const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const AdminModel = require('./models/Admin');
const UserModel = require('./models/User');
const JobModel = require('./models/Job');
const ApplyModel = require('./models/Apply');
const RecruiterModel = require('./models/Recruiter');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }
));
app.use(cookieParser());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})

const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/pdf');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    cb(null, uniqueSuffix + fileExtension);
  },
});

const pdfUpload = multer({
  storage: pdfStorage,
});

const upload = multer({
  storage: storage
})

mongoose.connect('mongodb://127.0.0.1:27017/OnlineJobPortal_React');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "The token was not available" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        console.error(err);
        return res.json({ Error: "Token is wrong" });
      }
      console.log('Decoded Token:', decoded);
      req.role = decoded.role;
      req.id = decoded.id;
      req.username = decoded.username;
      req.firstname = decoded.firstname;
      req.status = decoded.status;
      next();
    });
  }
};

app.get('/home', verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id, username: req.username, firstname: req.firstname, })
})

// Start Admin All code *****

app.post('/adminLogin', (req, res) => {
  const { username, password } = req.body;

  AdminModel.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: 'Incorrect password.' });
      }

      const token = jwt.sign(
        { role: 'admin', id: user._id, username: user.username },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );

      res.cookie("token", token);

      res.json({ message: "Login successful", username: user.username });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Database error.' });
    });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: 'Logout successful' });
});

app.put('/changePassword', verifyUser, (req, res) => {
  const userId = req.id;
  const { currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid admin ID.' });
  }

  AdminModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Admin not found.' });
      }

      // Compare the provided current password with the stored password (not recommended)
      if (currentPassword !== user.password) {
        return res.status(400).json({ error: 'Current password is incorrect.' });
      }

      // Update the user's password with the new password (not recommended)
      user.password = newPassword;
      user.save()
        .then((updatedUser) => {
          // Password changed successfully
          res.status(200).json({ message: 'Password changed successfully' });
        })
        .catch((saveErr) => {
          console.error(saveErr);
          res.status(500).json({ error: 'Admin update failed.' });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Password change failed.' });
    });
});

app.get("/viewUser", (req, res) => {
  UserModel.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve User data" });
    });
});

app.delete('/deleteviewUser/:id', async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID.' });
  }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json({ Status: 'Success', message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete User.' });
  }
});

app.post("/userSignup", upload.single("image"), (req, res) => {
  const {
    firstname,
    lastname,
    contact,
    email,
    password,
    gender,
  } = req.body;

  UserModel.findOne({ $or: [{ email: email }] })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with the same firstname already exists." });
      }

      bcrypt
        .hash(password, 10)
        .then((hash) => {
          const image = req.file ? req.file.filename : null; // Get the adharImage filename

          const newUser = new UserModel({
            firstname,
            lastname,
            contact,
            email,
            password: hash,
            image,
            gender,
          });

          newUser
            .save()
            .then((savedUser) => {
              res.json(savedUser);
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: "User registration failed." });
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "User registration failed." });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "User registration failed." });
    });
});

app.post("/userLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check in the UserModel
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = jwt.sign(
      {
        role: 'user',
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        active: user.active,
      },
      "jwt-secret-key",
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.json({ message: "Login successful",email: user.email, firstname: user.firstname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error." });
  }
});

app.get("/userHome", verifyUser, async (req, res) => {
  const userId = req.id;
  try {
    const user = await UserModel.findOne({ _id: userId });
    res.json({ Status: "Success", Result: user });
  } catch (error) {
    res.status(500).json({ Status: "Error", Error: error.message });
  }
});

app.put('/userProfile', verifyUser, upload.single('image'), async (req, res) => {
  const userId = req.id;
  const { firstname, lastname, contact, email, gender } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        firstname,
        lastname,
        contact,
        email,
        gender,
        image,
      },
      { new: true, upsert: true }
    );
    res.json({ Status: 'Success', Result: user });
  } catch (error) {
    res.status(500).json({ Status: 'Error', Error: error.message });
  }
});

app.put('/userChangePassword', verifyUser, (req, res) => {
  const userId = req.id;
  const { currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID.' });
  }

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      bcrypt.compare(currentPassword, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Password comparison failed.' });
        }

        if (!result) {
          return res.status(400).json({ error: 'Current password is incorrect.' });
        }

        bcrypt.hash(newPassword, 10, (hashErr, hash) => {
          if (hashErr) {
            return res.status(500).json({ error: 'Password hashing failed.' });
          }

          user.password = hash;
          user.save()
            .then((updatedUser) => {
              // Password changed successfully
              res.status(200).json({ message: 'Password changed successfully' });
            })
            .catch((saveErr) => {
              console.error(saveErr);
              res.status(500).json({ error: 'User update failed.' });
            });
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Password change failed.' });
    });
});

app.get("/userJobList", verifyUser, async (req, res) => {
  try {
    const userId = req.id;
    const jobs = await JobModel.find({});
    const appliedJobs = await ApplyModel.find({ userId });
    const appliedJobIds = new Set(appliedJobs.map((apply) => apply.jobId.toString()));

    const jobsWithApplicationStatus = jobs.map((job) => ({
      ...job.toObject(),
      applied: appliedJobIds.has(job._id.toString()),
    }));

    res.json(jobsWithApplicationStatus);
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    res.status(500).json({ error: "Failed to retrieve Job data" });
  }
});

app.get("/jobDetails/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const job = await JobModel.findById(id);
    if (!job) {
      return res.status(404).json({ error: "job not found." });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

app.post("/recruiterSignup", upload.single("recruiterimage"), (req, res) => {
  const {
    firstname,
    lastname,
    contact,
    company,
    email,
    password,
    gender,
  } = req.body;

  RecruiterModel.findOne({ $or: [{ email: email }] })
    .then((existingRecruiter) => {
      if (existingRecruiter) {
        return res
          .status(400)
          .json({ error: "Recruiter with the same firstname already exists." });
      }

      bcrypt
        .hash(password, 10)
        .then((hash) => {
          const recruiterimage = req.file ? req.file.filename : null; // Get the adharImage filename

          const newRecruiter = new RecruiterModel({
            firstname,
            lastname,
            contact,
            company,
            email,
            password: hash,
            recruiterimage,
            gender,
          });

          newRecruiter
            .save()
            .then((savedRecruiter) => {
              res.json(savedRecruiter);
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: "Recruiter registration failed." });
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Recruiter registration failed." });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Recruiter registration failed." });
    });
});

app.post('/recruiterLogin', async (req, res) => {
  try {
      const { email, password } = req.body;
      const recruiter = await RecruiterModel.findOne({ email });

      if (!recruiter) {
          return res.status(404).json({ error: 'Recruiter not found.' });
      }

      if (recruiter.status === 'Pending') {
          return res.status(401).json({ status: 'Pending', message: 'Your Login Status is pending.' });
      }

      const isPasswordValid = await bcrypt.compare(password, recruiter.password);

      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Incorrect password.' });
      }

      const token = jwt.sign(
          {
              role: 'recruiter',
              id: recruiter._id,
              email: recruiter.email, 
              firstname: recruiter.firstname,
              status: recruiter.status,
          },
          'jwt-secret-key',
          { expiresIn: '1d' }
      );

      res.cookie('token', token);

      return res.json({
          message: 'Login successful',
          firstname: recruiter.firstname,
          status: recruiter.status,
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error occurred while logging in' });
  }
});

app.get('/recruiterList', async (req, res) => {
  const action = req.query.action;

  const validActions = ['Pending', 'Accepted', 'Rejected', 'All'];
  if (!validActions.includes(action)) {
      return res.status(400).json({ Status: 'Error', Message: 'Invalid action parameter.' });
  }

  let query = {};
  if (action !== 'All') {
      query = { status: action };
  }

  try {
      const result = await RecruiterModel.find(query);
      return res.status(200).json({ Status: 'Success', Result: result });
  } catch (error) {
      console.error('Error fetching recruiter list:', error);
      return res.status(500).json({ Status: 'Error', Message: 'An error occurred while fetching the recruiter list.' });
  }
});

app.get('/getRecruiter/:id', async (req, res) => {
  const recruiterId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
    return res.status(400).json({ error: 'Invalid recruiter ID' });
  }
  try {
    const recruiter = await RecruiterModel.findById(recruiterId);

    if (!recruiter) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }

    return res.status(200).json(recruiter);
  } catch (error) {
    console.error('Error fetching recruiter:', error);
    return res.status(500).json({ error: `An error occurred while fetching the recruiter: ${error.message}` });
  }
});

app.put('/updateRequest/:id', async (req, res) => {
  const recruiterId = req.params.id;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
    return res.status(400).json({ error: 'Invalid recruiter ID' });
  }

  try {
    const updatedRecruiter = await RecruiterModel.findByIdAndUpdate(
      recruiterId,
      { $set: { status } },
      { new: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }

    res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.error('Error updating recruiter:', error);
    res.status(500).json({ error: `An error occurred while updating the recruiter: ${error.message}` });
  }
});

app.get('/userCount', async (req, res) => {
  try {
    const userCount = await UserModel.countDocuments();
    res.json([{ user: userCount }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/recruiterCount', async (req, res) => {
  try {
    const recruiterCount = await RecruiterModel.countDocuments();
    res.json([{ recruiter: recruiterCount }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/jobCount', async (req, res) => {
  try {
    const jobCount = await JobModel.countDocuments();
    res.json([{ job: jobCount }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/applyJobCount', async (req, res) => {
  try {
    const applyJobCount = await ApplyModel.countDocuments();
    res.json([{ apply: applyJobCount }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteRecruiterList/:id', async (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ error: 'Invalid job ID.' });
  }

  try {

    await JobModel.deleteMany({ apid: jobId });

    const deletedJobList = await JobModel.findByIdAndDelete(jobId);

    if (!deletedJobList) {
      return res.status(404).json({ error: 'Job not found.' });
    }

    res.status(200).json({ Status: 'Success', message: 'Job,  deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete Job, items.' });
  }
});

app.get("/recruiterHome", verifyUser, async (req, res) => {
  const recruiterId = req.id;
  try {
    const recruiter = await RecruiterModel.findOne({ _id: recruiterId });
    res.json({ Status: "Success", Result: recruiter });
  } catch (error) {
    res.status(500).json({ Status: "Error", Error: error.message });
  }
});

app.put('/recruiterProfile', verifyUser, upload.single('recruiterimage'), async (req, res) => {
  const recruiterId = req.id;
  const { firstname, lastname, contact, company, email, gender } = req.body;
  const recruiterimage = req.file ? req.file.filename : req.body.recruiterimage;

  try {
    const recruiter = await RecruiterModel.findOneAndUpdate(
      { _id: recruiterId },
      {
        firstname,
        lastname,
        contact,
        company,
        email,
        gender,
        recruiterimage,
      },
      { new: true, upsert: true }
    );
    res.json({ Status: 'Success', Result: recruiter });  // Fixed the reference to 'recruiter'
  } catch (error) {
    res.status(500).json({ Status: 'Error', Error: error.message });
  }
});

app.put('/recruiterChangePassword', verifyUser, (req, res) => {
  const recruiterId = req.id;
  const { currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
    return res.status(400).json({ error: 'Invalid recruiter ID.' });
  }

  RecruiterModel.findById(userId)
    .then((recruiter) => {
      if (!recruiter) {
        return res.status(404).json({ error: 'Recruiter not found.' });
      }

      bcrypt.compare(currentPassword, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Password comparison failed.' });
        }

        if (!result) {
          return res.status(400).json({ error: 'Current password is incorrect.' });
        }

        bcrypt.hash(newPassword, 10, (hashErr, hash) => {
          if (hashErr) {
            return res.status(500).json({ error: 'Password hashing failed.' });
          }

          recruiter.password = hash;
          recruiter.save()
            .then((updatedRecruiter) => {
              // Password changed successfully
              res.status(200).json({ message: 'Password changed successfully' });
            })
            .catch((saveErr) => {
              console.error(saveErr);
              res.status(500).json({ error: 'Recruiter update failed.' });
            });
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Password change failed.' });
    });
});

app.post('/addJob', verifyUser, upload.single('companylogo'), async (req, res) => {
  try {
    const {
      company,
      jobtitle,
      startdate,
      enddate,
      salary,
      location,
      experience,
      skills,
      description,
    } = req.body;
    const recruiterId = req.id;
    const companylogo = req.file ? req.file.filename : null;

    const newJob = await JobModel.create({
      company,
      jobtitle,
      startdate,
      enddate,
      salary,
      location,
      experience,
      skills,
      description,
      companylogo,
      recruiterId,
    });

    res.json(newJob);
  } catch (error) {
    console.error('Job creation failed:', error);
    res.status(500).json({ error: 'Job creation failed' });
  }
});


app.get("/recruiterJobList", verifyUser, (req, res) => {
  const recruiterId = req.id;
  JobModel.find({ recruiterId:recruiterId })
    .then((job) => {
      console.log("Jobs found:", job);
      res.json(job);
    })
    .catch((err) => {
      console.error("Error retrieving jobs:", err);
      res.status(500).json({ error: "Failed to retrieve Job data" });
    });
});

app.get('/applyJobList', verifyUser, async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await JobModel.find({ recruiterId });
    const jobIds = jobs.map(job => job._id);

    const applications = await ApplyModel.find({ jobId: { $in: jobIds } })
      .populate('userId', ['firstname', 'lastname', 'email', 'contact'])
      .populate('jobId', ['jobtitle', 'company']);

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve Job data' });
  }
});


app.get("/latestJob", (req, res) => {
  JobModel.find({ })
    .then((job) => {
      console.log("Jobs found:", job);
      res.json(job);
    })
    .catch((err) => {
      console.error("Error retrieving jobs:", err);
      res.status(500).json({ error: "Failed to retrieve Job data" });
    });
});

app.delete('/deleteJobList/:id', async (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ error: 'Invalid job ID.' });
  }

  try {

    await JobModel.deleteMany({ apid: jobId });

    const deletedJobList = await JobModel.findByIdAndDelete(jobId);

    if (!deletedJobList) {
      return res.status(404).json({ error: 'Job not found.' });
    }

    res.status(200).json({ Status: 'Success', message: 'Job,  deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete Job, items.' });
  }
});

app.post('/jobApply/:jobId', verifyUser, pdfUpload.single('pdf'), async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.jobId;
    const pdf = req.file ? req.file.filename : null;

    const newApply = await ApplyModel.create({
      pdf,
      userId,
      jobId,
    });

    res.json(newApply);
  } catch (error) {
    console.error('Apply creation failed:', error);
    res.status(500).json({ error: 'Apply creation failed' });
  }
});

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});