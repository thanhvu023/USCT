import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const axiosUs = axios.create({
  baseURL: "https://usstudy.monoinfinity.net/v3/",
});

