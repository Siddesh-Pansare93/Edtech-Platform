import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "instructor"]
    },
    skillLevel: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    refreshToken: {
        type: String,
        required: true
    }
}, { timestamps: true })


userSchema.pre("save", async function (params) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.isPassWordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiry: process.env.ACCESS_TOKEN_EXPIRY,
        }

    )
}
userSchema.methods.generaterRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiry: process.env.REFRESH_TOKEN_EXPIRY,
        }

    )
}

export const User = mongoose.model("User", userSchema)