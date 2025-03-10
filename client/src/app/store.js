import {configureStore } from "@reduxjs/toolkit"; // Corrected import
import rootReducer from "./rootRedcuer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";

// Combine your reducers here
export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware),
    });
//export default rootReducer;
const initializeApp= async ()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();