import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// const flowBuilderSlice = createSlice({
//     initialState
// });

type PrintLocationsSliceState = {
  // ----- Visual state -----
  leftPanelOpen: boolean;
};

const initialState: PrintLocationsSliceState = {
  leftPanelOpen: false,
};

const printLocationsSlice = createSlice({
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

export const printLocationsActions = printLocationsSlice.actions;
export const printLocationsReducer = printLocationsSlice.reducer;

export const printLocationsSelectors = {
  visualState: {
    leftPanelOpen: (state: RootState) => state.printLocations.leftPanelOpen,
  },
} as const;
