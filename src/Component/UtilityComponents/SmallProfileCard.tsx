import React from "react";
import Button from "./Button";
import { useAppSelector } from "../../Redux/Store/Store";
import PageModel from "../../Utility/PageModel.Utils";
import DoctroPageModel from "./DoctroPageModel.Utility";
import { div } from "three/examples/jsm/nodes/Nodes.js";
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
    history
  } = props;
  const imagePath = profileImage
    ? `http://localhost:5000/images/${profileImage}`
    : "/defaultProfileImage.png";

  globalResizeFunction();

  return (
    <>
      {!show ? (
        <button
          className="flex items-center flex-row justify-around w-full"
          onClick={handleToggleShow}
        >
          <div className="flex justify-start  ">
            <div className="px-2 w-[70px] h-[60px] ">
              <img
                src={imagePath}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="flex justify-center items-start flex-col p-1">
              <div className="font-[600] text-[14px] text-primaryBlack dark:text-textWhite">
                {name}
              </div>
              <div className="font-[400] text-[14px] text-primaryGrey dark:text-textGrey">
                {role}
              </div>
            </div>
          </div>

          <div className="">
            {availability?.length === 0 ? (
              <p className="border-2 rounded-lg bg-primaryRed opacity-70 ">
                InActive
              </p>
            ) : (
              "active"
            )}
          </div>
        </button>
      ) : (
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
        />
      )}
    </>
  );
};

export default SmallProfileCard;
