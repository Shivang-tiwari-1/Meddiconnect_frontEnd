import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance, axiosPrivate } from "../../Api/Axios.Api";
import {
  convertToLocalTime,
  convertToLocalTime2,
} from "../../Utility/Function";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Store/Store";
import useJwtInterceptors from "../../Interceptors/useJwtInterceptors";
import axios from "axios";
import {
  convertAMPMToISO,
  convertTo12HourFormat,
  generateTimeIntervals,
  hours,
} from "../../Services/service";
//-----------------------------------interfaces----------------------------------------//

export interface SignupPayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: number;
  profileImage?: string | null;
  address?: string;
  role?: string;
}

export interface Credentials {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  profileImage?: string;
  address?: string;
  phone?: string | Number;
  gender?: string;
}

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
}

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
}

//-----------------------------------interfaces----------------------------------------//

//-----------------------------------API-----------------------------------------------//

export const signup = createAsyncThunk(
  "user/signup",
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    try {
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
    try {
      const response = await axiosInstance.post(`api/authenticate/login`, {
        email,
        password,
        role,
      });
      if (response) {
        console.log(response);
        dispatch(toggleAlertCheck("User logged in"));
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
      } else if (statusCode === 401) {
        dispatch(toggleAlertCheck("All filds are required"));
        dispatch(toggleStatusCheck(403));
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
      const response = await axiosPrivate.get("api/authenticate/refreshToken");
      console.log(response);
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
    email: "",
    password: "",
    role: "",
    gender: "",
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

    setHoverField: (state, action) => {
      state.hoveredField = action.payload;
    },

    progressBar: (state, action) => {
      if ((state.currentStep, state.totalSteps)) {
        state.currentStep += action.payload;
        state.proggresWidth =
          ((state.currentStep - 1) / (state.totalSteps - 1)) * 100;
      }
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

      .addCase(login.fulfilled, (state, action) => {
        //patient
        if (action.payload?.data?.data?.role === "patient") {
          state.role = action?.payload?.data?.data?.role;
          state.pat_accessToken = action?.payload?.data?.accessToken;
          state.pat_refreshToken = action?.payload?.data?.refreshToken;
          state.userData = action?.payload?.data;
        }

        //doctor
        if (action.payload?.data?.data?.role === "doctor") {
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
          if (state?.userData?.data?.availability?.length > 0) {
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
        state.loading = true;
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

      .addCase(refresh?.fulfilled, (state, action) => {
        console.log(action);
        const { accessToken, refreshToken } = action?.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })

      .addCase(refresh?.rejected, (state) => {
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
} = signup_login.actions;

export default signup_login.reducer;
