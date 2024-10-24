import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";
import { toggleAlertCheck, toggleStatusCheck } from "./signup_login.";

//-----------------------------------interfaces----------------------------------------//
interface patientPayload {
  id?: string | null;
  day: string | null;
  time: string | null;
}
interface searchQuery {
  name: string;
}
interface patientState {
  doctors?: [];
  loading?: boolean;
  patientData?: object;
  show?: boolean;
  show2?: boolean;
  show3?: boolean;
  doctorDetails?: object;
  Appointmenthistory?: [];
  error?: boolean;
  hoveredField?: string;
  show4?: boolean;
  searchQuery?: searchQuery;
  showDoctorByid?: object | null;
  openDoctorId?: string | null;
}

//-----------------------------------interfaces----------------------------------------//

//-----------------------------------API-----------------------------------------------//
export const fetchAllDoctors = createAsyncThunk(
  "patient/fetchAllDoctors",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/api/patient/fetchalldoctors`);

      if (response) {
        return response?.data?.data;
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
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserData = createAsyncThunk(
  "patient/getUserData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/api/patient/getData`);
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

export const BookAppointMent = createAsyncThunk(
  "patient/BookAppointMent",
  async (id, { dispatch, rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axiosPrivate.post(
        `/api/patient/makeappointment/${id}`
      );
      if (response) {
        dispatch(toggleAlertCheck("Appointment Booked"));
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
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CancleAppointment = createAsyncThunk(
  "patient/CancleAppointment",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/api/patient/cancleappointment/${id}`
      );
      if (response) {
        dispatch(toggleAlertCheck("Appointment cancled"));
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
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const history = createAsyncThunk(
  "patient/history",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/api/patient/history`);
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
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const BookAppointmentManually = createAsyncThunk(
  "patient/BookAppointmentManually",
  async ({ day, time, id }: patientPayload, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/api/patient/makeappointment_manually/${id}`,
        {
          day: day,
          time: time,
        }
      );
      if (response) {
        dispatch(toggleAlertCheck("Appointment Booked"));
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

export const getDoctorDetails = createAsyncThunk(
  "patient/getDoctorDetails",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const resposne = await axiosPrivate.get(
        `/api/patient/doctorDetail/${id}`
      );
      return resposne?.data?.data;
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
//-----------------------------------API-----------------------------------------------//

const initialState: patientState = {
  doctors: [],
  loading: false,
  patientData: {},
  show: false,
  doctorDetails: {},
  error: false,
  Appointmenthistory: [],
  show2: false,
  show3: false,
  show4: false,
  searchQuery: {
    name: "",
  },
  showDoctorByid: null,
};

const patientState = createSlice({
  name: "patientState",
  initialState,
  reducers: {
    toogleShow: (state) => {
      state.show = !state.show;
    },
    toogleShow2: (state) => {
      state.show2 = !state.show2;
    },
    toogleShow3: (state) => {
      state.show3 = !state.show3;
    },
    toogleShow4: (state) => {
      state.show4 = !state.show4;
    },
    setOpenDoctorId: (state, action) => {
      state.openDoctorId = action?.payload;
    },
    setSearchQuery: (
      state,
      action: PayloadAction<{ field: keyof searchQuery; value: string }>
    ) => {
      const { field, value } = action?.payload;
      if (state?.searchQuery) {
        state.searchQuery[field] = value;
      }
    },
    setOpenDoctorById: (state, action) => {
      state.showDoctorByid = state?.doctors?.find((slot) => {
        return slot?._id === action?.payload;
      });
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
        console.log("action.payload",action?.payload)
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
      })
      .addCase(BookAppointMent.pending, (state) => {
        state.loading = true;
      })
      .addCase(BookAppointMent.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(BookAppointMent.fulfilled, (state, action) => {
        state.show = false;
        state.loading = false;
      })
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

        state.Appointmenthistory = action?.payload?.data;
        console.log("historyhere->", state.Appointmenthistory);
      })
      .addCase(BookAppointmentManually.pending, (state) => {})
      .addCase(BookAppointmentManually.rejected, (state, action) => {})
      .addCase(BookAppointmentManually.fulfilled, (state, action) => {})
      .addCase(getDoctorDetails.pending, (state) => {})
      .addCase(getDoctorDetails.rejected, (state) => {})
      .addCase(getDoctorDetails.fulfilled, (state, action) => {});
  },
});

export const {
  toogleShow,
  toogleShow2,
  toogleShow3,
  toogleShow4,
  setSearchQuery,
  setOpenDoctorById,
  setOpenDoctorId
} = patientState.actions;
export default patientState.reducer;
