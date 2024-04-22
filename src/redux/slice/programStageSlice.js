import instance from "../axiosCustom";
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';


export const getAllProgramStages = createAsyncThunk(
  'programStages/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('https://usstudy.monoinfinity.net/v3/program-stages');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getProgramStageById = createAsyncThunk(
    'programStages/getById',
    async (programStageId, thunkAPI) => {
      try {
        const response = await instance.get(`https://usstudy.monoinfinity.net/v3/program-stages/${programStageId}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  export const getProgramStagesByProgramId = createAsyncThunk(
    'programStages/getByProgramId',
    async (programId, thunkAPI) => {
      try {
        const response = await instance.get(`https://usstudy.monoinfinity.net/v3/program-stages?programId=${programId}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
const programStagesSlice = createSlice({
  name: 'programStages',
  initialState: {
    stages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProgramStages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProgramStages.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload;
      })
      .addCase(getAllProgramStages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProgramStageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgramStageById.fulfilled, (state, action) => {
        state.loading = false;
        state.stages.push(action.payload); 
      })
      .addCase(getProgramStageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProgramStagesByProgramId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgramStagesByProgramId.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload; 
      })
      .addCase(getProgramStagesByProgramId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectStagesByProgramId = createSelector(
  (state) => state.programStages.stages,
  (_, programId) => programId,
  (stages, programId) => stages.filter((stage) => stage.programId === programId)
);

const programStageReducer = programStagesSlice.reducer;

export default programStageReducer;