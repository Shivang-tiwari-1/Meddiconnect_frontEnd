import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";
import { toggleAlertCheck, toggleStatusCheck } from "./signup_login.";
import { convertToLocalTime2 } from "../../Utility/Function";
import {
  convertAMPMToISO,
  convertTo12HourFormat,
  generateTimeIntervals,
  hours,
} from "../../Services/service";

//-----------------------------------interfaces----------------------------------------//
interface patientPayload {
  id?: string | null;
  day: string | null;
  time: string | null;
}
export interface searchQuery {
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
  address: string[];
  doctor: string[];
  specializedIn: object[];
  numbersOfDoctors: number;
  disable?: boolean;
  intervalMinutes?: number;
  totalMinutes?: number;
  timings?: any;
  days: string[];
  color?: number;
  appointmementdata?: object;
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
      console.log(response);
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

export const sideBarContent = createAsyncThunk(
  "patient/sideBarContent",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const resposne = await axiosPrivate.get(
        `api/patient/fetchsidebarcontent`
      );
      if (Response) {
        console.log(resposne);
        return resposne.data;
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
  doctor: [],
  specializedIn: [],
  address: [],
  numbersOfDoctors: 0,
  disable: false,
  totalMinutes: 0,
  intervalMinutes: 15,
  timings: [],
  days: [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ],
  color: 0,
  appointmementdata: {
    day: "",
    tine: "",
  },
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
    set_disable: (state, action) => {
      if (state.doctors) {
        if (state.doctors.includes(action?.payload)) {
          const find_doc = state.doctors.find(
            (doc) => doc._id === action.payload
          );

          if (find_doc && find_doc.availability?.length === 0) {
            state.disable = true;
          }
        }
      }
    },
    set_timings: (state, action) => {
      const { start, end } = action.payload;
      const starting = convertToLocalTime2(start);
      const ending = convertToLocalTime2(end);
      const totalHour = hours(starting, ending);
      state.totalMinutes = totalHour * 60;
      const generate_time = convertAMPMToISO(starting);
      const interval = generateTimeIntervals(
        generate_time.toISOString(),
        state?.totalMinutes,
        state?.intervalMinutes
      );
      const AddAMPM = interval.map(convertTo12HourFormat);
      console.log(state.timings.length);
      if (state.timings.length === 0) {
        state.timings.push(AddAMPM);
      } else {
        state.timings = [...AddAMPM];
      }
    },
    set_bookappointme: (state, action) => {
      const { key, item, index } = action.payload;
      if (!state.appointmementdata) {
        state.appointmementdata = {};
      }
      if (key === "day") {
        state.color = index;
        state.appointmementdata.time = "";
      }
      state.appointmementdata[key] = item;
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
      .addCase(getDoctorDetails.fulfilled, (state, action) => {})
      .addCase(sideBarContent.fulfilled, (state, action) => {
        const newAddress = action.payload.data[0].address;
        const newDoctors = action.payload.data[0].doctors;
        const specializedIn = action.payload.data[0].specializedIn;
        const NumberOfDoxtors = action.payload.data[0].totalDoctors;
        state.numbersOfDoctors = NumberOfDoxtors;
        newDoctors.forEach((doctors) => {
          if (!state.doctor.includes(doctors)) {
            state.doctor.push(doctors);
          }
        });

        newAddress.forEach((address) => {
          if (!state.address.includes(address)) {
            state.address.push(address);
          }
        });

        specializedIn.forEach((specializedIn) => {
          const condition = state.specializedIn.includes(specializedIn.field);
          if (!condition) {
            state.specializedIn.push(specializedIn.field);
          }
        });
      })
      .addCase(sideBarContent.pending, (state, action) => {})
      .addCase(sideBarContent.rejected, (state, action) => {});
  },
});

export const {
  toogleShow,
  toogleShow2,
  toogleShow3,
  toogleShow4,
  setSearchQuery,
  setOpenDoctorById,
  setOpenDoctorId,
  set_disable,
  set_timings,
  set_bookappointme,
} = patientState.actions;
export default patientState.reducer;
