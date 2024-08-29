import React from "react";
import SmallProfileCard from "../../UtilityComponents/SmallProfileCard";
interface doctros {
  key: string;
  name?: string;
  availability?: [];
  profileImage?: string;
  role?: string;
  show?: boolean;
  tabletBool?: boolean;
  handleToggleShow?: () => void;
  address?: string;
  history?: [];
  mobileBool?: boolean;
}

const Doctors = (props: doctros) => {
  const {
    key,
    name,
    role,
    profileImage,
    availability,
    show,
    tabletBool,
    handleToggleShow,
    address,
    history,
  } = props;

  return (
    <div
      key={key}
      className="border rounded-[50px] w-[100%] bg-white opacity-9 shadow-2xl "
    >
      <div className=" w-fulltablet:w-full tablet:h-[100px] rounded-t bg-cover flex justify-start items-center">
        <SmallProfileCard
          name={name}
          profileImage={profileImage}
          role={role}
          availability={availability}
          show={show}
          tabletBool={tabletBool}
          handleToggleShow={handleToggleShow}
          address={address}
          history={history}
        />
      </div>
    </div>
  );
};

export default Doctors;
