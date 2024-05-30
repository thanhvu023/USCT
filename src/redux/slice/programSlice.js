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

export const getProgramByMajorId = createAsyncThunk(
  "/program/getProgramByMajorId",
  async (param, thunkAPI) => {
    try {
      const res = await instance.get(`/programs?majorId=${param}`, {
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
      const res = await instance.post("/program-applications", param);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const createProgram = createAsyncThunk(
  "/program/createProgram",
  async (params, thunkAPI) => {
    // console.log("programData",programData)
    const {
      programStage,
      formData,
      certificates,
      programFee,
      programDocument,
      programStageFee,
    } = params;
    try {
      const res = await instance.post(`/programs`, formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const programId = res.data.programId;
      const certificatesData = certificates.map((cert) => ({
        ...cert,
        programId,
      }));
      // const programFeeData = programFee.map((fee) => ({
      //   ...fee,
      //   programId,
      // }));

      const programCer = await instance.post(
        `/program-certificates`,
        certificatesData
      );
      // const programFeeRes = await instance.post(
      //   `/program-fees`,
      //   programFeeData
      // );
      const programDocumentData = programDocument.map((doc) => ({
        ...doc,
        programId,
      }));
      const programDocRes = await instance.post(
        `/program-documents`,
        programDocumentData
      );
      const programStageFeeData = programStageFee.map((item) => ({
        programStageRequest: {
          ...item.programStageRequest,
          programId: programId,
        },
        programFeeRequest: {
          ...item.programFeeRequest,
          programId: programId,
        },
      }));
      console.log(programStageFeeData);
       const programStageRes = await instance.post(
        `/program-stages/fee`,
        programStageFeeData
       )
       console.log(programStageRes)
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const hideProgram = createAsyncThunk(
  "/program/hideProgram",
  async (programId, thunkAPI) => {
    try {
      const res = await instance.put(
        `/programs/${programId}`,
        { status: "Inactive" },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateProgram = createAsyncThunk(
  "/program/updateProgram",
  async (programData, thunkAPI) => {
    try {
      const { programId, ...updatedData } = programData;
      const res = await instance.put(`/programs/${programId}`, updatedData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProgramTypes = createAsyncThunk(
  "/program/getProgramTypes",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/program-types");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getProgramTypeById = createAsyncThunk(
  "/program/getProgramTypeById",
  async (programTypeId, thunkAPI) => {
    try {
      const res = await instance.get(`/program-types/${programTypeId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
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
  programsByMajor: [],
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
      state.programsByMajor = [];
    },
    resetProgramById: (state) => {
      state.programById = {};
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
      .addCase(getProgramByMajorId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramByMajorId.fulfilled, (state, action) => {
        state.loading = false;
        state.programsByMajor = action.payload;
        state.error = null;
      })
      .addCase(getProgramByMajorId.rejected, (state, action) => {
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
      })
      .addCase(getProgramTypes.fulfilled, (state, action) => {
        state.programTypes = action.payload;
      })
      .addCase(getProgramTypeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramTypeById.fulfilled, (state, action) => {
        state.loading = false;
        state.programTypeById = action.payload;
        state.error = null;
      })
      .addCase(getProgramTypeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.loading = false;
        // state.programs = state.programs.map((program) =>
        //   program.programId === action.payload.programId ? action.payload : program
        // );
        state.error = null;
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(hideProgram.pending, (state) => {
        state.loading = true;
      })
      .addCase(hideProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(hideProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const {
  reducer: programReducer,
  actions: { logoutProgram, resetProgramById },
} = programSlice;
export { programReducer as default, logoutProgram, resetProgramById };
