import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";

//-----------------------------------interfaces----------------------------------------//
interface patientPayload {
  id?: string | null;
  day: string | null;
  time: string | null;
}
interface patientState {
  doctors?: [];
  loading?: boolean;
  patientData?: object;
  show?: boolean;
  doctorDetails?: object;
  Appointmenthistory?: [];
  error?: boolean;
}

//-----------------------------------interfaces----------------------------------------//

//-----------------------------------API-----------------------------------------------//
export const fetchAllDoctors = createAsyncThunk(
  "patient/fetchAllDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/api/patient/fetchalldoctors`);
      console.log("response getdoctro->", response?.data?.data);
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserData = createAsyncThunk(
  "patient/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/api/patient/getData`);
      console.log("response->redux", response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const BookAppointMent = createAsyncThunk(
  "patient/BookAppointMent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/api/patient/makeappointment/${id}`
      );
      console.log("response->", response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CancleAppointment = createAsyncThunk(
  "patient/CancleAppointment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/api/patient/cancleappointment/${id}`
      );
      console.log("response->", response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const history = createAsyncThunk(
  "patient/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/api/patient/history`);
      console.log("response->", response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const BookAppointmentManually = createAsyncThunk(
  "patient/BookAppointmentManually",
  async ({ day, time, id }: patientPayload, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/api/patient/makeappointment_manually/${id}`,
        {
          day: day,
          time: time,
        }
      );
      console.log("response->", response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getDoctorDetails = createAsyncThunk(
  "patient/getDoctorDetails",
  async (id, { rejectWithValue }) => {
    try {
      const resposne = await axiosPrivate.get(
        `/api/patient/doctorDetail/${id}`
      );
      console.log("response getdoctro->", resposne?.data?.data?.data);
      return resposne?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//-----------------------------------API-----------------------------------------------//

const initialState: patientState = {
  doctors: [],
  loading: false,
  patientData: {},
  show: false,
  doctorDetails: {},
  error: false,
  Appointmenthistory: [],
};

const patientState = createSlice({
  name: "patientState",
  initialState,
  reducers: {
    toogleShow: (state) => {
      state.show = !state.show;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchAllDoctors?.fulfilled, (state, action) => {
        state.loading = true;
        state.doctors = action?.payload;
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.patientData = action?.payload;
        console.log("->->", action?.payload);
      })
      .addCase(BookAppointMent.pending, (state) => {})
      .addCase(BookAppointMent.rejected, (state, action) => {})
      .addCase(BookAppointMent.fulfilled, (state, action) => {})
      .addCase(CancleAppointment.pending, (state) => {})
      .addCase(CancleAppointment.rejected, (state, action) => {})
      .addCase(CancleAppointment.fulfilled, (state, action) => {})
      .addCase(history.pending, (state) => {
        state.loading = true;
      })
      .addCase(history.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(history.fulfilled, (state, action) => {
        state.loading = false;
        console.log("->",action?.payload?.data)
        state.Appointmenthistory = action?.payload?.data;
      })
      .addCase(BookAppointmentManually.pending, (state) => {})
      .addCase(BookAppointmentManually.rejected, (state, action) => {})
      .addCase(BookAppointmentManually.fulfilled, (state, action) => {})
      .addCase(getDoctorDetails.pending, (state) => {})
      .addCase(getDoctorDetails.rejected, (state) => {})
      .addCase(getDoctorDetails.fulfilled, (state, action) => {});
  },
});

export const { toogleShow } = patientState.actions;
export default patientState.reducer;
