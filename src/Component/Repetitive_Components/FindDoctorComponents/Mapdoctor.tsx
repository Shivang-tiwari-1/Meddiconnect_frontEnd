import React, { useCallback, useState } from 'react'
import Loader from '../../../Utility/loader/Loader';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/Store';
import Doctors from '../../Patient/Finddoctors/Doctors';
import { BookAppointMent, set_disable, setOpenDoctorId, toogleShow2, toogleShow4 } from '../../../Redux/slices/Patient.Redux';
import { globalResizeFunction } from '../../../Utility/resizer.Utils';
import { setHoverField } from '../../../Redux/slices/signup_login.';
import { set_rating } from '../../../Redux/slices/Doctor.Redux';

const Mapdoctor = () => {
    const dispatch = useAppDispatch();
    const gridView = useAppSelector((state) => state.stateChange.gridView);
    const selectedState = useAppSelector(state => state.stateChange.selectedState);
    const doctors = useAppSelector((state) => state.patient.doctors);
    const active_doctors = useAppSelector(state => state.doctor.active_doctors);
    const doctorData = useAppSelector((state) => state.states.doctorData);
    const tabletBool = useAppSelector((state) => state.states.tabletBool);
    const mobileBool = useAppSelector((state) => state.states.mobileBool);
    const isDark = useAppSelector((state) => state.stateChange.isDark);
    const openUserId = useAppSelector((state) => state.patient.openUserId);
    const show4 = useAppSelector((state) => state.patient.show4);
    const disable = useAppSelector((state) => state.patient.disable);
    const show2 = useAppSelector((state) => state.patient.show2);
    const timings = useAppSelector((state) => state.states.timings);
    const show = useAppSelector((state) => state.patient.show);
    const filterdoctors = useAppSelector((state) => state.stateChange.filterdoctors) || [];

    const [hoveredField, setHoverField] = useState<String>('');
    const handleMouseOver = useCallback((fieldName: string) => {
        setHoverField(fieldName);
    }, [hoveredField]);
    const handleMouseOut = useCallback(() => {
        setHoverField("");
    }, [hoveredField]);
    const isDisabled = useCallback((id: any) => {
        dispatch(set_disable(id));
    }, [disable]);
    const handleToggleShow4 = useCallback(() => {
        dispatch(toogleShow4());
    }, [show4]);
    const handleToggleShow2 = useCallback(() => {
        dispatch(toogleShow2());
    }, [show2]);
    const handleToggleShow = useCallback((doctorId: string | null) => {
        if (openUserId === doctorId) {
            dispatch(setOpenDoctorId(null));
        } else {
            dispatch(set_rating({ id: doctorId }));
            const fetch_doc = doctors?.find((index: any) => index?._id === doctorId);
            if ((fetch_doc as any)?.availability.length > 0) {
                dispatch(setOpenDoctorId(doctorId));
            }
        }
    }, [openUserId, doctors, dispatch]);
   console.log(active_doctors)
    return (

        <div className="">
            {!gridView ? (
                <div className="grid-cols-2 desktop:grid-cols-2 grid gap-10 py-4 px-4 mobile:grid-cols-1 tablet:grid-cols-2 ">
                    {selectedState?.length === 0
                        ? doctors?.map((doctor: any) => (
                            <Doctors
                                key={doctor?._id}
                                isActive={active_doctors?.some((data) => (data as any).userId === (doctor as any)._id.toString() && (data as any).online)}
                                name={doctor?.name}
                                availability={doctor?.availability}
                                profileImage={doctor?.profileImage}
                                address={doctor?.address}
                                history={doctor?.history}
                                role={doctor?.role}
                                specializedIn={doctor?.specialization}
                                Max={doctor?.Max}
                                docisActive={(doctorData as any)?.userData?.data?.isActive}
                                id={doctor?._id}
                                show={show}
                                tabletBool={tabletBool}
                                handleToggleShow={handleToggleShow}
                                mobileBool={mobileBool}
                                isDark={isDark}
                                openUserId={openUserId ?? ''}
                                show4={show4}
                                BookAppointment={BookAppointMent}
                                globalResizeFunction={globalResizeFunction}
                                handleMouseOver={handleMouseOver}
                                handleMouseOut={handleMouseOut}
                                hoveredField={String(hoveredField)}
                                disable={disable}
                                isDisabled={isDisabled}
                                handleToggleShow4={handleToggleShow4}
                                handleToggleShow2={handleToggleShow2}
                                show2={show2}
                                timings={timings}
                                coordinates={doctor?.coordinates}
                                charges={doctor?.charges}
                            />
                        ))
                        : filterdoctors?.map((doctor: any) => (
                            <Doctors
                                key={doctor?._id}
                                isActive={active_doctors?.some((data) => (data as any).userId === (doctor as any)._id.toString() && (data as any).online)}
                                name={doctor?.name}
                                availability={doctor?.availability}
                                profileImage={doctor?.profileImage}
                                address={doctor?.address}
                                history={doctor?.history}
                                role={doctor?.role}
                                specializedIn={doctor?.specialization}
                                Max={doctor?.Max}
                                docisActive={(doctorData as any)?.userData?.data?.isActive}
                                id={doctor?._id}
                                show={show}
                                tabletBool={tabletBool}
                                handleToggleShow={handleToggleShow}
                                mobileBool={mobileBool}
                                isDark={isDark}
                                openUserId={openUserId ?? ''}
                                show4={show4}
                                BookAppointment={BookAppointMent}
                                globalResizeFunction={globalResizeFunction}
                                handleMouseOver={handleMouseOver}
                                handleMouseOut={handleMouseOut}
                                hoveredField={String(hoveredField)}
                                disable={disable}
                                isDisabled={isDisabled}
                                handleToggleShow4={handleToggleShow4}
                                handleToggleShow2={handleToggleShow2}
                                show2={show2}
                                timings={timings}
                                coordinates={doctor?.coordinates}
                                charges={doctor?.charges}
                            />
                        ))
                    }
                </div>

            ) : (
                <div className={`grid-row desktop:grid-cols-3 mobile:grid-rows-1 grid gap-4 py-4 px-4  `}>
                    {doctors?.map((doctor: any) => (
                        <Doctors
                            key={(doctor as any)?._id}
                            isActive={active_doctors?.some((data) => (data as any).userId === (doctor as any)._id.toString() && (data as any).online)}
                            name={(doctor as any)?.name}
                            availability={(doctor as any)?.availability}
                            profileImage={(doctor as any)?.profileImage}
                            address={(doctor as any)?.address}
                            history={(doctor as any)?.history}
                            role={(doctor as any)?.role}
                            show={show}
                            tabletBool={tabletBool}
                            handleToggleShow={handleToggleShow}
                            mobileBool={mobileBool}
                            isDark={isDark}
                            id={(doctor as any)?._id}
                            openUserId={openUserId || null}
                            show4={show4}
                            Max={(doctor as any)?.Max}
                            BookAppointment={BookAppointMent}
                            globalResizeFunction={globalResizeFunction}
                            handleMouseOver={handleMouseOver}
                            handleMouseOut={handleMouseOut}
                            hoveredField={hoveredField.toString()}
                            disable={disable}
                            isDisabled={isDisabled}
                            handleToggleShow4={handleToggleShow4}
                            handleToggleShow2={handleToggleShow2}
                            show2={show2}
                            timings={timings}
                            docisActive={(doctorData as any)?.userData?.data?.isActive}
                            coordinates={doctor?.coordinates}
                            charges={doctor?.charges}

                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default React.memo(Mapdoctor);
