import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { orbitMapReducer } from "../features/orbitMap/orbitMapSlice";
export const store = configureStore({
  reducer: {
    orbitMap: orbitMapReducer,
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
