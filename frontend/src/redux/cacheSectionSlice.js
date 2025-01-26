import { createSlice } from "@reduxjs/toolkit";

const cacheSectionSlice = createSlice({
    name: "cacheSection",
    initialState: {
        moviesSections: {},
        seriesSections: {},
        sectionDetailPage: [],
        sectionPage: {}
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
        }, 
        addItemToSectionPage: (state, action) => {
            const { sectionTitle, data } = action.payload;
            state.sectionPage[sectionTitle] = data;
        }
    }
});

export default cacheSectionSlice.reducer;
export const { addItemToMoviesSection, addItemToSeriesSection, addItemToSectionDetailPage, addItemToSectionPage } = cacheSectionSlice.actions;

