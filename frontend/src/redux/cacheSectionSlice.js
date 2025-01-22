import { createSlice } from "@reduxjs/toolkit";

const cacheSectionSlice = createSlice({
    name: "cacheSection",
    initialState: {
        moviesSections: {},
        seriesSections: {},
        sectionDetailPage: []
    },
    reducers: {
        addItemToMoviesSection: (state, action) => {
            const { sectionName, sectionData } = action.payload;
            
            if (!state.moviesSections[sectionName]) {
                state.moviesSections[sectionName] = [];
            }
            
            state.moviesSections[sectionName] = [
                ...state.moviesSections[sectionName], 
                ...sectionData
            ]
        },
        addItemToSeriesSection: (state, action) => {
            const { sectionName, sectionData } = action.payload;

            if (!state.seriesSections[sectionName]) {
                state.seriesSections[sectionName] = [];
            }

            state.seriesSections[sectionName] = [
                ...state.seriesSections[sectionName],
                ...sectionData
            ]
        },
        addItemToSectionDetailPage: (state, action) => {
          state.sectionDetailPage = [...state.sectionDetailPage, ...action.payload]
        }
    }
});

export default cacheSectionSlice.reducer;
export const { addItemToMoviesSection, addItemToSeriesSection, addItemToSectionDetailPage } = cacheSectionSlice.actions;

