import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SelectedFilmState {
  id: string;
  title: string;
  genree: string;
  cast: string;
  age: string;
  pic: string;
  summary: string;
}

const initialState: SelectedFilmState = {
  id: "",
  title: "",
  genree: "",
  cast: "",
  age: "",
  pic: "",
  summary: "",
};

export const selectedFilmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    changeFilm: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.genree = action.payload.genree;
      state.cast = action.payload.cast;
      state.age = action.payload.age;
      state.pic = action.payload.pic;
      state.summary = action.payload.summary;
    },
    resetFilm: (state) => {
      state = initialState;
    },
  },
});

export const { changeFilm, resetFilm } = selectedFilmSlice.actions;

export const filmSelector = (state: RootState) => state.film;

export default selectedFilmSlice.reducer;