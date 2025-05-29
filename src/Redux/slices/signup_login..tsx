import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance, axiosPrivate } from "../../Api/Axios.Api";
import {
  convertToLocalTime2,
} from "../../Utility/Function";
import axios from "axios";
import {
  convertAMPMToISO,
  hours,
} from "../../Services/service";
import { RootState } from "../Store/Store";
import { setavailabilityExists, setqualificationExists, setspecializationExists } from "./Doctor.Redux";
import { updateProgressBar } from "../../Sockets/Initialize_socket";
import moment from "moment";

//-----------------------------------interfaces----------------------------------------//
export interface SignupPayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: number;
  profileImage?: string | null;
  address?: string;
  role?: string;
};
export interface Credentials {
  name?: string;
  email?: string;
  password: string;
  role?: string;
  profileImage?: string;
  address?: string;
  phone?: string | Number | null;
  gender?: string;
};
interface UserData {
  data: {
    address: string;
    availability: Array<{ day?: string; start?: string; end?: string }>;
    email: string;
    gender: string;
    history: Array<Record<string, any>>;
    name: string;
    patientStatus: Array<{ status?: string; date?: string }>;
    phone: number;
    profileImage: string;
    qualification: Array<{ degree?: string; institution?: string }>;
    role: string;
    specialization: Array<{ field?: string; years?: number }>;
  };
};
interface coordinates {
  latitude: number;
  longitude: number;
};
interface patient {
  role: string;
  accessToken: string;
  refreshToken: string;
  userData: object;
};
interface doctor {
  role: string;
  accessToken: string;
  refreshToken: string;
  userData: object;
  qualification: [];
  availabilityExists: [];
  specializationExists: [];
};
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  qualification?: any[];
  availability?: {
    day: string;
    start: string;
    end: string;
  }[];
  specialization?: any[]; // Replace `any` with the actual type if available
  [key: string]: any; // For any additional dynamic fields
};
interface PatientState {
  role: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  userData: UserData | null;
};
interface DoctorState {
  role: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  userData: UserData | null;
};
// interface DoctorState {
//   role?: string | null;
//   accessToken?: string | null;
//   refreshToken?: string | null;
//   userData?: UserData | null;
//   qualificationExists?: boolean;
//   availabilityExists?: boolean;
//   specializationExists?: boolean;
//   currentStep?: number;
//   progressWidth?: number;
//   date?: string | null;
//   day?: string | null;
//   document?: {
//     day: string;
//     start: string;
//     end: string;
//   } | null;
//   totalMinutes?: number;
//   startTime?: string | null;
//   endTime?: string | null;
//   value?: boolean;
// };
interface stateManagement {
  showPassword: boolean;
  termsAccepted: boolean;
  confirmPassword: string;
  role: string;
  loading: boolean | null;
  refreshToken: string | null;
  error: boolean | null;
  mobile?: string | null;
  tablet?: string | null;
  laptop?: string | null;
  laptopBool?: boolean;
  tabletBool?: boolean;
  mobileBool?: boolean;
  alert: string | null;
  status?: number | null;
  credentials?: Credentials;
  hoveredField?: string;
  userData?: Object;

  proggresWidth: number | null;
  currentStep: number;
  totalSteps: number;
  document: object;
  currentTime: string;
  startTime: string;
  endTime: string;
  sendTime: string;
  time: string;
  value: boolean | null;
  now: Date | null;
  date: string;
  day: string;
  specializationExists?: boolean;
  qualificationExists?: boolean;
  availabilityExists?: boolean;
  doc_accessToken?: string | null;
  doc_refreshToken?: string | null;
  pat_accessToken: string | null;
  pat_refreshToken?: string | null;
  intervalMinutes?: number;
  totalMinutes?: number;
  timings?: string[];
  geolocation?: any;
  coordinates?: coordinates;
  hashedData?: string;
  hashedFuntionName?: string;
  doc_data?: object;
  docisActive?: boolean;
  patientData?: PatientState;
  doctorData?: DoctorState;
};

//-----------------------------------API-----------------------------------------------//
let controller;
export const signup = createAsyncThunk(
  "user/signup",
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    try {
      for (let [key, value] of formData) {
        console.log(key, value);
      }

      const response = await axiosInstance.post(
        `/api/authenticate/createuser`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response->", response);

      if (response) {
        dispatch(toggleAlertCheck("User registered successfully"));
        dispatch(toggleStatusCheck(200));
        return response.data;
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      } else {
        dispatch(toggleAlertCheck("An error occurred"));
        dispatch(toggleStatusCheck(500));
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);
export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password, role }: SignupPayload,
    { dispatch, rejectWithValue, getState }
  ) => {
    let response;
    try {
      if (controller) {
        controller.abort();
      }

      controller = new AbortController();
      response = await axiosInstance.post(`api/authenticate/login`, {
        email,
        password,
        role,
      }, {
        signal: controller.signal
      });

      if (response) {
        dispatch(toggleAlertCheck("User logged in"));
        dispatch(toggleStatusCheck(200));

        if (response?.data?.data?.data?.role === "doctor") {
          if (response?.data?.data?.data?.qualification?.length > 0) {
            dispatch(setqualificationExists(true))
          }

          if (response?.data?.data?.data?.availability?.length > 0) {
            dispatch(setavailabilityExists(true))
          }

          if (response?.data?.data?.data?.specialization?.length > 0) {
            dispatch(setspecializationExists(true))
          }

        }
        return response?.data;
      }
    } catch (error) {
      if (error.name === 'CanceledError') {
        console.log('Login request canceled');
        return rejectWithValue('Request canceled');
      }
      const statusCode = error?.response?.status;
      if (statusCode === 400) {
        dispatch(toggleAlertCheck("Wrong credentials"));
        dispatch(toggleStatusCheck(400));
      } else if (statusCode === 403) {
        dispatch(toggleAlertCheck("User not found"));
        dispatch(toggleStatusCheck(403));
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All fields are required"));
        dispatch(toggleStatusCheck(401));
      } else {
        dispatch(toggleAlertCheck("No response from the server"));
        dispatch(toggleStatusCheck(500));
      }
      return rejectWithValue(error?.response?.data);
    }


  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const resposne = await axiosPrivate.post("api/authenticate/logout");
      if (resposne) {
        console.log(resposne);
        dispatch(toggleAlertCheck("loggedout"));
        dispatch(toggleStatusCheck(200));
      }
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
export const refresh = createAsyncThunk(
  "user/refreshToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/authenticate/refreshtoken", {

      });
      return response?.data;
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 500) {
        dispatch(toggleAlertCheck("could not retrive the token "));
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getAddressFromCoordinates = createAsyncThunk(
  "user/geoCoordinate",
  async ({ latitude, longitude }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${"c9fe87d9e2d44cbcb1f4537850c7971b"}`
      );
      const address = response.data.results[0]?.formatted;
      console.log(address);
      return address;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//-----------------------------------API-----------------------------------------------//

const initialState: stateManagement = {
  specializationExists: false,
  qualificationExists: false,
  availabilityExists: false,
  showPassword: false,
  termsAccepted: false,
  confirmPassword: "",
  role: "",
  loading: null,
  refreshToken: null,
  error: null,
  mobile: "",
  tablet: "",
  laptop: "",
  mobileBool: false,
  tabletBool: false,
  laptopBool: false,
  alert: null,
  status: null,
  credentials: {
    name: "",
    email: "",
    password: "",
    role: "",
    gender: "",
    profileImage: "",
    address: "",
    phone: null,
  },
  hoveredField: "",
  userData: {
    data: {
      address: "",
      availability: [{}],
      email: "",
      gender: "",
      history: [{}],
      name: "",
      patientStatus: [{}],
      phone: 0,
      profileImage: "",
      qualification: [{}],
      role: "",
      specialization: [{}],
    },
  } as UserData,
  proggresWidth: null,
  currentStep: 1,
  totalSteps: 4,
  document: {},
  currentTime: "",
  startTime: "",
  endTime: "",
  time: "",
  value: null,
  now: null,
  day: "",
  sendTime: "",
  date: "",
  doc_accessToken: null,
  pat_accessToken: null,
  doc_refreshToken: null,
  pat_refreshToken: null,
  totalMinutes: 0,
  intervalMinutes: 15,
  timings: [],
  geolocation: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  hashedFuntionName: "",
  hashedData: "",
  docisActive: false,
  patientData: {
    role: null,
    accessToken: null,
    refreshToken: null,
    userData: null,
  },
  doctorData: {
    role: null,
    accessToken: null,
    refreshToken: null,
    userData: null,
  }
};

const signup_login = createSlice({
  name: "states",
  initialState,
  //-------------------------------Reducers-for-state-------------------------------//
  reducers: {
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },

    toogleTermAcdepted: (state) => {
      state.termsAccepted = !state.termsAccepted;
    },

    toogleCongirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },

    tooglePatientCheck: (state, action) => {
      state.role = action.payload;
    },

    toogleMobileCheck: (state, action) => {
      state.mobileBool = action.payload;
    },

    toggleTabletCheck: (state, action) => {
      state.tabletBool = action.payload;
    },

    toogleLaptopCheck: (state) => {
      state.laptopBool = !state.laptopBool;
    },

    toggleAlertCheck: (state, action) => {
      state.alert = action.payload;
    },

    toggleStatusCheck: (state, action) => {
      state.status = action.payload;
    },

    setCredentials: (
      state,
      action: PayloadAction<{ field: keyof Credentials; value: string }>
    ) => {
      const { field, value } = action.payload;

      if (state.credentials) {
        state.credentials[field] = value;
      }
    },

    reSetCredentials: (state: any) => {
      Object.entries(state.credentials).forEach(([key]) => {
        state.credentials[key] = '';
      })
    },

    setHoverField: (state, action) => {
      state.hoveredField = action.payload;
    },

    progressBar: (state, action) => {

      if ((state.currentStep, state.totalSteps)) {
        state.currentStep += action.payload;
        console.log()
        if (state.currentStep > 4) {
          console.log("limit reached")

        } else {
          state.proggresWidth =
            ((state.currentStep - 1) / (state.totalSteps - 1)) * 100;
        }

      }
    },

    set_coordinates: (state, action) => {
      const { lat, lng } = action.payload;

      if (state.coordinates) {
        state.coordinates.latitude = lat;
        state.coordinates.longitude = lng;
      }
    },

    set_hashed_id: (state, action) => {
      state.hashedData = action.payload;
      console.log(JSON.parse(JSON.stringify(state.hashedData)));
    },

    set_doc_isActive: (state) => {
      state.docisActive = !state.docisActive;
    },
  },
  //-------------------------------Builders-for-quaries-------------------------------//
  extraReducers: (builders) => {
    builders
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: any, action) => {
        //patient
        if (action.payload.data.data.role === "patient") {
          const patientdata = {
            ...state.patientData,
            role: action.payload.data.data.role,
            accessToken: action.payload.data.accessToken,
            refreshToken: action.payload.data.refreshToken,
            userData: action.payload.data,
          };
          state.patientData = patientdata
          // const date = moment(new Date()).format("MM-DD-YYYY");

        } else if (action.payload.data.data.role === "doctor") {
          const daoctodata = {
            ...state.doctorData,
            role: action.payload.data.data.role,
            accessToken: action.payload.data.accessToken,
            refreshToken: action.payload.data.refreshToken,
            userData: action.payload.data,
          };
          state.doctorData = daoctodata
        }

        if (action.payload?.data?.data?.role === "patient") {
          state.role = action?.payload?.data?.data?.role;
          state.pat_accessToken = action?.payload?.data?.accessToken;
          state.pat_refreshToken = action?.payload?.data?.refreshToken;
          state.userData = action?.payload?.data.data;
        } else {
          state.role = action?.payload?.data?.data?.role;
          state.doc_accessToken = action?.payload?.data?.accessToken;
          state.doc_refreshToken = action?.payload?.data?.refreshToken;
          if (state.userData) {
            const incomingData = action.payload.data;
            Object.keys(state.userData).forEach((key) => {
              if (incomingData[key] !== undefined) {
                (state.userData as any)[key] = incomingData[key];
              }
            });
          }

          if (state?.userData?.data?.qualification?.length > 0) {
            state.qualificationExists = true;
          }
          if ((state as any).userData?.data?.availability?.length > 0) {
            state.availabilityExists = true;
          }
          if (state?.userData?.data?.specialization?.length > 0) {
            state.specializationExists = true;
          }

          const now = new Date();
          state.date = now.toLocaleDateString();
          state.day = now
            .toLocaleDateString("en-US", { weekday: "long" })
            .toLowerCase()
            .toString();

          const document = state?.userData?.data?.availability?.find(
            (index: any) => index?.day === state.day
          );
          state.document = document;
          if (document !== undefined) {
            const starting = convertToLocalTime2(document?.start);
            const ending = convertToLocalTime2(document?.end);

            const currentTime = now.toTimeString().slice(0, 8);
            const totalHour = hours(starting, ending);
            state.totalMinutes = totalHour * 60;
            const generate_time = convertAMPMToISO(starting);
            state.currentTime = currentTime;
            state.startTime = String(starting);
            state.endTime = String(ending);

            state.value =
              currentTime >= state.startTime || currentTime <= state.endTime;
          }

          let stepIncrement = 0;
          if (action.payload.data.specialization?.length > 0) {
            stepIncrement += 1;
          }
          if (action.payload.data.availability?.length > 0) {
            stepIncrement += 1;
          }
          if (action.payload.data.qualification?.length > 0) {
            stepIncrement += 1;
          }
          state.currentStep += stepIncrement;
          state.proggresWidth =
            ((state.currentStep - 1) / (state.totalSteps - 1)) * 100;
        }
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        if (state?.role === "patient") {
          state.pat_accessToken = null;
          state.pat_refreshToken = null;
        } else {
          state.doc_refreshToken = null;
          state.doc_accessToken = null;
        }
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(refresh.pending, (state) => {
        state.loading = true;
      })
      .addCase(refresh?.fulfilled, (state: any, action) => {
        const { accessToken, refreshToken, data } = action?.payload;


        console.log(data.data)
        if (data?.data?.role === "patient") {
          const patientdata = {
            ...state.patientData,
            role: data?.data?.role,
            accessToken: data?.ccessToken,
            refreshToken: data?.refreshToken,
            userData: data.data,
          };
          state.patientData = patientdata
        } else if (data?.data?.role === "doctor") {
          const daoctodata = {
            ...state.doctorData,
            role: data?.data?.role,
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
            userData: data?.data,
          };
          state.doctorData = daoctodata
        }

        if (data?.data?.role === "patient") {
          state.role = data?.data?.role;
          state.pat_accessToken = data?.accessToken;
          state.pat_refreshToken = data?.refreshToken;
          state.userData = data?.data;
        }
        console.log("--------->", JSON.parse(JSON.stringify(state.role)));
      })
      .addCase(refresh?.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAddressFromCoordinates?.fulfilled, (state: any, action) => {
        state.geolocation = action.payload.data;
        if (action.payload) {
          state.geolocation = action.payload;
          state.credentials.address = state.geolocation;
          state.loading = false;
        }
      })
      .addCase(getAddressFromCoordinates?.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAddressFromCoordinates?.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  toggleShowPassword,
  toogleTermAcdepted,
  toogleCongirmPassword,
  tooglePatientCheck,
  toogleMobileCheck,
  toggleTabletCheck,
  toogleLaptopCheck,
  toggleAlertCheck,
  toggleStatusCheck,
  setCredentials,
  setHoverField,
  progressBar,
  set_coordinates,
  set_hashed_id,
  set_doc_isActive,
  reSetCredentials
} = signup_login.actions;

export default signup_login.reducer;
