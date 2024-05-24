import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

// Thunk to get a school profile by ID
export const getSchoolProfileById = createAsyncThunk(
  "schoolProfile/getSchoolProfileById",
  async (param, thunkAPI) => {
    try {
      const schoolProfileId = param;
      const res = await instance.get(`/v3/school-profiles/${schoolProfileId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// Thunk to get all school profiles
export const getAllSchoolProfiles = createAsyncThunk(
  "schoolProfile/getAllSchoolProfiles",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/v3/school-profiles");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getSchoolProfilesByStudentProfileId = createAsyncThunk(
  "schoolProfile/getSchoolProfilesByStudentProfileId",
  async (studentProfileId, thunkAPI) => {
    try {
      const res = await instance.get(`/school-profiles/student-profile/${studentProfileId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  msg: "",
  loading: false,
  schoolProfileById: {},
  schoolProfiles: [],
  schoolProfilesByStudentProfileId: [],
};

export const schoolProfileSlice = createSlice({
  name: "schoolProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolProfileById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolProfileById = action.payload;
        state.error = null;
      })
      .addCase(getSchoolProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllSchoolProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSchoolProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolProfiles = action.payload;
        state.error = null;
      })
      .addCase(getAllSchoolProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSchoolProfilesByStudentProfileId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolProfilesByStudentProfileId.fulfilled, (state, action) => {
        state.loading = false;
        state.schoolProfilesByStudentProfileId = action.payload;
        state.error = null;
      })
      .addCase(getSchoolProfilesByStudentProfileId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: schoolProfileReducer } = schoolProfileSlice;
export { schoolProfileReducer as default };
