import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./features/dataSlice";
import providerDataSlice from "./features/providerDataSlice";

export default configureStore({
    reducer: {
        data: dataSlice,
        providerData: providerDataSlice
    },
})