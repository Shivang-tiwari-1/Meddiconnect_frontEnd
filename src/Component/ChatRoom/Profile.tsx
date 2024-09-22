import React from "react";
import { IoIosCall } from "react-icons/io";
import { primaryBlack, primaryGrey, textWhite } from "../../Constants";
interface incomingData {
  DoctorData?: object | null;
  isDark?: boolean;
}
const Profile = ({ DoctorData, isDark }: incomingData) => {
  return (
    <div
      className={`shadow-lg border rounded-full outline-none h-[6vh] w-full flex items-center  px-4 `}
    >
      <div
        className={`text-black flex justify-start items-center w-[70%] gap-5 m-[2rem] ${
          isDark ? "text-textWhite" : "text-black"
        }`}
      >
        <a className="border-2 rounded-full w-[4rem] h-[3rem] flex justify-center items-center">
          <img
            src={`http://localhost:5000/images/${DoctorData?.profileImage}`}
            alt="Profile"
            className="w-full h-full object-contain rounded-full"
          />
        </a>
        <a
          className="font-light tracking-tight"
          style={{
            fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
            fontSize: "18px",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {DoctorData?.name}
        </a>
      </div>
      <div className="flex  justify-end w-[20%]">
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
