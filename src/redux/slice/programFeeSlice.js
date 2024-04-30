import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";
// Async thunk for getting all program fees
export const getAllProgramFees = createAsyncThunk(
  "programFee/getAllProgramFees",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/program-fees");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// Async thunk for getting a single program fee by id
export const getProgramFeeById = createAsyncThunk(
  "programFee/getProgramFeeById",
  async (feeId, thunkAPI) => {
    try {
      const response = await instance.get(`/program-fees/${feeId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// Async thunk for getting program fees by program id
export const getProgramFeesByProgramId = createAsyncThunk(
  "programFee/getProgramFeesByProgramId",
  async (programId, thunkAPI) => {
    try {
      const response = await instance.get(`/program-fees/program/${programId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const createProgramFee = createAsyncThunk(
    "programFee/createProgramFee",
    async (feeData, thunkAPI) => {
      try {
        const response = await instance.post("/program-fees", feeData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
const initialState = {
  loading: false,
  fees: [],
  error: null,
};

const programFeeSlice = createSlice({
  name: "programFee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProgramFees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProgramFees.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = action.payload;
        state.error = null;
      })
      .addCase(getAllProgramFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramFeeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramFeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getProgramFeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramFeesByProgramId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramFeesByProgramId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getProgramFeesByProgramId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProgramFee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProgramFee.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new fee to the state array if you choose to
        // For instance:
        // state.fees.push(action.payload);
        state.error = null;
      })
      .addCase(createProgramFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: programFeeReducer } = programFeeSlice;
export { programFeeReducer as default };
