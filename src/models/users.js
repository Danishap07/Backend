import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number,
        Editor: Number
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String
    },
    mobile_no: {
        type: String
    },
    refresh_token: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    otp: String,
    otp_expiry: Date,
    active: {
        type:Boolean,
        default: false
    }
    
})

export default mongoose.model("User", userSchema)

