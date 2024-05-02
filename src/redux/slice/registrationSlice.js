import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getRegistrationByCustomerId = createAsyncThunk(
  "registration/getRegistrationById",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/registration-forms/customer/${param}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getRegistrationByConsultantId = createAsyncThunk(
  "registration/getRegistrationByConsultantId",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/registration-forms/consultant/${param}`);
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
      const res = await instance.get(
        `/registration-forms/${registrationFormId}`
      );
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
      const res = await instance.get(`/registration-forms`);
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
      const res = await instance.post(`/registration-forms`, param);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const updateRegistrationById = createAsyncThunk(
  "registration/updateRegistrationById",
  async ({ registrationFormId, consultantId, status }, thunkAPI) => {
    try {
      console.log(registrationFormId);
      console.log(consultantId);
      console.log(status);
      const state = thunkAPI.getState();
      const registration = state.registration.registrationForms.find(
        (r) => r.registrationFormId === registrationFormId
      );
      console.log(registration);
      const isNewConsultant = consultantId !== registration.consultantId;
      const updatedStatus = isNewConsultant ? 0 : status;

      const res = await instance.put(
        `/registration-forms/${registrationFormId}`,
        { consultantId, status: updatedStatus }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const updateStateConsultant = createAsyncThunk(
  "registration/updateStateConsultant",
  async ({ registrationFormId, consultantId, status }, thunkAPI) => {
    try {
      const res = await instance.put(
        `/registration-forms/${registrationFormId}`,
        { consultantId, status }
      );
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
  registrationById: [],
  registrationByCustomerId: [],
  registrationByConsultantId: [],
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetRegistration: (state) => {
      (state.registrationForms = []),
        (state.registrationById = []),
        (state.registrationByConsultantId = []),
        (state.registrationByCustomerId = []);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegistrationByCustomerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistrationByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationByCustomerId = action.payload;
        state.error = null;
      })
      .addCase(getRegistrationByCustomerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRegistrationByConsultantId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRegistrationByConsultantId.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationByConsultantId = action.payload;
        state.error = null;
      })
      .addCase(getRegistrationByConsultantId.rejected, (state, action) => {
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
      .addCase(
        getRegistrationByRegistrationFormId.fulfilled,
        (state, action) => {
          state.loading = false;
          state.registrationById = action.payload;
          state.error = null;
        }
      )
      .addCase(
        getRegistrationByRegistrationFormId.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addCase(updateRegistrationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRegistrationById.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = "Update successful";
      })
      .addCase(updateRegistrationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStateConsultant.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStateConsultant.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = "Update successful";
      })
      .addCase(updateStateConsultant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const {
  reducer: registrationReducer,
  actions: { resetRegistration },
} = registrationSlice;
export { registrationReducer as default, resetRegistration };
