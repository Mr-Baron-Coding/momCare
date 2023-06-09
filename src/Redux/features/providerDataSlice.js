import { createSlice } from "@reduxjs/toolkit";

export const providerDataSlice = createSlice({
    name: 'providerData',
    initialState: {
        loggedProvider: {},
        tabNavScreens: 1,
        providerHomescreenSections: { 
            showAbout: true, 
            showCert: true, 
            showArea: true, 
            showContact: true }
    },
    reducers: {
        saveLoggedProviderData: (state, action) => {
            state.loggedProvider = action.payload;
        },
        saveLoggedProviderCerFields: (state,action) => {
            state.loggedProvider.cernqual.length === 0 ? 
            state.loggedProvider = { ...state.loggedProvider, cernqual: action.payload }
            : state.loggedProvider = {...state.loggedProvider, 
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
            state.loggedProvider = { ...state.loggedProvider, [action.payload.type]: action.payload.field }
        },
        screenChange: (state, action) => {
            state.tabNavScreens = action.payload;
        },
        changeEditOption: (state, action) => {
            state.providerHomescreenSections = {...state.providerHomescreenSections, [action.payload.type]: action.payload.state}
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
        editLoggedProviderPhone,
        screenChange,
        changeEditOption
    } = providerDataSlice.actions;
export default providerDataSlice.reducer;