const mongoose =require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    contact: String,
    email: String,
    password: String,
    image: String,
    gender: String,
    active: {
        type: Boolean,
        default: true, // Default value set to false
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel