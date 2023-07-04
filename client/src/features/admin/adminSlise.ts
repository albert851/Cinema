import { createSlice } from "@reduxjs/toolkit";
import { getByCookie } from "./adminApi";
import { RootState } from "../../app/store";
import { Admin } from "./adminModel";

export enum Status {
  LOADING = "loading",
  IDLE = "idle",
  FAILED = "failed",
}

export interface adminState {
  value: Admin | null;
  status: Status;
}

const initialState: adminState = {
  value: null,
  status: Status.IDLE,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getByCookie.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getByCookie.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      })
      .addCase(getByCookie.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const adminSelector = (state: RootState) => state.admin.value;
export const adminStatusSelector = (state: RootState) => state.admin.status;

export default adminSlice.reducer;
