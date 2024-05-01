import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axiosCustom";



export const getAllPayments = createAsyncThunk(
  "payment/getAllPayments",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/payment');
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getPaymentByProgramApplicationId = createAsyncThunk(
  "payment/getPaymentsByProgramApplicationId",
  async (programApplicationId, thunkAPI) => {
    try {
      const response = await instance.get(`/payment/program-application/${programApplicationId}`);
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (paymentData, thunkAPI) => {
    try {
      // Directly pass paymentData as the body of the POST request
      const response = await instance.post('/payment', paymentData);
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
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await instance.put(`/payment/${id}`, data);
      console.log("Update Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API error on update:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (paymentId, thunkAPI) => {
    try {
      const response = await instance.get(`/payment/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error("API error when fetching payment by ID:", error);
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
    .addCase(getAllPayments.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.allPayments = action.payload; // Lưu các thanh toán vào state
    })
    .addCase(getAllPayments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(getPaymentByProgramApplicationId.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPaymentByProgramApplicationId.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentsByApplicationId = action.payload; // Lưu các thanh toán theo id vào state
    })
    .addCase(getPaymentByProgramApplicationId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
.addCase(getPaymentById.pending, (state) => {
  state.loading = true;
})
.addCase(getPaymentById.fulfilled, (state, action) => {
  state.loading = false;
  state.currentPayment = action.payload;
})
.addCase(getPaymentById.rejected, (state, action) => {
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
})
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
      });
   
  },
});


const { reducer: paymentReducer } = paymentSlice;
export { paymentReducer as default };
