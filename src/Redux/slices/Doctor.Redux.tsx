import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";
import { toggleAlertCheck, toggleStatusCheck } from "./signup_login.";

//-----------------------------------interfaces----------------------------------------//
interface doctorPayload {
  HowManyPatients?: number | null;
  day?: string | null;
  start?: string | null;
  end?: string | null;
}
interface stateManagement {
  doctordata?: {};
  loading?: boolean;
}
//-----------------------------------interfaces----------------------------------------//

//-----------------------------------API-----------------------------------------------//

export const getDoctorData = createAsyncThunk(
  "patient/getDoctorData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`api/patient/getDoctordata`);
      return response?.data;
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 500) {
        dispatch(toggleAlertCheck("Technical error occured"));
        dispatch(toggleStatusCheck(500));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getDetailOfthePatient = createAsyncThunk(
  "patient/getDetailOfthePatient",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`api/patient/getDoctordata`);
 
      return response?.data;
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 500) {
        dispatch(toggleAlertCheck("Technical error occured"));
        dispatch(toggleStatusCheck(500));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const setCriteria = createAsyncThunk(
  "patient/setCriteria",
  async (
    { HowManyPatients, day, start, end }: doctorPayload,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosPrivate.post(`api/doctor/setcriteria`, {
        HowManyPatients: HowManyPatients,
        day: day,
        start: start,
        end: end,
      });
      if (response) {
        dispatch(toggleAlertCheck("Criteria has beee set"));
        dispatch(toggleStatusCheck(200));
        return response?.data;
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 500) {
        dispatch(toggleAlertCheck("Technical error occured"));
        dispatch(toggleStatusCheck(500));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const manualUpdate = createAsyncThunk(
  "patient/updatemanually",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("api/doctor/updatemanually");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//-----------------------------------API-----------------------------------------------//

const initialState: stateManagement = {
  doctordata: {},
  loading: true,
};
const DoctorState = createSlice({
  name: "DoctorState",
  initialState,
  reducers: {},

  extraReducers: (builders) => {
    builders
      .addCase(getDoctorData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctorData.fulfilled, (state, action) => {
        state.loading = false;
        state.doctordata = action.payload;
      })
      .addCase(getDoctorData.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailOfthePatient.fulfilled, (state, action) => {})
      .addCase(getDetailOfthePatient.pending, (state, action) => {})
      .addCase(getDetailOfthePatient.rejected, (state, action) => {})
      .addCase(setCriteria.fulfilled, (state, action) => {})
      .addCase(setCriteria.pending, (state, action) => {})
      .addCase(setCriteria.rejected, (state, action) => {})
      .addCase(manualUpdate.fulfilled, (state, action) => {})
      .addCase(manualUpdate.pending, (state, action) => {})
      .addCase(manualUpdate.rejected, (state, action) => {});
  },
});

export const {} = DoctorState.actions;
export default DoctorState.reducer;
