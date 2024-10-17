import {
	createSlice,
	createAsyncThunk,
} from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const login = createAsyncThunk(
	"auth/login",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post("auth/login", data);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const register = createAsyncThunk(
	"auth/register",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post("auth/register", data);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateAdmin = createAsyncThunk(
	"auth/updateAdmin",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.put("auth", data);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const changeAdminPassword = createAsyncThunk(
	"auth/changeAdminPassword",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.put("auth/password", data);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateUser = createAsyncThunk(
	"auth/updateUser",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.put(`auth/${data.id}`, data);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const changeUserPassword = createAsyncThunk(
	"auth/changeUserPassword",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.put(
				`auth/password/${data.id}`,
				data
			);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteUser = createAsyncThunk(
	"auth/deleteUser",
	async (id, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.delete(`auth/${id}`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUsers = createAsyncThunk(
	"auth/getUsers",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.get("auth");
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUser = createAsyncThunk(
	"auth/getUser",
	async (id, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.get(`auth/${id}`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post("auth/logout");
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null || JSON.parse(localStorage.getItem("user")),
		data: null,
		isLoading: false,
		error: null,
	},
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateAdmin.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateAdmin.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(updateAdmin.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(changeAdminPassword.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(changeAdminPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(changeAdminPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(changeUserPassword.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(changeUserPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(changeUserPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				localStorage.removeItem("user");
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default authSlice.reducer;
