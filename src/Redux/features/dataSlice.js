import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'database',
    initialState: {
        userData: {},
        providersData: [],
        selectedProvidersMessages: {},
        selectedProvider: {},
        selectedCareField: '',
        selectedReviw: {},
        reviewsData: [],
        likeData: [],
        messagesData: [],
        tabScreen: 0,
        headerElement: { isSearchOpen: false }
    },
    reducers: {
        saveUserData: (state, action) => {
            state.userData = action.payload;
        },
        saveProvidersData: (state,action) => {
            state.providersData = action.payload;
        },
        // split the selected providers message thread with the user
        // from the main messages comp
        splitMessages: (state, action) => {
            const selected = state.messagesData.filter(thread => thread.toID === action.payload);
            const unselected = state.messagesData.filter(thread => thread.toID !== action.payload);
            if ( selected.length !== 0 ) {
                console.log(selected);
                state.selectedProvidersMessages = selected[0];
                // state.messagesData = unselected;
            } else {
                state.selectedProvidersMessages = {};
            }
            
        },
        //combine all messages thread
        spliceMessages: (state) => {
            const filtered = state.messagesData.filter(thread => thread.messageThreadID !== state.selectedProvidersMessages.messageThreadID);
            filtered.push(state.selectedProvidersMessages);
            state.messagesData = filtered;
            // state.messagesData = [state.selectedProvidersMessages, ...state.messagesData];
            // state.selectedProvidersMessages = {};
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
                    return (
                        state.reviewsData[index] = ob
                    )
                }
            })
        },
        saveLikedata: (state, action) => {
            state.likeData = action.payload;
        },
        //save messages threads
        saveMessageData: (state, action) => {
            state.messagesData = action.payload;
        },
        //start convo and add to mess data
        startMessNAddToMessData: (state, action) => {
            state.selectedProvidersMessages = action.payload;
            // state.messagesData = [...state.messagesData, action.payload];

        },
        //add to convo
        addMessageData: (state, action) => {
            // console.log(action.payload);
            // let selectedMess = state.messagesData.filter(mess => mess.messageThreadID === action.payload.key);
            // selectedMess[0].body = action.payload.body;
            // let notSelected = state.messagesData.filter(mess => mess.messageThreadID !== action.payload.key);
            // notSelected.push(selectedMess[0]);
            // state.messagesData = notSelected;
            let body = state.selectedProvidersMessages.body;
            body.push(action.payload);
            state.selectedProvidersMessages = {...state.selectedProvidersMessages, body};
        },
        //change tab screen
        changetabScreen: (state, action) => {
            state.tabScreen = action.payload;
        },
        // change header elements
        changeHeaderElements: (state, action) => {
            console.log(action.payload);
            state.headerElement = {...state.headerElement, [action.payload.type]: action.payload.fields }
        }
    }
})

export const { 
    saveUserData, 
    saveProvidersData, 
    splitMessages,
    spliceMessages,
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
    changetabScreen,
    changeHeaderElements
 } = dataSlice.actions;
export default dataSlice.reducer;