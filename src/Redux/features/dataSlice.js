import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'database',
    initialState: {
        userData: {},
        providersData: [],
        selectedProvider: {},
        selectedCareField: '',
        selectedReviw: {},
        reviewsData: [],
        likeData: [],
        messagesData: []
    },
    reducers: {
        saveUserData: (state, action) => {
            state.userData = action.payload;
        },
        saveProvidersData: (state,action) => {
            state.providersData = action.payload;
        },
        saveSelectedProvider: (state,action) => {
            state.selectedProvider = action.payload;
        },
        saveSelectedCareField: (state, action) => {
            state.selectedCareField = action.payload;
        },
        saveSelectedReview: (state, action) => {
            state.selectedReviw = action.payload;
        },
        editSelectedReview: (state, action) => {
            state.selectedReviw = {...state.selectedReviw, selectedField: action.payload.selectedField, reviewBody: action.payload.reviewField, reviewScore: action.payload.reviewScore};
        },
        saveReviewsData: (state,action) => {
            state.reviewsData = action.payload;
        },
        editReviewData: (state, action) => {
            state.reviewsData.map((reviews, index) => {
                console.log(action.payload);
                if ( reviews.reviewID === action.payload.reviewID) {
                    let ob = {...reviews, selectedField: action.payload.selectedField, reviewBody: action.payload.reviewBody, reviewScore: action.payload.reviewScore};
                    console.log(ob);
                    return (
                        state.reviewsData[index] = ob
                    )
                }
            })
        },
        saveLikedata: (state, action) => {
            state.likeData = action.payload;
        },
        saveMessageData: (state, action) => {
            state.messagesData = action.payload;
        }
    }
})

export const { saveUserData, saveProvidersData, saveSelectedProvider, saveSelectedCareField, saveSelectedReview, editSelectedReview, saveReviewsData, editReviewData, saveLikedata, saveMessageData } = dataSlice.actions;
export default dataSlice.reducer;