import React, { useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { primaryBlack, primaryGrey, textWhite } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { is_active, last_Active } from "../../Redux/slices/Doctor.Redux";
interface incomingData {
  DoctorData?: object | null;
  isDark?: boolean;
}
const Profile = ({ DoctorData, isDark }: incomingData) => {
  const dispatch = useAppDispatch()
  const { is_Active, last_active, active_doctors } = useAppSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(is_active((DoctorData as any)?._id));
  }, [active_doctors])


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
