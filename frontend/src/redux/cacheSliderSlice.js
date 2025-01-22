import { createSlice } from "@reduxjs/toolkit";

const cacheSliderSlice = createSlice({
    name: "cacheSlider",
    initialState: {
        moviesSlider: null,
        seriesSlider: null,
        sliderDetail: []
    },
    reducers: {
        addItemToMovieSlider: (state, action) => {
           state.moviesSlider = action.payload;
        },
        addItemToSeriesSlider: (state, action) => {
            state.seriesSlider = action.payload;
        },
        addItemToSliderDetail: (state, action) => {
           state.sliderDetail = [...state.sliderDetail, ...action.payload]
        }
    }
});

export const { addItemToMovieSlider, addItemToSeriesSlider, addItemToSliderDetail } = cacheSliderSlice.actions;
export default cacheSliderSlice.reducer; 