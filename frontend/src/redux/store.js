import { configureStore } from "@reduxjs/toolkit";
import Themeslice from "./themeSlice";
import Movieslice from "./movieSlice";
import feedbackFormsubmissionslice from "./feedbackFormsubmissionslice";
import cacheSliderSlice from "./cacheSliderSlice";
import cacheSectionSlice from "./cacheSectionSlice";
import cacheSearchSlice from "./cacheSearchSlice";

const store = configureStore({
   reducer: {
    theme: Themeslice,
    movietoggle: Movieslice,
    feedbackformsubmission: feedbackFormsubmissionslice,
    cacheSlider: cacheSliderSlice,
    cacheSection: cacheSectionSlice,
    cacheSearch: cacheSearchSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: ['cacheSlider/addItemToMovieSlider', 'cacheSlider/addItemToSeriesSlider', 'cacheSlider/addItemToSliderDetail', 'cacheSection/addItemToMoviesSection', 'cacheSection/addItemToSeriesSection', 'cacheSection/addItemToSectionDetailPage', 'cacheSearch/addItemToSearchCache'],
         ignoredPaths: ['cacheSlider.moviesSlider', 'cacheSlider.seriesSlider', 'cacheSlider.sliderDetail', 'cacheSection.moviesSections', 'cacheSection.seriesSections', 'cacheSection.sectionDetailPage', 'cacheSearch'],
      }
   })
})

export default store