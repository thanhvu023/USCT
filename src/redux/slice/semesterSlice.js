import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getAllSemester = createAsyncThunk(
  "semester/getAllSemester",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/semesters");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

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
  allSemester: []
};

export const semesterSlice = createSlice({
  name: "semester",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSemester.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSemester.fulfilled, (state, action) => {
        state.loading = false;
        state.allSemester = action.payload;
        state.error = null;
      })
      .addCase(getAllSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
export { semesterReducer as default };
