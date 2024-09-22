import React from "react";
import Button from "./Button";
import { useAppSelector } from "../../Redux/Store/Store";
import PageModel from "../../Utility/PageModel.Utils";
import DoctroPageModel from "./DoctroPageModel.Utility";
import { globalResizeFunction } from "../../Utility/resizer.Utils";

interface data {
  name?: string;
  role?: string;
  profileImage?: string;
  availability?: [];
  show?: boolean;
  tabletBool?: boolean;
  ToggleShow?: () => void;
  handleToggleShow?: () => void;
  address?: string;
  history?: [];
  show2?: boolean;
  show3?: boolean;
  handleToggleShow3?: () => void;
  handleToggleShow2?: () => void;
  handleToggleShow4?: () => void;
  show4?: boolean;
  isDark?: boolean;
  data?: object[];
  id?: any;
  doctor?: object[];
}

const SmallProfileCard = (props: data) => {
  const {
    name,
    role,
    profileImage,
    availability,
    show,
    handleToggleShow,
    tabletBool,
    address,
    history,
    show2,
    show3,
    handleToggleShow3,
    show4,
    handleToggleShow4,
    isDark,
    id,
    doctor,
  } = props;

  globalResizeFunction();

  return (
    <>
      {show ? (
        <div className="absolute  z-50 ">
          <DoctroPageModel
            name={name}
            role={role}
            profileImage={profileImage}
            availability={availability}
            show={show}
            handleToggleShow={handleToggleShow}
            tabletBool={tabletBool}
            address={address}
            history={history}
            show2={show2}
            handleToggleShow3={handleToggleShow3}
            show3={show3}
            show4={show4}
            handleToggleShow4={handleToggleShow4}
            id={id}
          />
        </div>
      ) : (
        <button
          className={`flex items-center flex-row justify-around w-full ${
            isDark ? "dark" : ""
          }`}
          onClick={handleToggleShow}
        >
          <div className={`flex justify-start dark:bg-primaryGrey gap-5`}>
            <div className="px-2 w-[80px] h-[70px] ">
              <img
                src={`http://localhost:5000/images/${profileImage}`}
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
          <div className={`w-[4rem] `}>
            {availability?.length === 0 ? (
              <p className="border-2 rounded-lg bg-primaryRed opacity-70 font-[500] z-20">
                InActive
              </p>
            ) : (
              <p className="border-2 rounded-lg bg-primaryGreen opacity-70 font-[500] z-20">
                Active
              </p>
            )}
          </div>
        </button>
      )}
    </>
  );
};

export default SmallProfileCard;
