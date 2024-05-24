import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

// Thunk to get a student certificate by ID
export const getStudentCertificateById = createAsyncThunk(
  "studentCertificate/getStudentCertificateById",
  async (param, thunkAPI) => {
    try {
      const studentCertificateId = param;
      const res = await instance.get(`/certificates/${studentCertificateId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// Thunk to get all student certificates
export const getAllStudentCertificates = createAsyncThunk(
  "studentCertificate/getAllStudentCertificates",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/certificates");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getAllStudentCertificatesByProfile = createAsyncThunk(
  "studentCertificate/getAllStudentCertificatesByProfile",
  async (profileId, thunkAPI) => {
    try {
      const res = await instance.get(`/certificates/student-profile/${profileId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
const initialState = {
  msg: "",
  loading: false,
  studentCertificateById: {},
  studentCertificates: [],
};

export const studentCertificateSlice = createSlice({
  name: "studentCertificate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentCertificateById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentCertificateById.fulfilled, (state, action) => {
        state.loading = false;
        state.studentCertificateById = action.payload;
        state.error = null;
      })
      .addCase(getStudentCertificateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllStudentCertificates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudentCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.studentCertificates = action.payload;
        state.error = null;
      })
      .addCase(getAllStudentCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllStudentCertificatesByProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudentCertificatesByProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.studentCertificates = action.payload;
        state.error = null;
      })
      .addCase(getAllStudentCertificatesByProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: studentCertificateReducer } = studentCertificateSlice;
export { studentCertificateReducer as default };
