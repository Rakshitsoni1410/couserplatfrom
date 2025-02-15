import {configureStore } from "@reduxjs/toolkit"; // Corrected import
import rootReducer from "./rootRedcuer";
import { authApi } from "@/features/api/authApi";

// Combine your reducers here
export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware),
    });
//export default rootReducer;
const initializeApp= async ()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();