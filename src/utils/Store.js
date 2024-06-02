import { configureStore } from "@reduxjs/toolkit";
import Chatslice from "./Chatslice";
import searchslice from "./Searchcacheslice";
import Themeslice from "./Themeslice";


const store = configureStore({
   reducer:{
    chat:Chatslice,
    cache : searchslice,
    theme : Themeslice
    
  
   }
})

export default store