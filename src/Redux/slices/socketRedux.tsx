import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
  socket?: any;
  message?: string[];
  livemessage?: string | null;
  notification?: boolean;
}
const initialState: state = {
  socket: null,
  message: [],
  livemessage: null,
  notification: false,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (state.message) {
        state.message.push(action.payload);
      }
    },
    set_Live_Message: (state, action) => {
      state.livemessage = action.payload;
      state.notification = true;
    },
    set_notification: (state, action) => {
      state.notification = action.payload;
    },
  },
});
export const { addMessage, set_Live_Message, set_notification } =
  socketSlice.actions;
export default socketSlice.reducer;
