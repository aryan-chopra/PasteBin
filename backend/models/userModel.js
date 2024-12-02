import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User must have a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "User must have an email associated with it"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "User must have a password"],
    },
})