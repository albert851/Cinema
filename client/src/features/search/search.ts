import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SearchState {
  searchValue: string;
  ageSearch: string;
  genreeSearch: string;
}

const initialState: SearchState = {
  searchValue: "",
  ageSearch: "",
  genreeSearch: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchValue = action.payload.searchValue;
      state.ageSearch = action.payload.ageSearch;
      state.genreeSearch = action.payload.genreeSearch;
    },
    resetSearch: (state) => {
      state = initialState;
    },
  },
});

export const { search, resetSearch } = searchSlice.actions;

export const searchSelector = (state: RootState) => state.search;

export default searchSlice.reducer;
