import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Admin } from "./adminModel";

export const getByCookie = createAsyncThunk(
  "getByCookie",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/admin/get-from-cookie");
      if (!data) throw new Error("no data from get_by_cookie");
      const { adminDB } = data;
      return adminDB;
    } catch (error: any) {
      console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
);
