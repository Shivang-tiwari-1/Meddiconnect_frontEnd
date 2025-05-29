import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";
import {
  set_hashed_id,
  toggleAlertCheck,
  toggleStatusCheck,
} from "./signup_login.";
import { convertToLocalTime2, createTime, currentTime } from "../../Utility/Function";
import {
  convertAMPMToISO,
  convertTo12HourFormat,
  generateTimeIntervals,
  hours,
} from "../../Services/service";
import moment from "moment";
import { RootState, useAppDispatch } from "../Store/Store";
import { setQuery } from "./StateChange.slice";

//-----------------------------------interfaces----------------------------------------//
interface patientPayload {
  id?: string | null;
  day: string | null;
  time: string | null;
}
export interface searchQuery {
  name: string;
  speacilistSearch: string;
  doctorSearch: string
}
interface distance {
  distance: number
}

interface patientState {
  doctors?: object[];
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
  openUserId?: string | null;
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
  current_day_schedul?: object[];
  allow_action?: boolean;
  filterResults?: object[];
  voiceLoader?: boolean;
  mediaRecorder?: any;
  audioChunks?: [];
  voice_popup?: boolean;
  voice_play?: boolean;
  stopQuery?: boolean;
  countries?: string[];
  indianStates?: string[];
  doctorByState?: object[];
  city: string | null;
  show5: boolean;
}

//-----------------------------------API-----------------------------------------------//
export const fetchAllDoctors = createAsyncThunk(
  "patient/fetchAllDoctors",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { page } = (getState() as RootState).stateChange;
      const response = await axiosPrivate.get(`/api/patient/fetchalldoctors`, {
        params: {
          redisKey: "fetchAllDoctors",
          page: page
        },
      });

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
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { doc_accessToken, pat_accessToken, role } = (
        getState() as RootState
      ).states;
      const access_Token =
        role === "patient" ? pat_accessToken : doc_accessToken;
      const response = await axiosPrivate.get(`/api/patient/getData`, {
        params: {
          redisKey: "getUserData",

        },

        headers: {
          Authorization: `Bearer ${access_Token}`,
        },

      },);


      if (response) {
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
export const BookAppointMent = createAsyncThunk(
  "patient/BookAppointMent",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/api/patient/makeappointment/${id}`,
        null,                                 // no request body
        { params: { redisKey: "BookAppointMent" } }
      );
      // now response is guaranteed truthy
      dispatch(setQuery({ field: 'bookAppointment', value: false }));
      dispatch(toggleAlertCheck("Appointment Booked"));
      dispatch(toggleStatusCheck(200));
      return response.data;                  // always return
    } catch (error: any) {
      const statusCode = error.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else {
        dispatch(toggleAlertCheck("Technical error occurred"));
        dispatch(toggleStatusCheck(statusCode || 500));
      }
      return rejectWithValue(error.response?.data);
    }
  }
);
export const CancleAppointment = createAsyncThunk(
  "patient/CancleAppointment",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        `/api/patient/cancleappointment/${id}`,
        {
          params: {
            redisKey: "CancleAppointment",
          },
        }
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
      const response = await axiosPrivate.get(`/api/patient/history`, {
        params: {
          redisKey: "history",
        },
      });
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
        `/api/patient/doctorDetail/${id}`,
        {
          params: {
            redisKey: "getDoctorDetails",
          },
        }
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
        `api/patient/fetchsidebarcontent`,
        {
          params: {
            redisKey: "fetchsidebarcontent",
          },
        }
      );
      if (resposne) {
        dispatch(setQuery({ field: "sideBarContent", value: false }))
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
export const doctorInProximity = createAsyncThunk(
  "patient/nearest",
  async (distance: distance, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/patient/nearest", {
        distance: distance
      }, {
        params: {
          redisKey: `nearest_doctor:${distance}`,
        }
      });
      if (response) {
        dispatch(toggleAlertCheck("nearest available doctors"));
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

//-----------------------------------JS-API-----------------------------------------------//


const initialState: patientState = {
  indianStates: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ],
  countries: [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Brazzaville)",
    "Congo (Kinshasa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ],
  voice_popup: false,
  voice_play: false,
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
    speacilistSearch: '',
    doctorSearch: ''
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
  current_day_schedul: [{}],
  allow_action: false,
  filterResults: [],
  voiceLoader: false,
  mediaRecorder: null,
  audioChunks: [],
  stopQuery: false,
  doctorByState: [],
  city: null,
  show5: false
};

const patientState = createSlice({
  name: "patientState",
  initialState,
  reducers: {
    voice_Popup: (state, action) => {
      state.voice_popup = action.payload;
    },
    voice_play: (state, action) => {
      state.voice_play = action.payload;
    },
    toogleShow: (state, action) => {
      state.show = action.payload
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
    toogleShow5: (state) => {
      state.show5 = !state.show5;
    },
    setOpenDoctorId: (state, action) => {
      state.openUserId = action?.payload;
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
        return (slot as any)?._id === action?.payload;
      });
    },
    set_disable: (state, action) => {
      if (state.doctors) {
        if (state.doctors.includes(action?.payload)) {
          const find_doc = state.doctors.find(
            (doc) => (doc as any)._id === action.payload
          );

          if (find_doc && (find_doc as any).availability?.length === 0) {
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
        (state as any)?.intervalMinutes
      );

      const AddAMPM = interval.map(convertTo12HourFormat);
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
        (state as any).appointmementdata.time = "";
      }
      state.appointmementdata[key] = item;
    },
    current_doctor_schedul: (state: any, action) => {
      const { id, day } = action.payload
      if (state.doctors) {
        const data = state?.doctors?.find((data) => {
          return (data as any)?._id === id
        });
        const doc = data.availability.find((data: any) => {
          return data.day === day
        });
        state.current_day_schedul = doc;
        const now = currentTime();
        const start = createTime((doc as any)?.start);
        const end = createTime((doc as any)?.end);
        if (moment(now).isBetween(start, end)
        ) {
          state.allow_action = true
        }
      }
    },
    set_filterResults: (state, action) => {
      const result = action.payload.filter((doctor) => {
        (doctor as any)?.name.toLowerCase().includes(state.searchQuery?.name?.toLowerCase() || 0)
      });
      state.filterResults = result
    },
    set_voiceLoader: (state: any, action) => {
      state.voiceLoader = action.payload;
    },
    doctor_by_state: (state, action) => {
      const { State, value } = action.payload;

      const stateLower = State?.toLowerCase();
      const valueLower = value?.toLowerCase();

      const data = state.doctors?.filter((doctor) => {
        const doctorState = (doctor as any)?.state?.toLowerCase();
        return doctorState === stateLower || doctorState === valueLower;
      });
      state.city = value;
      state.doctorByState = data;
    }
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDoctors.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllDoctors?.fulfilled, (state, action) => {
        state.loading = true;
        if (action.payload.some(current => (state as any).doctors.some(prev => current?._id === (prev as any)?._id))) {
        } else {
          if (action.payload.length === 0 || action.payload === null || !Array.isArray(action.payload)) {
            if (action.payload.length === 0) {
              state.stopQuery = true
            }
            return
          } else {
            if (state.doctors?.length === 0) {
              state.doctors = action.payload.filter((data) => {
                return data?.availability.length !== 0 && data.qualification.length !== 0 && data?.specialization.length !== 0
              })
            } else {
              for (let data of action.payload) {

                if (data?.specialization.length === 0 && data.qualification.length === 0 && data?.availability.length === 0) {
                } else {
                  state.doctors && state?.doctors.push(data);

                }
              }
            }
          }
        }
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
        console.log("🎉 Fulfilled!", action.payload);
        state.loading = false;
      })
      .addCase(CancleAppointment.pending, (state) => { })
      .addCase(CancleAppointment.rejected, (state, action) => { })
      .addCase(CancleAppointment.fulfilled, (state, action) => { })
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
      })
      .addCase(BookAppointmentManually.pending, (state) => { })
      .addCase(BookAppointmentManually.rejected, (state, action) => { })
      .addCase(BookAppointmentManually.fulfilled, (state, action) => { })
      .addCase(getDoctorDetails.pending, (state) => { })
      .addCase(getDoctorDetails.rejected, (state) => { })
      .addCase(getDoctorDetails.fulfilled, (state, action) => { })
      .addCase(sideBarContent.fulfilled, (state, action) => {
        const newAddress = action.payload.data[0].address;
        const newDoctors = action.payload.data[0].doctors;
        const specialized__In = action.payload.data[0].specialization;
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

        specialized__In.forEach((specialized_In) => {
          let condition = true;

          if (state.specializedIn.length === 0) {
            state.specializedIn = specialized__In;
          } else {
            for (const data of specialized__In) {
              if (state.specializedIn.includes(data.field.field)) {
                condition = false
              }
            }
            if (!condition) {
              state.specializedIn.push(specialized_In);
            }
          }

        });
      })
      .addCase(sideBarContent.pending, (state, action) => { })
      .addCase(sideBarContent.rejected, (state, action) => { });
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
  current_doctor_schedul,
  set_filterResults,
  set_voiceLoader,
  voice_Popup,
  voice_play,
  doctor_by_state,
  toogleShow5
} = patientState.actions;
export default patientState.reducer;
