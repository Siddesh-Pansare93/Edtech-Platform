import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    preRequisites : [{
        type: String
    }],
    curriculum  : [{
        type : String , 
        required : true
    }] , 
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
        default : false
    }
}, { timestamps: true })


export const Course = mongoose.model("Course", courseSchema)


