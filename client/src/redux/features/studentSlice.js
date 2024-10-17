import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const createStudent = createAsyncThunk(
	"student/createStudent",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post("student", data);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getStudents = createAsyncThunk("student/getStudents", async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("student");
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getStudent = createAsyncThunk("student/getStudent", async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`student/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateStudent = createAsyncThunk(
    "student/updateStudent",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`student/${data.id}`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteStudent = createAsyncThunk(
    "student/deleteStudent",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`student/${id}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const studentSlice = createSlice({
	name: "student",
	initialState: {
		data: null,
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
        builder.addCase(createStudent.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createStudent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(createStudent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getStudents.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getStudents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(getStudents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getStudent.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getStudent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(getStudent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(updateStudent.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateStudent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(updateStudent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(deleteStudent.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteStudent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(deleteStudent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default studentSlice.reducer;
