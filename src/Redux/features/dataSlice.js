import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'database',
    initialState: {
        userData: {},
        providersData: [],
        reviewsData: [],
        likeData: []
    },
    reducers: {
        saveUserData: (state, action) => {
            state.userData = action.payload;
        },
        saveProvidersData: (state,action) => {
            state.providersData = action.payload;
        },
        saveReviewsData: (state,action) => {
            state.reviewsData = action.payload;
        },
        saveLikedata: (state, action) => {
            state.likeData = action.payload;
        }
    }
})

export const { saveUserData, saveProvidersData, saveReviewsData, saveLikedata } = dataSlice.actions;
export default dataSlice.reducer;