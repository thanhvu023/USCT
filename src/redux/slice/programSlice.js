import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const axiosUs = axios.create({
  baseURL: "https://usstudy.monoinfinity.net/v3/",
});

export const getAllProgram = createAsyncThunk(
  "/program/getAll",
  async (param, thunkAPI) => {
    try {
      const res = await axiosUs.get("/programs");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramById = createAsyncThunk(
  "/program/getById",
  async (param, thunkAPI) => {
    try {
      const programId = param;
      const res = await axiosUs.get(`/programs/${programId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/problem+json; charset=utf-8",
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramByUniId = createAsyncThunk(
  "/program/getProgramByUniId",
  async (param, thunkAPI) => {
    try {
      const { programId } = param;
      const { uniId } = param;
      const res = await axiosUs.get(`/programs/?universityId=${uniId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/problem+json; charset=utf-8",
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
const initialState = {
  msg: "",
  token: null,
  loading: false,
  programs: [],
  programById: {},
  programsByUniId: [],
};

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
        state.error = null;
      })
      .addCase(getAllProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramById.fulfilled, (state, action) => {
        state.loading = false;
        state.programById = action.payload;
        state.error = null;
      })
      .addCase(getProgramById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramByUniId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramByUniId.fulfilled, (state, action) => {
        state.loading = false;
        state.programsByUniId = action.payload;
        state.error = null;
      })
      .addCase(getProgramByUniId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const { reducer: programReducer } = programSlice;
export { programReducer as default };
