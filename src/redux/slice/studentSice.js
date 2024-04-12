import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getStudentProfileByCustomerId = createAsyncThunk(
  "student/getStudentProfileByCustomerId",
  async (userId, thunkAPI) => {
    try {
      const res = await instance.get(`/profile/customer/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

export const getStudentProfileById = createAsyncThunk(
  "student/getStudentProfileById",
  async (profileId, thunkAPI) => {
    try {
      const res = await instance.get(`/profile/${profileId}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

export const createStudentProfile = createAsyncThunk(
  "student/createStudentProfile",
  async (studentData, thunkAPI) => {
    try {
      console.log(studentData);
      const res = await instance.post("/profile/", studentData, {
        headers: "Access-Control-Allow-Origin",
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);
const initialState = {
  msg: "",
  token: null,
  loading: false,
  error: "",
  studentProfileByCustomerId: [],
  profileById: {},
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    logoutStudent: (state) => {
      state.studentProfileByCustomerId = [];
      state.profileById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentProfileByCustomerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentProfileByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfileByCustomerId = action.payload;
        state.error = action.error;
      })
      .addCase(getStudentProfileByCustomerId.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getStudentProfileById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profileById = action.payload;
        state.error = action.error;
      })
      .addCase(getStudentProfileById.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createStudentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createStudentProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

const {
  reducer: studentReducer,
  actions: { logoutStudent },
} = studentSlice;
export { studentReducer as default,logoutStudent};
