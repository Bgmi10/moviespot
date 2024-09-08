import { configureStore } from "@reduxjs/toolkit";
import Chatslice from "./Chatslice";
import searchslice from "./Searchcacheslice";
import Themeslice from "./Themeslice";
import Movieslice from "./Movieslice";
import feedbackFormsubmissionslice from "./feedbackFormsubmissionslice";
import Idslice from "./Idslice";


const store = configureStore({
   reducer:{
    chat:Chatslice,
    cache : searchslice,
    theme : Themeslice,
    movietoggle : Movieslice,
    feedbackformsubmission : feedbackFormsubmissionslice,
    searchId : Idslice
    
  
   }
})

export default store