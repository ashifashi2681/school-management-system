import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const createFee = createAsyncThunk(
	"fees/createFee",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post(
				`fees/${data.studentId}`,
				data
			);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateFee = createAsyncThunk(
	"fees/updateFee",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.put(`fees/${data.id}`, data);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteFee = createAsyncThunk(
	"fees/deleteFee",
	async (id, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.delete(`fees/${id}`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getFees = createAsyncThunk(
	"fees/getFees",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.get(`fees`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const feesSlice = createSlice({
	name: "fees",
	initialState: {
		data: null,
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createFee.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createFee.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(createFee.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateFee.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateFee.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(updateFee.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(deleteFee.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteFee.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(deleteFee.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getFees.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getFees.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(getFees.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default feesSlice.reducer;
