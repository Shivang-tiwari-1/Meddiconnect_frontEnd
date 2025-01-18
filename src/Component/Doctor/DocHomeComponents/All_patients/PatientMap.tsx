import React from "react";
import PatientProfileCard from "../../../UtilityComponents/PatientProfileCard";

interface patients {
  key?: string;
  name?: string;
  profileImage?: string;
  role?: string;
  show?: boolean;
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
  handleMouseOver?: (feildname: string) => void;
  handleMouseOut?: () => void;
  hoveredField?: string;
  isActive?: boolean;
  disable?: boolean;
  isDisabled?: (id: any) => void;
  handleToggleShow2?: () => void;
  timings?: any;
}
const PatientMap: React.FC<patients> = ({
  name,
  profileImage,
  role,
  show,
  handleToggleShow2,
  handleToggleShow3,
  address,
  history,
  show2,
  show3,
  isDark,
  id,
  openUserId,
  handleMouseOver,
  handleMouseOut,
  hoveredField,
  isActive,
  disable,
  isDisabled,
  timings,
}) => {
  const isOpen = openUserId === id;
  return (
    <div
      className={`border rounded-[50px] w-[100%]  opacity-9 shadow-2xl ${
        isDark ? "dark" : ""
      }  dark:bg-bgColorDarkBlack   `}
    >
      <div className="w-full tablet:w-full tablet:h-[100px] rounded-t bg-cover flex justify-start items-center">
        <PatientProfileCard
          name={name}
          profileImage={profileImage}
          role={role}
          show={isOpen}
          address={address}
          history={history}
          show2={show2}
          show3={show3}
          handleToggleShow3={handleToggleShow3}
          id={id}
          isDark={isDark}
          handleMouseOut={handleMouseOut}
          handleMouseOver={handleMouseOver}
          hoveredField={hoveredField}
          isActive={isActive}
          handleToggleShow2={handleToggleShow2}
          timings={timings}
        />
      </div>
    </div>
  );
};

export default PatientMap;
