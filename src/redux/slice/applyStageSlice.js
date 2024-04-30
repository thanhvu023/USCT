import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

// Fetch all stages
export const getAllStage = createAsyncThunk(
  "applyStage/getAllStage",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/apply-stage");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch a specific stage by ID
export const getApplyStageById = createAsyncThunk(
  "applyStage/getApplyStageById",
  async (applyStageId, thunkAPI) => {
    try {
      const response = await instance.get(`/apply-stage/${applyStageId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update a specific stage
export const updateApplyStage = createAsyncThunk(
  "applyStage/updateApplyStage",
  async ({ applyStageId, programStageId, programApplicationId, status }, thunkAPI) => {
    try {
      // Note: Make sure your API endpoint is correct. It was "apply-stag" in your function, which might be a typo.
      const response = await instance.put(`/apply-stage/${applyStageId}`, { programStageId, programApplicationId, status });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  stages: [], 
  loading: false,
  error: null
};

const applyStageSlice = createSlice({
  name: "applyStage",
  initialState,
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
        state.error = action.error.message;
      })
      .addCase(getApplyStageById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApplyStageById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stages.findIndex(stage => stage.applyStageId === action.payload.applyStageId);
        if (index !== -1) {
          state.stages[index] = action.payload;
        } else {
          // Adding a new stage if it does not exist might not be needed, but it's here if you have such a use case.
          state.stages.push(action.payload);
        }
      })
      .addCase(getApplyStageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateApplyStage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApplyStage.fulfilled, (state, action) => {
        state.loading = false;
        // Update the stage in the state based on the returned data
        const index = state.stages.findIndex(stage => stage.applyStageId === action.payload.applyStageId);
        if (index !== -1) {
          state.stages[index] = action.payload;
        }
      })
      .addCase(updateApplyStage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const selectApplyStageById = (applyStageId) => (state) => {
  return state.applyStage.stages.find(stage => stage.applyStageId === applyStageId);
};

export default applyStageSlice.reducer;
