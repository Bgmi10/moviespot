import { createSlice } from "@reduxjs/toolkit";

const cacheSearchSlice = createSlice({
    name: "cacheSearch",
    initialState: {
        searchCache: {},
        searchDetailPageCache: []
    },
    reducers: {
        addItemToSearchCache: (state, action) => {
           const { userQuery, data } = action.payload;
           state.searchCache[userQuery] = data;
        },
        addItemToSearchDetailPageCache: (state, action) => {
            state.searchDetailPageCache = [...state.searchDetailPageCache, ...action.payload];
        }
    }   
});

export default cacheSearchSlice.reducer;
export const { addItemToSearchCache, addItemToSearchDetailPageCache } = cacheSearchSlice.actions;
