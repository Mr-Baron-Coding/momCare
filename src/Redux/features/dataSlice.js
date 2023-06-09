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
        messagesData: [],
        tabScreen: 0
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
        addReviewToList: (state, action) => {
            state.reviewsData = [...state.reviewsData, action.payload];
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
        //save messages threds
        saveMessageData: (state, action) => {
            state.messagesData = action.payload;
        },
        //start convo and add to mess data
        startMessNAddToMessData: (state, action) => {
            state.messagesData = [...state.messagesData, action.payload];
        },
        //add to convo
        addMessageData: (state, action) => {
            console.log(action.payload);
            let selectedMess = state.messagesData.filter(mess => mess.messageThreadID === action.payload.key);
            selectedMess[0].body = action.payload.body;
            let notSelected = state.messagesData.filter(mess => mess.messageThreadID !== action.payload.key);
            notSelected.push(selectedMess[0]);
            state.messagesData = notSelected;
        },
        //change tab screen
        changetabScreen: (state, action) => {
            state.tabScreen = action.payload;
        }
    }
})

export const { 
    saveUserData, 
    saveProvidersData, 
    saveSelectedProvider, 
    saveSelectedCareField, 
    saveSelectedReview, 
    editSelectedReview, 
    saveReviewsData, 
    editReviewData, 
    saveLikedata, 
    saveMessageData,
    addReviewToList,
    startMessNAddToMessData,
    addMessageData,
    changetabScreen
 } = dataSlice.actions;
export default dataSlice.reducer;