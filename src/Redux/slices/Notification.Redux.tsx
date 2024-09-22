import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";
import { toggleAlertCheck, toggleStatusCheck } from "./signup_login.";

interface stateManagement {
  read?: boolean;
  loading?: boolean | null;
  notification?: string[];
}

const initialState: stateManagement = {
  read: false,
  loading: null,
  notification: [],
};

export const GetNotification = createAsyncThunk(
  "user/notification",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(
        "/api/Notification/getNotification"
      );
      console.log("response->", response);
      return response?.data;
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All filds are required"));
        dispatch(toggleStatusCheck(403));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const notification = createSlice({
  name: "Notify",
  initialState,
  reducers: {
    toogleReadCheck: (state) => {
      state.read = !state.read;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(GetNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetNotification.fulfilled, (state, action) => {
        state.notification = action.payload.data;
        console.log("action",  state.notification);
        state.loading = false;
      })
      .addCase(GetNotification.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { toogleReadCheck } = notification.actions;
export default notification.reducer;
