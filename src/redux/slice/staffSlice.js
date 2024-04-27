import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";


export const getAllStaff = createAsyncThunk(
  "staff/getAllStaffs",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/account/staffs");
        
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getStaffById = createAsyncThunk(
  "staff/getById",
  async (param, thunkAPI) => {
    try {
      const response = await instance.get(`/account/staff/${param}`);
      return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response);
    }
  }
);
const initialState = {
    msg: "",
    token: null,
    loading: false,
    staffs: [],
    staffId: {},

  };
const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = action.payload;
        state.error = null;
      })
      .addCase(getAllStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getStaffById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStaffById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStaff = action.payload;
        state.error = null;
      })
      .addCase(getStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: staffReducer } = staffSlice;
export { staffReducer as default };
