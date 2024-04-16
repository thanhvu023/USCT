import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";
import { logoutUser } from "./authSlice";
import { logoutProgram } from "./programSlice";



export const getProgramApplicationById = createAsyncThunk(
  "/programApplication/getProgramApplicationById",
  async (programApplicationId, thunkAPI) => {
    try {
      const res = await instance.get(`/program-applications/${programApplicationId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getAllProgramApplication = createAsyncThunk(
  "/programApplication/getAllProgramApplication",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/program-applications");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramApplicationsByStudentProfileId = createAsyncThunk(
  "/programApplication/getProgramApplicationsByStudentProfileId",
  async (studentProfileId, thunkAPI) => {
    try {
      const res = await instance.get(`/program-applications?studentProfileId=${studentProfileId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramApplicationsByCustomerId = createAsyncThunk(
  "/programApplication/getProgramApplicationsByCustomerId",
  async (customerId, thunkAPI) => {
    try {
      const res = await instance.get(`/program-applications?customerId=${customerId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  programApplications: [],
  programApplicationById: {},
  programApplicationsByStudentProfileId: [],
  programApplicationsByCustomerId: [],
  loading: false,
  error: null,
  token: null,
};

export const programApplicationSlice = createSlice({
  name: "programApplication",
  initialState,
  reducers: {
logoutProgram: (state)=>{
    state.programApplicationById=[];
    state.programApplications=[];
    state.programApplicationsByCustomerId=[];
    state.programApplicationsByStudentProfileId=[];
},

  },
  extraReducers: (builder) => {
    builder
    .addCase(logoutUser, (state) => {
        state.programs = [];
      })
      .addCase(getProgramApplicationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramApplicationById.fulfilled, (state, action) => {
        state.loading = false;
        state.programApplicationById = action.payload;
      })
      .addCase(getProgramApplicationById.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllProgramApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProgramApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.programApplication = action.payload;
      })
      .addCase(getAllProgramApplication.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProgramApplicationsByStudentProfileId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramApplicationsByStudentProfileId.fulfilled, (state, action) => {
        state.loading = false;
        state.programApplicationsByStudentProfileId = action.payload;
      })
      .addCase(getProgramApplicationsByStudentProfileId.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProgramApplicationsByCustomerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramApplicationsByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        state.programApplicationsByCustomerId = action.payload;
      })
      .addCase(getProgramApplicationsByCustomerId.rejected, (state, action) => {
        state.loading = false;
      });
  },
});



const { reducer: programApplicationReducer,
        actions :{logoutProgram},   
} = programApplicationSlice;
export { programApplicationReducer as default,logoutProgram };
