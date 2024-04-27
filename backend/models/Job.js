const mongoose =require('mongoose')

const JobSchema = new mongoose.Schema({
    recruiterId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter'
    },
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company: String,
    jobtitle: String,
    startdate: String,
    enddate: String,
    salary: String,
    location: String,
    experience: String,
    skills: String,
    description: String,
    companylogo: String,
    active: {
        type: Boolean,
        default: true, // Default value set to false
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const JobModel = mongoose.model("Job", JobSchema)
module.exports = JobModel