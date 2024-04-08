import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getAllUniversity = createAsyncThunk(
  "/university/getAll",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get("/universities");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getUniversityById = createAsyncThunk(
  "/university/getById",
  async (param, thunkAPI) => {
    try {
      const universityId  = param;
      const res = await instance.get(`/universities/${universityId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getUniversityTypeById = createAsyncThunk(
  '/university/getUniversityType',
  async(param,thunkAPI)=>{
    try {
      const res = await instance.get(`/university-types/${param}`)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);

    }
  }
)

const initialState = {
  msg: "",
  token: null,
  loading: false,
  universities: [],
  universityById: {},
  universityType:{}
};

export const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUniversity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUniversity.fulfilled, (state, action) => {
        state.loading = false;
        state.universities = action.payload;
        state.error = null;
      })
      .addCase(getAllUniversity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUniversityById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUniversityById.fulfilled, (state, action) => {
        state.loading = false;
        state.universityById = action.payload;
        state.error = null;
      })
      .addCase(getUniversityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) .addCase(getUniversityTypeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUniversityTypeById.fulfilled, (state, action) => {
        state.loading = false;
        state.universityType = action.payload;
        state.error = null;
      })
      .addCase(getUniversityTypeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: universityReducer } = universitySlice;
export { universityReducer as default };
