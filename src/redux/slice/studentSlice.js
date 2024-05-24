import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getStudentProfileByCustomerId = createAsyncThunk(
  "student/getStudentProfileByCustomerId",
  async (userId, thunkAPI) => {
    try {
      const res = await instance.get(`/profile/customer/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);
export const getAllStudentProfile = createAsyncThunk(
  "student/getAllStudentProfile",
  async (profileId, thunkAPI) => {
    try {
      const res = await instance.get("/profile/");
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

export const getStudentProfileById = createAsyncThunk(
  "student/getStudentProfileById",
  async (profileId, thunkAPI) => {
    try {
      const res = await instance.get(`/profile/${profileId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

export const createStudentProfile = createAsyncThunk(
  "student/createStudentProfile",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      const { formData } = params;
      const { certificates } = params;
      const studentProfileResponse = await instance.post("/profile/", formData);
      const { studentProfileId } = studentProfileResponse.data;
      const certificatesData = certificates.map((cert) => ({
        ...cert,
        studentProfileId,
      }));
      const {
        schoolProfile10,
        schoolProfile11,
        schoolProfile12,
        scoreProfile10,
        scoreProfile11,
        scoreProfile12,
      } = params;

      const schoolProfileData10 = await instance.post("/school-profiles", {
        studentProfileId,
        ...schoolProfile10,
      });
      const schoolProfileData11 = await instance.post("/school-profiles", {
        studentProfileId,
        ...schoolProfile11,
      });
      const schoolProfileData12 = await instance.post("/school-profiles", {
        studentProfileId,
        ...schoolProfile12,
      });

      const schoolProfileId10 = schoolProfileData10.data.schoolProfileId;
      const schoolProfileId11 = schoolProfileData11.data.schoolProfileId;
      const schoolProfileId12 = schoolProfileData12.data.schoolProfileId;

      const updatedScoreProfile10 = scoreProfile10.map((item) => ({
        ...item,
        schoolProfileId: schoolProfileId10,
      }));
      const updatedScoreProfile11 = scoreProfile11.map((item) => ({
        ...item,
        schoolProfileId: schoolProfileId11,
      }));
      const updatedScoreProfile12 = scoreProfile12.map((item) => ({
        ...item,
        schoolProfileId: schoolProfileId12,
      }));

      const scoreProfileGrade10 = await instance.post(
        "/profile-score/list-profile-score",
        updatedScoreProfile10
      );
      const scoreProfileGrade11 = await instance.post(
        "/profile-score/list-profile-score",
        updatedScoreProfile11
      );
      const scoreProfileGrade12 = await instance.post(
        "/profile-score/list-profile-score",
        updatedScoreProfile12
      );
      const certificatesStudent = await instance.post(
        "/certificates/list-certificate",
        certificatesData
      );
      console.log(certificatesStudent.data)
      return; // Return only serializable data
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  msg: "",
  token: null,
  loading: false,
  error: "",
  studentProfileByCustomerId: [],
  profileById: {},
  studentProfile: [],
  studentProfileAfterCreate: {},
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    logoutStudent: (state) => {
      state.studentProfileByCustomerId = [];
      state.profileById = {};
    },
    resetStudent: (state) => {
      state.profileById = {};
    },
  },
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
      })
      .addCase(getStudentProfileById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profileById = action.payload;
        state.error = action.error;
      })
      .addCase(getStudentProfileById.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllStudentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfile = action.payload;
        state.error = action.error;
      })
      .addCase(getAllStudentProfile.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createStudentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfileAfterCreate = action.payload;
      });
  },
});

const {
  reducer: studentReducer,
  actions: { logoutStudent, resetStudent },
} = studentSlice;
export { studentReducer as default, logoutStudent, resetStudent };
