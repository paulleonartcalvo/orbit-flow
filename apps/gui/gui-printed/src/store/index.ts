import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { printLocationsReducer } from "../features/printLocations/printLocationsSlice";
export const store = configureStore({
  reducer: {
    printLocations: printLocationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
