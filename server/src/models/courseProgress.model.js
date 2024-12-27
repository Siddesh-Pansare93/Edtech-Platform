import mongoose from "mongoose"

const courseProgressSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
})

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema)