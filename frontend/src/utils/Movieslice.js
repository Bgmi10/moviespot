import { createSlice } from "@reduxjs/toolkit";

const Movieslice = createSlice({
    name:'movietoggle',
    initialState:{
        togglemovie : false,
        togglecategory : false
    },
    reducers :{
        togglemovie : (state) =>{
            state.togglemovie = !state.togglemovie
        },
        togglecategory : (state) =>{
              state.togglecategory = !state.togglecategory
        }
    }
})

export default Movieslice.reducer
export const {togglemovie , togglecategory} = Movieslice.actions

// issue is when user click on recommendation it reload the entire page wherever reloads  happen it changes the global state now . the solution is save the user preference on loacal storage 