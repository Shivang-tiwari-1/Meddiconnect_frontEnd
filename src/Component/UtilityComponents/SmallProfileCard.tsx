import React from "react";
import DoctroPageModel from "./DoctroPageModel.Utility";
import { globalResizeFunction } from "../../Utility/resizer.Utils";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import { is_active } from "../../Redux/slices/Doctor.Redux";
import { current_doctor_schedul } from "../../Redux/slices/Patient.Redux";

interface data {
  name?: string;
  role?: string;
  specializedIn?: string[];
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
  Max?: number;
  currentDate?: string;
  BookAppointment?: () => void;
  globalResizeFunction?: () => void;
  handleMouseOut?: () => void;
  handleMouseOver?: (fieldName: string) => void;
  timings?: any;
  hoveredField?: string;
  isActive?: boolean;
  docisActive?: boolean;
  phone?: number;
  coordinates?: number[];
  charges?: number
}

const SmallProfileCard: React.FC<data> = React.memo((props) => {
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
    isActive,
    id,
    doctor,
    Max,
    currentDate,
    BookAppointment,
    handleMouseOut,
    handleMouseOver,
    hoveredField,
    specializedIn,
    timings,
    phone,
    coordinates,
    charges

  } = props;
  const dispatch = useAppDispatch();
  const { day } = useAppSelector((state) => state.stateChange)
  dispatch(is_active(id));
  dispatch(current_doctor_schedul({ id: id, day: day?.toLowerCase() }));
  
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
            Max={Max}
            isDark={isDark}
            currentDate={currentDate}
            BookAppointment={BookAppointment}
            globalResizeFunction={globalResizeFunction}
            handleMouseOut={handleMouseOut}
            handleMouseOver={handleMouseOver}
            hoveredField={hoveredField}
            specializedIn={specializedIn}
            timings={timings}
            phone={phone}
            coordinates={coordinates}
            charges={charges}
          />
        </div>
      ) : (
        <button
          className={`flex items-center flex-row justify-around w-full  ${isDark ? "dark" : ""
            }  ${availability?.length === 0 ? "cursor-not-allowed opacity-50" : ""
            } `}
          onClick={handleToggleShow}
        >
          <div className={`flex justify-start dark:bg-bgColorDarkBlack gap-5`}>
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
            {
              isActive ? (

                <div className="border-2 w-3 h-3 rounded-full bg-primaryGreen opacity-0 animate-fadeInScale delay-1000"></div>
              )
                : (
                  <div className="border-2 w-3 h-3 rounded-full bg-primaryRed opacity-0 animate-fadeInScale delay-1000 "></div>

                )
            }

            <div>
              {availability?.length > 0 ? (
                <div className="w-28">
                  {" "}
                  <p className="text-sm font-medium">Taking patients </p>
                </div>
              ) : (
                <div className="w-28">
                  <p className="text-sm text-primaryGrey font-semibold text-">
                    Not Taking any patients
                  </p>
                </div>
              )}
            </div>
          </div>
        </button >
      )}
    </>
  );
});

export default SmallProfileCard;
