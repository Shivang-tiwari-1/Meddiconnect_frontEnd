import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";


//-----------------------------------interfaces----------------------------------------//
interface patientPayload {
    id?: string | null;
    day: string | null;
    time: string | null;
};
interface patientState {
    doctors?: [],
    loading?: boolean,
    patientData?: object
};
//-----------------------------------interfaces----------------------------------------//



//-----------------------------------API-----------------------------------------------//
export const fetchAllDoctors = createAsyncThunk(
    'patient/fetchAllDoctors',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get(`/api/patient/fetchalldoctors`);
            console.log('response->', response);
            return response?.data;

        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getUserData = createAsyncThunk(
    'patient/getUserData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get(`/api/patient/getData`);
            console.log('response->', response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const BookAppointMent = createAsyncThunk(
    'patient/BookAppointMent',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post(`/api/patient/makeappointment/${id}`);
            console.log('response->', response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const CancleAppointment = createAsyncThunk(
    'patient/CancleAppointment',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post(`/api/patient/cancleappointment/${id}`);
            console.log('response->', response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const history = createAsyncThunk(
    'patient/history',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get(`/api/patient/history`);
            console.log('response->', response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const BookAppointmentManually = createAsyncThunk(
    'patient/BookAppointmentManually',
    async ({ day, time, id }: patientPayload, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post(`/api/patient/makeappointment_manually/${id}`, {
                day: day,
                time: time,
            });
            console.log('response->', response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);
//-----------------------------------API-----------------------------------------------//



const initialState: patientState = {
    doctors: [],
    loading: false,
    patientData: {}

}

const patientState = createSlice({
    name: 'patientState',
    initialState,
    reducers: {

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

            })
            .addCase(BookAppointMent.rejected, (state, action) => {

            })
            .addCase(BookAppointMent.fulfilled, (state, action) => {

            })
            .addCase(CancleAppointment.pending, (state) => {

            })
            .addCase(CancleAppointment.rejected, (state, action) => {

            })
            .addCase(CancleAppointment.fulfilled, (state, action) => {

            })
            .addCase(history.pending, (state) => {

            })
            .addCase(history.rejected, (state, action) => {

            })
            .addCase(history.fulfilled, (state, action) => {

            })
            .addCase(BookAppointmentManually.pending, (state) => {

            })
            .addCase(BookAppointmentManually.rejected, (state, action) => {

            })
            .addCase(BookAppointmentManually.fulfilled, (state, action) => {

            })
    }
});

export const { } = patientState.actions;
export default patientState.reducer;