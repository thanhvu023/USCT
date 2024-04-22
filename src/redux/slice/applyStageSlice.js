import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getAllStage = createAsyncThunk(
  "/applyStage/getAllStage",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/apply-stage");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// Thêm hàm logoutStage vào phần reducers nếu cần

// Khởi tạo state ban đầu
const initialState = {
  stages: [], // Danh sách các stage
  loading: false,
  error: null,
};

// Tạo slice
export const applyStageSlice = createSlice({
  name: "applyStage",
  initialState,
  reducers: {
    // Định nghĩa reducers nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStage.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload;
      })
      .addCase(getAllStage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export reducer và action nếu cần
const {
  reducer: applyStageReducer,
} = applyStageSlice;

export { applyStageReducer as default };
