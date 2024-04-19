import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUserAuthToken } from "../authService";
import instance from "../axiosCustom";
import jwtDecode from "jwt-decode";
export const login = createAsyncThunk(
  "customer/login",
  async (param, thunkAPI) => {
    try {
      const loginData = param.loginData;
      const navigate = param.navigate;
      const res = await instance.post("account/login", loginData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const token = res.data;
      setUserAuthToken(token);
      const role = jwtDecode(token).Role;
      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
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
      const res = await instance.get(`/account/customer/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "customer/getUserById",
  async (_, thunkAPI) => {
    try {
      const res = await instance.get("/account/customer"); // Gọi endpoint API để lấy danh sách tất cả các userId
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
      console.log(param);
      const res = await instance.post("account/signup", signupData);

      navigate("/sign-in");
      return res.data;
    } catch (err) {
      // Log and rethrow any errors
      console.error("Error creating account:", err);
      throw err;
    }
  }
);

export const updateUserById = createAsyncThunk(
  "customer/updateUserById",
  async (params, thunkAPI) => {
    const { userId, userData } = params;
    try {
      const res = await instance.put(`/account/customer/${userId}`, {
        ...userData,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendEmailForgotPassword = createAsyncThunk(
  "customer/sendEmail",
  async (params, thunkAPI) => {
    try {
      const email = params;
      const res = await instance.get(`account/reset-password?email=${email}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
  userById: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.msg = null;
      state.user = [];
      state.userById = {};
    },
    resetMessage: (state) => {
      state.error = null;
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
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload;
        state.error = action.error;
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload;
        state.error = action.error;
      })
      .addCase(updateUserById.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendEmailForgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendEmailForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.msg = "Gửi mail thành công";
      })
      .addCase(sendEmailForgotPassword.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

const {
  reducer: authReducer,
  actions: { logoutUser, resetMessage },
} = authSlice;

export { authReducer as default, logoutUser, resetMessage };
