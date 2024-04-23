import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getRegistrationByConsultantId = createAsyncThunk(
  "consultant/getRegistration",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/registration-forms/consultant/${param}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getConsultantById = createAsyncThunk(
  "consultant/getConsultantById",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/account/consultant/${param}
      `);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getAllConsultants = createAsyncThunk(
  "consultant/getAllConsultants",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/account/consultants");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  registrationByConsultantId: [],
  consultantById: {},
  consultants: [],

};

export const consultantSlice = createSlice({
  name: "consultant",
  initialState,
  reducers: {
    logoutConsultant: (state) => {
      state.registrationByConsultantId = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegistrationByConsultantId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistrationByConsultantId.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationByConsultantId = action.payload;
      })
      .addCase(getRegistrationByConsultantId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getConsultantById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConsultantById.fulfilled, (state, action) => {
        state.loading = false;
        state.consultantById = action.payload;
      })
      .addCase(getConsultantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllConsultants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllConsultants.fulfilled, (state, action) => {
        state.loading = false;
        state.consultants = action.payload;
      })
      .addCase(getAllConsultants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: consultantReducer } = consultantSlice;
export { consultantReducer as default };
