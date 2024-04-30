import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../axiosCustom';

// Async thunk for getting a list of all fee types
export const getAllFeeTypes = createAsyncThunk(
  'feeType/getAllFeeTypes',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/fee-types');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// Async thunk for getting a single fee type by id
export const getFeeTypeById = createAsyncThunk(
  'feeType/getFeeTypeById',
  async (feeTypeId, thunkAPI) => {
    try {
      const response = await instance.get(`/fee-types/${feeTypeId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: false,
  feeTypes: [],
  error: null,
};

const feeTypeSlice = createSlice({
  name: 'feeType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFeeTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.feeTypes = action.payload;
        state.error = null;
      })
      .addCase(getAllFeeTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeTypeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeeTypeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getFeeTypeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: feeTypeReducer } = feeTypeSlice;
export default feeTypeReducer;
