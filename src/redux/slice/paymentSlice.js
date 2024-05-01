import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (paymentData, thunkAPI) => {
    try {
      const response = await instance.post('/payment', paymentData, {
        params: {
          amount: paymentData.amount,
          orderInfo: paymentData.orderInfo,
          img: paymentData.img
        },
      });
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createVnPayLink = createAsyncThunk(
  "payment/createVnPayLink",
  async ({amount, orderInfo, programApplicationId}, thunkAPI) => {
    try {
      // Prepare the data for the request
      const bodyData = {
        programApplicationId: programApplicationId
      };
      
      const response = await instance.post(`/payment/vnpay`, bodyData, {
        params: {
          amount: amount,
          orderInfo: orderInfo
        }
      });
      
      console.log("VNPAY Link Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("VNPAY API Error:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async ({ id, img }, thunkAPI) => {
    try {
      const response = await instance.put(`/payment/${id}`, { img });
      console.log("Update Response:", response);
      return response.data;
    } catch (error) {
      console.error("API error on update:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




const initialState = {
  loading: false,
  error: null,
  responseBody: null, 

};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.responseBody = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createVnPayLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVnPayLink.fulfilled, (state, action) => {
        state.loading = false;
        state.vnpayLink = action.payload;  
      })
      .addCase(createVnPayLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Payment updated:", action.payload);
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


const { reducer: paymentReducer } = paymentSlice;
export { paymentReducer as default };
