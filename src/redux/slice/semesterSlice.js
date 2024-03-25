import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getSemesterById = createAsyncThunk(
  "semester/getSemesterById",
  async (param, thunkAPI) => {
    try {
      const semesterId = param;
      const res = await instance.get(`/semesters/${semesterId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
const initialState = {
  msg: "",
  loading: false,
  semesterById: {},
};

export const semesterSlice = createSlice({
  name: "semester",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSemesterById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSemesterById.fulfilled, (state, action) => {
        state.loading = false;
        state.semesterById = action.payload;
        state.error = null;
      })
      .addCase(getSemesterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: semesterReducer } = semesterSlice;
export {semesterReducer as default}