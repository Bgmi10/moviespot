import { createSlice } from "@reduxjs/toolkit";

const Idslice  = createSlice({
    name : 'searchId',
    initialState : null,
    reducers : {
        Id : (state , action) => {
            return action.payload
        }
    }
})


export default Idslice.reducer

export const {Id} = Idslice.actions