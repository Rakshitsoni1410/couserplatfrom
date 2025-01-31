import { combineReducers } from "@reduxjs/toolkit"; // Corrected import
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";

// Combine your reducers here
const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer, // Include authApi reducer if needed
});

export default rootReducer;