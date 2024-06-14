import { createSlice } from "@reduxjs/toolkit";

const themeslice = createSlice({
    name : "theme",
    initialState : {
        toggletheme : true
    } , 
    reducers : { 
        toggletheme : (state ) =>{
            state.toggletheme = !state.toggletheme
        }
    }
})

export default themeslice.reducer
export const {toggletheme } = themeslice.actions

