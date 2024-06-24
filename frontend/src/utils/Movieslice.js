import { createSlice } from "@reduxjs/toolkit";

const Movieslice = createSlice({
    name:'movietoggle',
    initialState:{
        togglemovie : false
    },
    reducers :{
        togglemovie : (state) =>{
            state.togglemovie = !state.togglemovie
        }
    }
})

export default Movieslice.reducer
export const {togglemovie} = Movieslice.actions

// issue is when user click on recommendation it reload the entire page wherever reloads  happen it changes the global state now . the solution is save the user preference on loacal storage 