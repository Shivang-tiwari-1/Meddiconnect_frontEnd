import React from "react";
import SmallProfileCard from "../../UtilityComponents/SmallProfileCard";
interface doctros {
  key?: string;
  name?: string;
  availability?: [];
  profileImage?: string;
  role?: string;
  show?: boolean;
  tabletBool?: boolean;
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
  openDoctorId: string | null;
}

const Doctors = ({
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
  openDoctorId,
}: doctros) => {
  const isOpen = openDoctorId === id;
  return (
    <div
      className={`border rounded-[50px] w-[100%] bg-white opacity-9 shadow-2xl ${
        isDark ? "dark" : ""
      }  dark:bg-primaryGrey  `}
    >
      <div className="w-full tablet:w-full tablet:h-[100px] rounded-t bg-cover flex justify-start items-center">
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
        />
      </div>
    </div>
  );
};

export default Doctors;
