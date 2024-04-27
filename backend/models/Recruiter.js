const mongoose =require('mongoose')

const RecruiterSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    contact: String,
    company: String,
    email: String,
    password: String,
    recruiterimage: String,
    gender: String,
    status: {
        type: String,
        default: "Pending", // Default value set to false
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const RecruiterModel = mongoose.model("Recruiter", RecruiterSchema)
module.exports = RecruiterModel