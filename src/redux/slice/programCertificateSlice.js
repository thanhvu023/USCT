import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

// Async thunk to fetch all program certificates
export const getAllCertificates = createAsyncThunk(
  "certificate/getAllCertificates",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/program-certificates");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// Async thunk to fetch a certificate by ID
export const getCertificateById = createAsyncThunk(
  "certificate/getCertificateById",
  async (param, thunkAPI) => {
    try {
      const certificateId = param;
      const res = await instance.get(`/program-certificates/${certificateId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getCertificatesByProgramId = createAsyncThunk(
  "certificate/getCertificatesByProgramId",
  async (programId, thunkAPI) => {
    try {
      const res = await instance.get(`/program-certificates/program/${programId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  msg: "",
  loading: false,
  certificateById: {},
  certificates: [],
  certificatesByProgramId: [], 
};

export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
 filterCertificatesByProgramId: (state, action) => {
      state.certificatesByProgramId = state.certificates.filter(
        (certificate) => certificate.programId === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCertificateById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCertificateById.fulfilled, (state, action) => {
        state.loading = false;
        state.certificateById = action.payload;
        state.error = null;
      })
      .addCase(getCertificateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllCertificates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
        state.error = null;
      })
      .addCase(getAllCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCertificatesByProgramId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCertificatesByProgramId.fulfilled, (state, action) => {
        state.loading = false;
        state.certificatesByProgramId = action.payload;
        state.error = null;
      })
      .addCase(getCertificatesByProgramId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { filterCertificatesByProgramId } = certificateSlice.actions; 
const { reducer: certificateReducer } = certificateSlice;
export { certificateReducer as default };
