import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
  socket?: any;
  message?: string[];
  livemessage?: string | null;
  notification?: boolean;
  messagenotification?: boolean;
  display_message?: string
}
const initialState: state = {
  socket: null,
  message: [],
  livemessage: null,
  notification: false,
  messagenotification: false,
  display_message: ''
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (state.message) {
        state.message.push(action.payload);
        state.notification = true
      }
    },
    set_Live_Message: (state, action) => {
      state.livemessage = action.payload;
    },
    set_notification: (state, action) => {
      state.notification = action.payload;
    },
    set_messagenotification: (state, action) => {
      state.messagenotification = action.payload
    },
    set_message: (state, action) => {
      state.display_message = action.payload
      state.messagenotification = true
    }


  },
});
export const { addMessage, set_Live_Message, set_notification, set_messagenotification, set_message } =
  socketSlice.actions;
export default socketSlice.reducer;
