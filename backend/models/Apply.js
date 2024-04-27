const mongoose =require('mongoose')

const ApplySchema = new mongoose.Schema({
    jobId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pdf: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const ApplyModel = mongoose.model("Apply", ApplySchema)
module.exports = ApplyModel