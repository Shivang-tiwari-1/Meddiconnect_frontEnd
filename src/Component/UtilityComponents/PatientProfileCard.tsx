import React from "react";

interface data {
  name?: string;
  role?: string;
  profileImage?: string;
  address?: string;
  history?: [];
  show2?: boolean;
  show3?: boolean;
  handleToggleShow3?: () => void;
  handleToggleShow2?: () => void;
  isDark?: boolean;
  id?: any;
  doctor?: object[];
  handleMouseOut?: () => void;
  handleMouseOver?: (fieldName: string) => void;
  timings?: any;
  hoveredField?: string;
  isActive?: boolean;
  show?: boolean;
}
const PatientProfileCard: React.FC<data> = ({
  name,
  role,
  profileImage,
  address,
  history,
  show3,
  handleToggleShow3,
  isDark,
  id,
  timings,
  handleMouseOut,
  handleMouseOver,
  hoveredField,
  isActive,
}) => {
  return (
    <button
      className={`flex items-center flex-row justify-around w-full  ${
        isDark ? "dark" : ""
      }   `}
    >
      <div className={`flex justify-start dark:bg-lightBlack gap-5`}>
        <div className="px-2 w-[80px] h-[70px] ">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        <div className="flex justify-center items-start flex-col p-1">
          <div className="font-[600] text-[14px] text-primaryBlack dark:text-textWhite">
            {name}
          </div>
          <div className="font-[400] text-[14px] text-primaryGrey dark:text-white">
            {role}
          </div>
        </div>
      </div>

      <div
        className={`w-[4rem] flex justify-center items-center flex-col gap-2`}
      >
        {!isActive ? (
          <div className="border-2 w-3 h-3 rounded-full bg-primaryRed"></div>
        ) : (
          <div className="border-2 w-3 h-3 rounded-full bg-primaryGreen"></div>
        )}
      </div>
    </button>
  );
};

export default PatientProfileCard;
