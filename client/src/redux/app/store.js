import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import studentReducer from "../features/studentSlice";
import feesReducer from "../features/feesSlice";
import libraryReducer from "../features/librarySlice";
export const store = configureStore({
	reducer: {
		auth: authReducer,
		student: studentReducer,
		fees: feesReducer,
		library: libraryReducer,
	},
});
