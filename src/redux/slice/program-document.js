import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getProgramDocumentById = createAsyncThunk(
  "programDocument/getProgramDocumentById",
  async (param, thunkAPI) => {
    try {
      const documentId = param;
      const res = await instance.get(`/program-documents/${documentId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getAllProgramDocuments = createAsyncThunk(
  "programDocument/getAllProgramDocuments",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/program-documents");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramCertificateByProgramId = createAsyncThunk(
    "programDocument/getProgramCertificateByProgramId",
    async (param, thunkAPI) => {
      try {
        const programId = param;
        const res = await instance.get(`/program-documents/program/${programId}`);
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
      }
    }
  );

const initialState = {
  msg: "",
  loading: false,
  programDocumentById: {},
  allProgramDocuments: [],
};

export const programDocumentSlice = createSlice({
  name: "programDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProgramDocumentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramDocumentById.fulfilled, (state, action) => {
        state.loading = false;
        state.programDocumentById = action.payload;
        state.error = null;
      })
      .addCase(getProgramDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllProgramDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProgramDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.allProgramDocuments = action.payload;
        state.error = null;
      })
      .addCase(getAllProgramDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramCertificateByProgramId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramCertificateByProgramId.fulfilled, (state, action) => {
        state.loading = false;
        state.programCertificateByProgramId = action.payload;
        state.error = null;
      })
      .addCase(getProgramCertificateByProgramId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: programDocumentReducer } = programDocumentSlice;
export { programDocumentReducer as default };
