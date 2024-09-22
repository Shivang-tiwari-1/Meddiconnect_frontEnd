import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";

//-----------------------------------interfaces----------------------------------------//
interface SignupPayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: number;
  profileImage?: string | null;
  address?: string;
  role?: string;
}

interface Credentials {
  email: string;
  password: string;
  role: string;
}

interface stateManagement {
  showPassword: boolean;
  termsAccepted: boolean;
  confirmPassword: string;
  role: string;
  loading: boolean | null;
  accessToken: string | null;
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
}

//-----------------------------------interfaces----------------------------------------//

//-----------------------------------API-----------------------------------------------//

export const signup = createAsyncThunk(
  "user/signup",
  async (
    formData: FormData, // Accept FormData instead of SignupPayload
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosPrivate.post(
        `/api/patient/createuser`,
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
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosPrivate.post(`api/patient/login`, {
        email,
        password,
        role,
      });

      if (response) {
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
//-----------------------------------API-----------------------------------------------//

const initialState: stateManagement = {
  showPassword: false,
  termsAccepted: false,
  confirmPassword: "",
  role: "",
  loading: null,
  accessToken: null,
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
  },
  hoveredField: "",
};

const signup_login = createSlice({
  name: "states",
  initialState,
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
  },
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
        state.role = action?.payload?.data?.data?.role;
        state.accessToken = action?.payload?.data?.accessToken;
        state.refreshToken = action?.payload?.data?.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = true;
        state.error = null;
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
} = signup_login.actions;

export default signup_login.reducer;
