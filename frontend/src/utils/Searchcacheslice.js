import { createSlice } from "@reduxjs/toolkit";


const searchslice = createSlice({
    name:"searchcache",
    initialState:{},
    reducers:{
        cacheresults: (state, action) =>{
            const b  = Object.assign(state,action.payload)
            return b 
            // merging {} with search query and results
        }
    }
})

export default searchslice.reducer

export const {cacheresults} = searchslice.actions