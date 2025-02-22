import { combineReducers } from "@reduxjs/toolkit"; // Corrected import
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";

// Combine your reducers here
const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    auth: authReducer, // Include authApi reducer if needed
});

export default rootReducer;