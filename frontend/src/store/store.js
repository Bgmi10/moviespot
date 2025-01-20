import { configureStore } from "@reduxjs/toolkit";
import Chatslice from "./chatSlice";
import Themeslice from "./themeSlice";
import Movieslice from "./movieSlice";
import feedbackFormsubmissionslice from "./feedbackFormsubmissionslice";
import searchCacheSlice from "./searchCacheSlice";
import CacheSliderSlice from "./cacheSliderSlice";

const store = configureStore({
   reducer: {
    chat: Chatslice,
    cache: searchCacheSlice,
    theme: Themeslice,
    movietoggle: Movieslice,
    feedbackformsubmission: feedbackFormsubmissionslice,
    cacheSlider: CacheSliderSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: ['cacheSlider/addItemToMovieSlider', 'cacheSlider/addItemToSeriesSlider', 'cacheSlider/addItemToSliderDetail'],
         ignoredPaths: ['cacheSlider.moviesSlider', 'cacheSlider.seriesSlider', 'cacheSlider.sliderDetail'],
      }
   })
})

export default store