import { createSlice } from "@reduxjs/toolkit";

const Movieslice = createSlice({
    name:'movietoggle',
    initialState:{
        togglemovie : false,
        togglecategory : false,
        type1 : 'movie'
    },
    reducers :{
        togglemovie : (state) =>{
            state.togglemovie = !state.togglemovie
        },
        togglecategory : (state) =>{
              state.togglecategory = !state.togglecategory
        },
        type1 : (state, action) => {
            state.type1 = action.payload
        }
        
    }
})

export default Movieslice.reducer
export const {togglemovie , togglecategory, type1} = Movieslice.actions

// issue is when user click on recommendation it reload the entire page wherever reloads  happen it changes the global state now . the solution is save the user preference on loacal storage 