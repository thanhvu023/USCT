import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getRegistrationById = createAsyncThunk(
  "registration/getRegistrationById",
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
export const getRegistration = createAsyncThunk(
  "registration/getRegistration",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/registration-form`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  msg: "",
  loading: false,
  registrationForms: [],
  registrationById: {},
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRegistrationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistrationById.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationById = action.payload;
        state.error = null;
      })
      .addCase(getRegistrationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationForms = action.payload;
        state.error = null;
      })
      .addCase(getRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: registrationReducer } = registrationSlice;
export { registrationReducer as default };
