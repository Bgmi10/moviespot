import { configureStore } from "@reduxjs/toolkit";
import Chatslice from "./Chatslice";
import searchslice from "./Searchcacheslice";
import Themeslice from "./Themeslice";
import Movieslice from "./Movieslice";


const store = configureStore({
   reducer:{
    chat:Chatslice,
    cache : searchslice,
    theme : Themeslice,
    movietoggle : Movieslice 
    
  
   }
})

export default store