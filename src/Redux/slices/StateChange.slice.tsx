import { createSlice } from '@reduxjs/toolkit';


interface stateChange {
    isMobile?: boolean;
    gridView?: boolean;
}

export const StateChange = createSlice({
    name: "stateChange",
    initialState: {
        isMobile: false,
        gridView: false
    },
    reducers: {
        toggleMobileMode: (state) => {
            state.isMobile = !state.isMobile;
        },
        toogleGridChange: (state) => {
            state.gridView = !state.gridView;
        }
    }
});

export const { toggleMobileMode, toogleGridChange } = StateChange.actions;
export default StateChange.reducer;