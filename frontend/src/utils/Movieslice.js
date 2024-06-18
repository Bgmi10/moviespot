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