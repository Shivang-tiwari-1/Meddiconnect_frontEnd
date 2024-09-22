import { createSlice } from "@reduxjs/toolkit";

interface change {
  isMobile?: boolean;
  gridView?: boolean;
  isTablet?: boolean;
  isDark?: boolean;
}
const initialState: change = {
  isMobile: false,
  gridView: false,
  isTablet: false,
  isDark: false,
};

const StateChange = createSlice({
  name: "Change",
  initialState,
  reducers: {
    toggleMobileMode: (state) => {
      state.isMobile = !state.isMobile;
    },
    toogleGridChange: (state) => {
      state.gridView = !state.gridView;
    },
    toggleTabletMode: (state) => {
      state.isTablet = !state.isTablet;
    },
    toogleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const {
  toggleMobileMode,
  toogleGridChange,
  toggleTabletMode,
  toogleDarkMode,
} = StateChange.actions;
export default StateChange.reducer;
