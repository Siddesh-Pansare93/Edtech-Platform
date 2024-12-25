import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    bannerImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    paid: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number
    },
    validity: {
        type: String
    },
    sections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    isPublished: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })


export default Course = mongoose.Model("Course", courseSchema)