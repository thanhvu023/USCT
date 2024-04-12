import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";
import { logoutUser } from "./authSlice";

export const getAllProgram = createAsyncThunk(
  "/program/getAllProgram",
  async (param, thunkAPI) => {
    try {
      const programName = param;
      if (programName) {
        const res = await instance.get(`programs?programName=${programName}`);
        return res.data;
      } else {
        const res = await instance.get("/programs");
        return res.data;
      }
      // console.log(param);
      // const headers = {
      //   Authorization: `Bearer ${param}`,
      // };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramById = createAsyncThunk(
  "/program/getProgramById",
  async (param, thunkAPI) => {
    try {
      const programId = param;
      const res = await instance.get(`/programs/${programId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/problem+json; charset=utf-8",
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramByUniId = createAsyncThunk(
  "/program/getProgramByUniId",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/programs?universityId=${param}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/problem+json; charset=utf-8",
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getprogramByName = createAsyncThunk(
  "/program/getprogramByName",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/programs?programName=${param}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/problem+json; charset=utf-8",
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramByProgramType = createAsyncThunk(
  "/program/getProgramByProgramType",
  async (param, thunkAPI) => {
    try {
      const programTypeId = param;
      const res = await instance.get(
        `/programs?programTypeId=${programTypeId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/problem+json; charset=utf-8",
            Accept: "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const createProgramApplication = createAsyncThunk(
  "/program/createProgramApplication",
  async (param, thunkAPI) => {
    try {
      console.log(param);
      const res = await instance.post("/program-applications", param);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  msg: "",
  token: null,
  loading: false,
  programs: [],
  programById: {},
  programsByUniId: [],
  programsByProgramType: [],
};

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    logoutProgram: (state) => {
      state.programs = [];
      state.programById = {};
      state.programsByUniId = [];
      state.programsByProgramType = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser, (state) => {
        state.programs = [];
      })
      .addCase(getAllProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
        state.error = null;
      })
      .addCase(getAllProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramById.fulfilled, (state, action) => {
        state.loading = false;
        state.programById = action.payload;
        state.error = null;
      })
      .addCase(getProgramById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramByUniId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramByUniId.fulfilled, (state, action) => {
        state.loading = false;
        state.programsByUniId = action.payload;
        state.error = null;
      })
      .addCase(getProgramByUniId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProgramByProgramType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramByProgramType.fulfilled, (state, action) => {
        state.loading = false;
        state.programsByProgramType = action.payload;
        state.error = null;
      })
      .addCase(getProgramByProgramType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const {
  reducer: programReducer,
  actions: { logoutProgram },
} = programSlice;
export { programReducer as default, logoutProgram };
