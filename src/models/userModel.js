import mongoose from "mongoose";

const userSchema = new mongoose.userSchema({
    name: {
        type: String,
        required: [true , "رجاءاً أدخل اسمك الكامل!"]
    },
    email: {
        type: String,
        required: [true , "رجاءاً أدخل الإيميل!"],
        unique: true
    },
    password: {
        type: String,
        required: [true , "رجاءاً أدخل كلمة المرور!"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verfyToken: String,
    verifyTokenExpiry: Date,
    
})

const User = mongoose.models.users || mongoose.model("users" , userSchema );

export default User;