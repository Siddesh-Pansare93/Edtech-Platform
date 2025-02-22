import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    enrolledCourses : null , 
    createdCourses : null , 

}


const courseSlice = createSlice({
    name : 'course' ,
    initialState : intialState ,
    reducers : {
        setEnrolledCourses : (state , action) => {
            state.enrolledCourses = action.payload
        },

        setCreatedCourses : (state , action )=>{
            state.createdCourses = action.payload
        }
    }
})

export const {setEnrolledCourses , setCreatedCourses} = courseSlice.actions


export default courseSlice.reducer