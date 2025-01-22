import { configureStore } from "@reduxjs/toolkit";
import Themeslice from "./themeSlice";
import Movieslice from "./movieSlice";
import feedbackFormsubmissionslice from "./feedbackFormsubmissionslice";
import searchCacheSlice from "./searchCacheSlice";
import cacheSliderSlice from "./cacheSliderSlice";
import cacheSectionSlice from "./cacheSectionSlice";

const store = configureStore({
   reducer: {
    cache: searchCacheSlice,
    theme: Themeslice,
    movietoggle: Movieslice,
    feedbackformsubmission: feedbackFormsubmissionslice,
    cacheSlider: cacheSliderSlice,
    cacheSection: cacheSectionSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: ['cacheSlider/addItemToMovieSlider', 'cacheSlider/addItemToSeriesSlider', 'cacheSlider/addItemToSliderDetail', 'cacheSection/addItemToMoviesSection', 'cacheSection/addItemToSeriesSection', 'cacheSection/addItemToSectionDetailPage'],
         ignoredPaths: ['cacheSlider.moviesSlider', 'cacheSlider.seriesSlider', 'cacheSlider.sliderDetail', 'cacheSection.moviesSections', 'cacheSection.seriesSections', 'cacheSection.sectionDetailPage'],
      }
   })
})

export default store