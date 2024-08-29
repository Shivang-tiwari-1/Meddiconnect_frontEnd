import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/Store';
interface DoctorData {
    onclick?: () => void;
    doctorDetails?: object;
    dispatch?: () => void;
}
const DoctorDetail = (props: DoctorData) => {

    return (
        <div>

        </div>
    )
}

export default DoctorDetail;
