import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const createLibrary = createAsyncThunk(
	"library/createLibrary",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post(
				`library/${data.studentId}`,
				data
			);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
        
export const updateLibrary = createAsyncThunk(
	"library/updateLibrary",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.put(`library/${data.id}`, data);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteLibrary = createAsyncThunk(
	"library/deleteLibrary",
	async (id, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.delete(`library/${id}`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getLibraries = createAsyncThunk(
	"library/getLibraries",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.get("library");
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const librarySlice = createSlice({
	name: "library",
	initialState: {
		data: null,
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createLibrary.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createLibrary.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(createLibrary.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateLibrary.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateLibrary.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(updateLibrary.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(deleteLibrary.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteLibrary.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(deleteLibrary.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getLibraries.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getLibraries.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(getLibraries.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default librarySlice.reducer;
