import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const getStudentDocumentById = createAsyncThunk(
  "studentDocument/getStudentDocumentById",
  async (param, thunkAPI) => {
    try {
      const documentId = param;
      const res = await instance.get(`/documents/${documentId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getAllStudentDocuments = createAsyncThunk(
  "studentDocument/getAllStudentDocuments",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/documents");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);


export const createDocument = createAsyncThunk(
  "studentDocument/createDocument",
  async (documentData, thunkAPI) => {
    try {
      const res = await instance.post("/documents", documentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
// export const createDocument = createAsyncThunk(
//   "studentDocument/createDocument",
//   async (documentData, thunkAPI) => {
//     try {
//       const res = await instance.post("/documents", documentData);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response);
//     }
//   }
// );

export const getDocumentsByProgramApplicationId = createAsyncThunk(
  "studentDocument/getDocumentsByProgramApplicationId",
  async (programApplicationId, thunkAPI) => {
    try {
      const res = await instance.get(`/documents/program-application/${programApplicationId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const updateDocument = createAsyncThunk(
  "studentDocument/updateDocument",
  async (documentData, thunkAPI) => {
    const { documentId, ...data } = documentData;
    try {
      const res = await instance.put(`/documents/${documentId}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);


const initialState = {
  msg: "",
  loading: false,
  studentDocumentById: {},
  allStudentDocuments: [],
  documentsByProgramApplicationId: [], // Add this line

};

export const studentDocumentSlice = createSlice({
  name: "studentDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDocumentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentDocumentById.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDocumentById = action.payload;
        state.error = null;
      })
      .addCase(getStudentDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllStudentDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudentDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.allStudentDocuments = action.payload;
        state.error = null;
      })
      .addCase(getAllStudentDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.newDocument = action.payload;
        state.error = null;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDocumentsByProgramApplicationId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDocumentsByProgramApplicationId.fulfilled, (state, action) => {
        state.loading = false;
        state.documentsByProgramApplicationId = action.payload;
        state.error = null;
      })
      .addCase(getDocumentsByProgramApplicationId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedDocument = action.payload;
        state.error = null;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer: studentDocumentReducer } = studentDocumentSlice;
export { studentDocumentReducer as default };
