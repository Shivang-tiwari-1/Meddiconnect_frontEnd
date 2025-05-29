import React, { useCallback, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/Store/Store';
import { BookAppointMent, setOpenDoctorId, toogleShow4 } from '../../Redux/slices/Patient.Redux';
import DoctroPageModel from '../UtilityComponents/DoctroPageModel.Utility';

const DoctorSearch = () => {
    const dispatch = useAppDispatch();
    const doctorByState = useAppSelector((state) => state.patient.doctorByState);
    const active_doctors = useAppSelector(state => state.doctor.active_doctors);
    const show3 = useAppSelector((state) => state.patient.show3);
    const show4 = useAppSelector((state) => state.patient.show4);
    const searchQuery = useAppSelector((state) => state?.patient.searchQuery);
    const openUserId = useAppSelector((state) => state.patient.openUserId);
    const tabletBool = useAppSelector((state) => state.states.tabletBool);
    const timings = useAppSelector((state) => state.states.timings);
    const isDark = useAppSelector((state) => state.stateChange.isDark);


    const filterdoctors = doctorByState?.filter((doctor) => {
        return (doctor as any).name?.toLowerCase().includes(searchQuery?.doctorSearch)
    });
    const handleToggle = (id: string) => {
        dispatch(setOpenDoctorId(openUserId === id ? null : id));
    };
    const currentDate = useMemo(() => {
        return new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    }, []);
    const handleToggleShow4 = useCallback(() => {
        dispatch(toogleShow4());
    }, [show4]);

    return (
        <>
            {
                filterdoctors?.length === 0 ?
                    doctorByState?.map((doctor: any) => (
                        !openUserId !== doctor._id ? (
                            <div className={`w-full border-2 h-[7vh] rounded-lg flex items-center  cursor-pointer `} key={(doctor as any)?._id} onClick={() => handleToggle(doctor._id)}>
                                <div className="flex justify-center items-center w-[30%] h-full">
                                    <div className="border-2 flex justify-center items-center rounded-full w-[6vh] h-[6vh] overflow-hidden">
                                        <img src={(doctor as any).profileImage} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center w-full">
                                    <div className="flex w-[70%] flex-col px-3">
                                        <p>
                                            Doctor
                                        </p>
                                        <p>
                                            {(doctor as any)?.name}
                                        </p>
                                    </div>
                                    {active_doctors?.includes((doctor as any)?._id) ? (
                                        <div className="border-2 w-3 h-3 rounded-full bg-primaryGreen opacity-0 animate-fadeInScale delay-1000"></div>
                                    ) : (
                                        <div className="border-2 w-3 h-3 rounded-full bg-red-600 opacity-0 animate-fadeInScale delay-1000"></div>
                                    )}

                                </div>
                            </div>
                        ) : (
                            <DoctroPageModel
                                name={doctor.name}
                                role={doctor.role}
                                profileImage={doctor.profileImage}
                                availability={doctor?.availability}
                                show3={show3}
                                show4={show4}
                                handleToggleShow={() => handleToggle(doctor._id)}
                                tabletBool={tabletBool}
                                address={doctor.address}
                                history={doctor.history}
                                handleToggleShow4={handleToggleShow4}
                                id={doctor?._id}
                                Max={doctor.Max}
                                isDark={isDark}
                                currentDate={currentDate}
                                BookAppointment={BookAppointMent}
                                specializedIn={doctor.specialization}
                                timings={timings}
                                phone={doctor.phone}
                            />
                        )


                    )) : filterdoctors?.map((doctor: any) => (
                        openUserId !== doctor._id ? (
                            <div
                                className="w-full border-2 h-[7vh] rounded-lg flex items-center cursor-pointer"
                                onClick={() => handleToggle(doctor._id)}
                                key={(doctor as any)?._id}>
                                <div className="flex justify-center items-center w-[30%] h-full">
                                    <div className="border-2 flex justify-center items-center rounded-full w-[6vh] h-[6vh] overflow-hidden">
                                        <img
                                            src={doctor.profileImage}
                                            alt={`${doctor.name}'s profile`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row items-center w-full">
                                    <div className="flex w-[70%] flex-col px-3">
                                        <p className="font-medium text-sm">Doctor</p>
                                        <p className="font-semibold text-base">{doctor.name}</p>
                                    </div>

                                    {active_doctors?.includes(doctor._id) ? (
                                        <div className="border-2 w-3 h-3 rounded-full bg-primaryGreen animate-fadeInScale delay-1000"></div>
                                    ) : (
                                        <div className="border-2 w-3 h-3 rounded-full bg-red-600 animate-fadeInScale delay-1000"></div>
                                    )}
                                </div>
                            </div>
                        ) : <DoctroPageModel
                            name={doctor.name}
                            role={doctor.role}
                            profileImage={doctor.profileImage}
                            availability={doctor?.availability}
                            show3={show3}
                            show4={show4}
                            handleToggleShow={() => handleToggle(doctor._id)}
                            tabletBool={tabletBool}
                            address={doctor.address}
                            history={doctor.history}
                            handleToggleShow4={handleToggleShow4}
                            id={doctor?._id}
                            Max={doctor.Max}
                            isDark={isDark}
                            currentDate={currentDate}
                            BookAppointment={BookAppointMent}
                            specializedIn={doctor.specialization}
                            timings={timings}
                            phone={doctor.phone}
                        />


                    ))}
        </>
    )
}

export default DoctorSearch
