import React, { useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { primaryBlack, textWhite } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { is_active } from "../../Redux/slices/Doctor.Redux";
import { bulk_write } from "../../Redux/slices/Message.Redux";
interface incomingData {
  DoctorData?: object | null;
  isDark?: boolean;
}
const Profile = ({ DoctorData, isDark }: incomingData) => {
  const dispatch = useAppDispatch()
  const is_Active = useAppSelector((state) => state.doctor.is_Active);
  const doctor_Text_records = useAppSelector((state) => state.MessageSlice.doctor_Text_records);
  const last_active = useAppSelector((state) => state.doctor.last_active);
  const patient_Text_records = useAppSelector((state) => state.MessageSlice.patient_Text_records);
  const active_doctors = useAppSelector((state) => state.doctor.active_doctors);
  const userData = useAppSelector((state) => state.states.userData);

  useEffect(() => {
    dispatch(is_active((DoctorData as any)?._id));
  }, [active_doctors]);

  useEffect(() => {
    if (!is_Active) {
      console.log("bulk_write action")
      if ((userData as any)?.data.role === 'patient') {
        dispatch(bulk_write(patient_Text_records))

      } else if ((userData as any)?.data.role === 'doctor') {
        dispatch(bulk_write(doctor_Text_records))

      }
    }
  }, [is_Active]);


  return (
    <div
      className={`shadow-lg border rounded-full outline-none h-[6vh] w-full flex items-center  px-4  ${!isDark && "bg-[#ffff]"
        } `}
    >
      <div
        className={`text-black flex justify-start items-center w-[70%] gap-5 m-[2rem] ${isDark ? "text-textWhite" : "text-black"
          }`}
      >
        <a className="border-2 rounded-full w-[4rem] h-[3rem] flex justify-center items-center">
          <img
            src={(DoctorData as any)?.profileImage}
            alt="Profile"
            className="w-full h-full object-contain rounded-full"
          />
        </a>
        <div className={`flex  justify-center  flex-col `}>
          <a
            className="font-light tracking-tight "
            style={{
              fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {(DoctorData as any)?.name}
          </a>
          {!is_Active ? (<p className="text-sm font-[400] opacity-0 animate-fadeInScale delay-1000">
            {last_active !== null ? `Last Active at ${last_active}` : "Offline"}

          </p>) : (
            <p className="text-sm font-[400] opacity-0 animate-fadeInScale delay-1000">
              online
            </p>
          )}
        </div>

      </div>
      <div className="flex  justify-end w-[20%] cursor-pointer ">
        {isDark ? (
          <IoIosCall size={30} color={textWhite} />
        ) : (
          <IoIosCall size={30} color={primaryBlack} />
        )}
      </div>
    </div>
  );
};

export default Profile;
