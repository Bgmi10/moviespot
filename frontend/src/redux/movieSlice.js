import { createSlice } from "@reduxjs/toolkit";

const Movieslice = createSlice({
    name:'movietoggle',
    initialState: {
        togglemovie: false,
        togglecategory: false,
        type1: 'movie'
    },
    reducers: {
        togglecategory : (state) =>{
              state.togglecategory = !state.togglecategory
        },
        type1 : (state, action) => {
            state.type1 = action.payload
        }
        
    }
})

export default Movieslice.reducer
export const {togglecategory, type1} = Movieslice.actions
