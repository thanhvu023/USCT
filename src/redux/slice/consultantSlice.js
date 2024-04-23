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

export const getConsultantBySpecializeId = createAsyncThunk(
  "consultant/getConsultantBySpecializeId",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/account/consultants?specialize=${param}
      `);
      console.log(param)
      console.log(res.data)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const updateConsultantById = createAsyncThunk(
  "consultant/updateByConsultantId",
  async (params, thunkAPI) => {
    const { userId, userData } = params;
    console.log(params);
    try {
      const res = await instance.put(`/account/consultant/${userId}`, {
        ...userData,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  registrationByConsultantId: [],
  consultantById: {},
  consultantBySpecializeId: [],
};

export const consultantSlice = createSlice({
  name: "consultant",
  initialState,
  reducers: {
    logoutConsultant: (state) => {
      state.registrationByConsultantId = [];
      state.consultantBySpecializeId = [];
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
      .addCase(getConsultantBySpecializeId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConsultantBySpecializeId.fulfilled, (state, action) => {
        state.loading = false;
        state.consultantBySpecializeId = action.payload;
      })
      .addCase(getConsultantBySpecializeId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateConsultantById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateConsultantById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateConsultantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: consultantReducer } = consultantSlice;
export { consultantReducer as default };
