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
          },
        });
        console.log("response22",response)
        return response.data;
      } catch (error) {
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
      });
  },
});


const { reducer: paymentReducer } = paymentSlice;
export { paymentReducer as default };
