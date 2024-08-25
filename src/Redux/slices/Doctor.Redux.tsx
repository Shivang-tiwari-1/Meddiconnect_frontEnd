import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../Api/Axios.Api";

//-----------------------------------interfaces----------------------------------------//
interface doctorPayload {
    HowManyPatients?: number | null;
    day?: string | null;
    start?: string | null;
    end?: string | null;
}
interface stateManagement {

}
//-----------------------------------interfaces----------------------------------------//



//-----------------------------------API-----------------------------------------------//

export const getDoctorData = createAsyncThunk(
    'patient/getDoctorData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get(`api/patient/getDoctordata`);
            console.log("response->", response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);
export const getDetailOfthePatient = createAsyncThunk(
    'patient/getDetailOfthePatient',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.get(`api/patient/getDoctordata`);
            console.log("response->", response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);
export const setCriteria = createAsyncThunk(
    'patient/setCriteria',
    async ({ HowManyPatients, day, start, end }: doctorPayload, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post(`api/doctor/setcriteria`, {
                HowManyPatients: HowManyPatients,
                day: day,
                start: start,
                end: end
            });
            console.log("response->", response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);
export const manualUpdate = createAsyncThunk(
    'patient/updatemanually',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post('api/doctor/updatemanually');
            console.log("response->", response);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);
//-----------------------------------API-----------------------------------------------//


const initialState: stateManagement = {

}
const DoctorState = createSlice({
    name: 'DoctorState',
    initialState,
    reducers: {

    },

    extraReducers: (builders) => {
        builders.addCase(getDoctorData.pending, (state) => {

        })
            .addCase(getDoctorData.fulfilled, (state, action) => {

            })
            .addCase(getDoctorData.rejected, (state, action) => {

            })
            .addCase(getDetailOfthePatient.fulfilled, (state, action) => {

            })
            .addCase(getDetailOfthePatient.pending, (state, action) => {

            })
            .addCase(getDetailOfthePatient.rejected, (state, action) => {

            })
            .addCase(setCriteria.fulfilled, (state, action) => {

            })
            .addCase(setCriteria.pending, (state, action) => {

            })
            .addCase(setCriteria.rejected, (state, action) => {

            })
            .addCase(manualUpdate.fulfilled, (state, action) => {

            })
            .addCase(manualUpdate.pending, (state, action) => {

            })
            .addCase(manualUpdate.rejected, (state, action) => {

            })

    }
});

export const { } = DoctorState.actions;
export default DoctorState.reducer;
