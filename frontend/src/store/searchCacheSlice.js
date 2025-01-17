import { createSlice } from "@reduxjs/toolkit";

const searchCacheSlice = createSlice({
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

export default searchCacheSlice.reducer;
export const {cacheresults} = searchCacheSlice.actions