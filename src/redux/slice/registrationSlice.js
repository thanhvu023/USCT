import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getRegistrationByCustomerId = createAsyncThunk(
  "registration/getRegistrationById",
  async (param, thunkAPI) => {
    try {
      const majorId = param;
      const res = await instance.get(`/registration-forms/customer/${param}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getRegistrationByRegistrationFormId = createAsyncThunk(
  "registration/getRegistrationByRegistrationFormId",
  async (registrationFormId, thunkAPI) => {
    try {
      const res = await instance.get(`/registration-forms/${registrationFormId}`);
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

export const createRegistration = createAsyncThunk(
  "registration/createRegistration",
  async (param, thunkAPI) => {
    try {
      console.log(param);
      const res = await instance.post(`/registration-forms`,param);
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  msg: "",
  loading: false,
  registrationForms: [],
  registrationById: [],
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRegistrationByCustomerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistrationByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationById = action.payload;
        state.error = null;
      })
      .addCase(getRegistrationByCustomerId.rejected, (state, action) => {
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
      })
      .addCase(getRegistrationByRegistrationFormId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistrationByRegistrationFormId.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationById = action.payload;
        state.error = null;
      })
      .addCase(getRegistrationByRegistrationFormId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: registrationReducer } = registrationSlice;
export { registrationReducer as default };