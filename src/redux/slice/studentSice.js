import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getStudentById = createAsyncThunk(
  "customer/getStudentById",
  async (userId, thunkAPI) => {
    try {
      const res = await instance.get(`/account/customer/${userId}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

const initialState = {
  msg: "",
  token: null,
  loading: false,
  error: "",
  manager: false,
  studentById: {},
  userNumber: "",
  dataUser: {},
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.studentById = action.payload;
        state.error = action.error;
      })
      .addCase(getStudentById.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

const { reducer : studentReducer } = studentSlice;
export {studentReducer as default}
