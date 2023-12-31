import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import adminSlice from "../features/admin/adminSlise";
import selectedFilmSlice from "../features/film/selectedFilm";
import searchSlice from "../features/search/search";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    film: selectedFilmSlice,
    search: searchSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
