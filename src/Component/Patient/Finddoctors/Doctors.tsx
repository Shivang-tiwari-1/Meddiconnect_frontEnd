import React, { useEffect, useMemo } from "react";
import SmallProfileCard from "../../UtilityComponents/SmallProfileCard";

interface doctros {
  key?: string;
  name?: string;
  availability?: [];
  profileImage?: string;
  role?: string;
  show?: boolean;
  tabletBool?: boolean;
  specializedIn?: string[];
  handleToggleShow: (id: string | null) => void;
  address?: string;
  history?: [];
  mobileBool?: boolean;
  show2?: boolean;
  show3?: boolean;
  show4?: boolean;
  handleToggleShow4?: () => void;
  handleToggleShow3?: () => void;
  isDark?: boolean;
  id?: any;
  openUserId: string | null;
  Max?: number;
  BookAppointment?: () => void;
  globalResizeFunction?: () => void;
  handleMouseOver?: (feildname: string) => void;
  handleMouseOut?: () => void;
  hoveredField?: string;
  isActive?: boolean;
  disable?: boolean;
  isDisabled?: (id: any) => void;
  handleToggleShow2?: () => void;
  timings?: any;
  docisActive?: boolean;
  phone?: number;
  coordinates?: number[]
  charges?: number
};

const Doctors: React.FC<doctros> = React.memo((props) => {
  const {
    name,
    role,
    profileImage,
    availability,
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
    openUserId,
    Max,
    globalResizeFunction,
    handleMouseOut,
    handleMouseOver,
    hoveredField,
    isActive,
    specializedIn,
    handleToggleShow2,
    timings,
    docisActive,
    show,
    phone,
    coordinates,
    charges
  } = props

  let isOpen = openUserId === id;

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  }, []);


  return (
    <div
      className={`border rounded-[50px] w-[100%] bg-white opacity-9 shadow-2xl ${isDark ? "dark" : ""
        }  dark:bg-bgColorDarkBlack   `}
    >
      <div className="w-full tablet:w-full tablet:h-[100px] rounded-t bg-cover flex justify-start items-center h-[100px]">
        <SmallProfileCard
          name={name}
          profileImage={profileImage}
          role={role}
          availability={availability}
          show={isOpen}
          tabletBool={tabletBool}
          handleToggleShow={() => handleToggleShow(id)}
          address={address}
          history={history}
          show2={show2}
          show3={show3}
          handleToggleShow3={handleToggleShow3}
          handleToggleShow4={handleToggleShow4}
          show4={show4}
          id={id}
          Max={Max}
          isDark={isDark}
          currentDate={currentDate}
          globalResizeFunction={globalResizeFunction}
          handleMouseOut={handleMouseOut}
          handleMouseOver={handleMouseOver}
          hoveredField={hoveredField}
          isActive={isActive}
          specializedIn={specializedIn}
          handleToggleShow2={handleToggleShow2}
          timings={timings}
          docisActive={docisActive}
          phone={phone}
          coordinates={coordinates}
          charges={charges}
        />
      </div>
    </div>
  );
});

export default Doctors;
