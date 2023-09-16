import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// const flowBuilderSlice = createSlice({
//     initialState
// });

type OrbitMapSliceState = {
  // ----- Visual state -----
  leftPanelOpen: boolean;
};

const initialState: OrbitMapSliceState = {
  leftPanelOpen: false,
};

const orbitMapSlice = createSlice({
  name: "printLocations",
  initialState,
  reducers: {
    toggledLeftPanel: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === "undefined") {
        state.leftPanelOpen = !state.leftPanelOpen;
      } else {
        state.leftPanelOpen = action.payload;
      }
    },
  },
});

export const orbitMapActions = orbitMapSlice.actions;
export const orbitMapReducer = orbitMapSlice.reducer;

export const printLocationsSelectors = {
  visualState: {
    leftPanelOpen: (state: RootState) => state.orbitMap.leftPanelOpen,
  },
} as const;
