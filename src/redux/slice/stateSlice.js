import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getStateById = createAsyncThunk(
  "state/getStateById",
  async (param, thunkAPI) => {
    try {
      const  stateId  = param;
      const res = await instance.get(`/states/${stateId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getAllState = createAsyncThunk(
  "state/getAllState",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/states");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  msg: "",
  loading: false,
  stateById: {},
  states: [],
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStateById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStateById.fulfilled, (state, action) => {
        state.loading = false;
        state.stateById = action.payload;
        state.error = null;
      })
      .addCase(getStateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllState.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllState.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
        state.error = null;
      })
      .addCase(getAllState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: stateReducer } = stateSlice;
export {stateReducer as default}