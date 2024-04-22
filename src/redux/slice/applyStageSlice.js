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

export const updateApplyStageById = createAsyncThunk(
    "/applyStage/updateById",
    async ({ applyStageId, programStageId }, thunkAPI) => {
      try {
        const res = await instance.put(`/apply-stage/${applyStageId}`, {
          programStageId: programStageId
        });
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
const initialState = {
  stages: [], 
  loading: false,
  error: null,
};


export const applyStageSlice = createSlice({
  name: "applyStage",
  initialState,
  reducers: {
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
      })
      .addCase(updateApplyStageById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApplyStageById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateApplyStageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

const {
  reducer: applyStageReducer,
} = applyStageSlice;

export { applyStageReducer as default };
