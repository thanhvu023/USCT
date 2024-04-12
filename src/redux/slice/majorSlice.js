import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getMajorById = createAsyncThunk(
  "major/getMajorById",
  async (param, thunkAPI) => {
    try {
      const majorId = param;
      const res = await instance.get(`/majors/${majorId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getAllMajor = createAsyncThunk(
  "major/getAllMajor",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/majors");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  msg: "",
  loading: false,
  majorById: {},
  allMajor: [],
};

export const majorSlice = createSlice({
  name: "major",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMajorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMajorById.fulfilled, (state, action) => {
        state.loading = false;
        state.majorById = action.payload;
        state.error = null;
      })
      .addCase(getMajorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllMajor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMajor.fulfilled, (state, action) => {
        state.loading = false;
        state.allMajor = action.payload;
        state.error = null;
      })
      .addCase(getAllMajor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: majorReducer } = majorSlice;
export { majorReducer as default };
