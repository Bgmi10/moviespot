import { configureStore } from "@reduxjs/toolkit";
import Chatslice from "./Chatslice";
import searchslice from "./Searchcacheslice";





const store = configureStore({
   reducer:{
    chat:Chatslice,
    cache : searchslice,
    
  
   }
})

export default store