import { createSlice } from "@reduxjs/toolkit";

export const providerDataSlice = createSlice({
    name: 'providerData',
    initialState: {
        loggedProvider: {}
    },
    reducers: {
        saveLoggedProviderData: (state, action) => {
            state.loggedProvider = action.payload;
        },
        saveLoggedProviderCerFields: (state,action) => {
            state.loggedProvider = {...state.loggedProvider, 
                                        cernqual: [...state.loggedProvider.cernqual, action.payload]
                                    };
        },
        deleteloggedProviderCerFields: (state, action) => {
            state.loggedProvider = {...state.loggedProvider, 
                                        cernqual: action.payload
                                    };
        },
        editLoggedProviderCerField: (state, action) => {
            state.loggedProvider = {...state.loggedProvider, 
                                        cernqual: action.payload
                                    };
        },
        setLoggedProviderCareArea: (state, action) => {
            state.loggedProvider.carearea === undefined ? 
            state.loggedProvider = { ...state.loggedProvider, carearea: [action.payload]} :
            state.loggedProvider = { ...state.loggedProvider, carearea: [...state.loggedProvider.carearea, action.payload]};
        },
        deleteloggedProviderArea: (state, action) => {
            const newArr = state.loggedProvider.carearea.filter(obj => obj.id !== action.payload);
            state.loggedProvider = { ...state.loggedProvider, carearea: newArr};
        },
        editLoggedProviderPhone: (state, action) => {
            console.log(action.payload);
            state.loggedProvider = { ...state.loggedProvider, [action.payload.type]: action.payload.field }

        }
    }
})

export const 
    { 
        saveLoggedProviderData, 
        saveLoggedProviderCerFields, 
        deleteloggedProviderCerFields, 
        editLoggedProviderCerField, 
        setLoggedProviderCareArea, 
        deleteloggedProviderArea,
        editLoggedProviderPhone 
    } = providerDataSlice.actions;
export default providerDataSlice.reducer;