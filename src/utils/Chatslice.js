import { createSlice } from "@reduxjs/toolkit";

const chatslice = createSlice({
    name:"chat",
    initialState:{
        chatmessage : []
    },
    reducers:{
        addmessage : (state, action) =>{
            state.chatmessage.unshift(action.payload)
        },
        removemessage : (state)=>{
            state.chatmessage.splice(20,1)
        }
    }
})

export const {addmessage , removemessage} = chatslice.actions

export default chatslice.reducer