import { createSlice } from "@reduxjs/toolkit";


const feedbackFormsubmissionslice = createSlice({
    name : 'feedbackformsubmission',

    initialState : false,

    reducers  : {

        updation : (state) =>{
             return  !state 
        } 

    }
})

export default feedbackFormsubmissionslice.reducer

export const {updation} = feedbackFormsubmissionslice.actions