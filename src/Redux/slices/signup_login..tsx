import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";

//-----------------------------------interfaces----------------------------------------//
interface SignupPayload {
    name?: string,
    email?: string,
    password?: string,
    phone?: number,
    address?: string,
    role?: string,
};

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

}
//-----------------------------------interfaces----------------------------------------//



//-----------------------------------API-----------------------------------------------//
export const signup = createAsyncThunk(
    'user/signup',
    async ({ name, email, password, phone, address, role }: SignupPayload, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post(`/api/patient/createuser`, {
                name: name,
                email: email,
                password: password,
                phone: phone,
                address: address,
                role: role
            });
            console.log("response->", response)
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);
export const login = createAsyncThunk(
    'user/login',
    async ({ email, password, role }: SignupPayload, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post(`api/patient/login`, {
                email: email,
                password: password,
                role: role
            });
            console.log(response);
            return response?.data;

        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);
//-----------------------------------API-----------------------------------------------//

const initialState: stateManagement = {
    showPassword: false,
    termsAccepted: false,
    confirmPassword: '',
    role: '',
    loading: null,
    accessToken: null,
    refreshToken: null,
    error: null,
    mobile: ''
}

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
            state.mobile = action.payload;
        },
    },
    extraReducers: (builders) => {
        builders.addCase(signup.pending, (state) => {
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
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.role = action?.payload?.data?.data?.role;
                state.accessToken = action?.payload?.data?.accessToken;
                state.refreshToken = action?.payload?.data?.refreshToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = true;
                state.error = null
            })
    }
});

export const { toggleShowPassword, toogleTermAcdepted, toogleCongirmPassword, tooglePatientCheck, toogleMobileCheck } = signup_login.actions;

export default signup_login.reducer;