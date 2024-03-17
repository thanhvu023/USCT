import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import instance from "../axiosCustom";
import { setUserAuthToken } from "../authService";

const axiosUs = axios.create({
  baseURL: "https://usstudy.monoinfinity.net/v3/",
});

export const login = createAsyncThunk(
  "customer/login",
  async (param, thunkAPI) => {
    try {
      const loginData = param.loginData;
      const navigate = param.navigate;
      const res = await axiosUs.post("account/login", loginData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const token = res.data
      setUserAuthToken(token)
      navigate("/");
      return token;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }
);

export const getUserById = createAsyncThunk(
  "customer/getUserById",
  async (userId, thunkAPI) => {
    try {
      const res = await instance.get(`customer/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

export const signup = createAsyncThunk(
  "customer/signup",
  async (param, thunkAPI) => {
    try {
      const signupData = param.formData;
      const navigate = param.navigate;
      const res = await instance.post("account/signup",signupData, {
        headers: "Access-Control-Allow-Origin",
      });     
      navigate("/sign-in");
      return res.data;
    } catch (err) {
      throw new Error(err.response.data);
    }
  }
);


// export const decodeTokenAndGetUserId = async (token) => {
//   try {
//     const decodedToken = jwt_decode(token);
//     const userId = await decodedToken[
//       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//     ];
//     return userId;
//   } catch (error) {
//     return null;
//   }
// };

const initialState = {
  msg: "",
  user: [],
  token: null,
  loading: false,
  error: "",
  manager: false,
  userById: {},
  userNumber: "",
  dataUser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
  },
});

const {
  reducer: authReducer,
  actions: { logoutUser },
} = authSlice;

export { logoutUser, authReducer as default };
