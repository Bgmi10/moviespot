import { createSlice } from "@reduxjs/toolkit";


const getpreference = () => {
     const data = localStorage.getItem('theme')
     
     return data
}
const themeslice = createSlice({
    name : "theme",
    initialState : {
        toggletheme : getpreference()
    } , 
    reducers : { 
        toggletheme : (state ) =>{
            state.toggletheme = !state.toggletheme
           localStorage.setItem('theme' , JSON.stringify(state.toggletheme))
        }
    }
})


export default themeslice.reducer
export const {toggletheme } = themeslice.actions

