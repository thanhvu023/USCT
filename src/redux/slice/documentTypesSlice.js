import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

// Hàm getAllDocumentTypes
export const getAllDocumentTypes = createAsyncThunk(
  "document/getAllDocumentTypes",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/document-types");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  msg: "",
  loading: false,
  allDocumentTypes: [],
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDocumentTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDocumentTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.allDocumentTypes = action.payload;
        state.error = null;
      })
      .addCase(getAllDocumentTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
// Export the reducer
const { reducer: documentReducer } = documentSlice;
export { documentReducer as default };
