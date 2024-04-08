import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getStudentProfileByCustomerId = createAsyncThunk(
  "student/getStudentProfileByCustomerId",
  async (userId, thunkAPI) => {
    try {
      const res = await instance.get(`/profile/customer/${userId}`);
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
  studentProfileByCustomerId: [],
  userNumber: "",
  dataUser: {},
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentProfileByCustomerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentProfileByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfileByCustomerId = action.payload;
        state.error = action.error;
      })
      .addCase(getStudentProfileByCustomerId.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

const { reducer : studentReducer } = studentSlice;
export {studentReducer as default}
