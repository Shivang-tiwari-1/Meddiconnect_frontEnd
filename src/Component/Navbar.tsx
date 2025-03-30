import React, { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { primaryBlack, primaryGrey, textWhite } from "../Constants";
import SmallProfileCard from "../Component/UtilityComponents/SmallProfileCard";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { globalResizeFunction } from "../Utility/resizer.Utils";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { useAppSelector } from "../Redux/Store/Store";
import { toogleDarkMode } from "../Redux/slices/StateChange.slice";
import { setHoverField } from "../Redux/slices/signup_login.";
import { LuMessageCircle } from "react-icons/lu";
import { IoChatbubblesOutline } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();
  const {
    doc_accessToken,
    pat_accessToken,
    role,
    hoveredField,
    userData,
  } = useSelector((state: any) => state.states);
  const { isDark } = useAppSelector((state) => state.stateChange);
  const { nav_icon_update } = useAppSelector((state) => state.stateChange)
  const handleMouseOver = (fieldName: string) => {
    dispatch(setHoverField(fieldName));
  };
  const handleMouseOut = () => {
    dispatch(setHoverField(""));
  };

  return (
    <div className={`tablet:sticky top-0 z-10  ${isDark ? "dark" : ""}`}>
      {pat_accessToken || doc_accessToken ? (
        role !== "doctor" ? (
          <>
            <div className="flex w-full justify-between tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite">
              <div className="cursor-pointer laptop:w-[20%] tablet:w-[40%] h-[100px] overflow-hidden">
                {!isDark ? (
                  <img
                    src="../../public/yattos4-removebg-preview.png"
                    alt="logo"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <img
                    src="../../public/croopedagain-removebg-preview.png"
                    alt="logo"
                    className="object-contain w-full h-full"
                  />
                )}
              </div>
              <div className="flex tablet:w-[30%] laptop:w-[20%] desktop:w-[20%] justify-end items-center gap-7">
                <div
                  className="w-[33%] cursor-pointer flex justify-center"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Notifications"
                >
                  <Link to={"/notification"}>
                    {!isDark ? (
                      <IoNotificationsOutline
                        size={20}
                        color={`${primaryGrey}`}
                      />
                    ) : (
                      <IoNotificationsOutline
                        size={20}
                        color={`${textWhite}`}
                      />
                    )}
                  </Link>
                </div>
                <div className="cursor-pointer flex justify-center items-center w-[33%] ">
                  <Link to="/account">
                    <div className="flex justify-center items-center rounded-full overflow-hidden w-16 h-16">
                      <div className="w-full h-full flex justify-center items-center">
                        <img
                          src={userData?.data?.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </Link>
                </div>


                <div
                  onMouseOut={handleMouseOut}
                  onMouseOver={() =>
                    handleMouseOver(isDark ? "daymode" : "nightmode")
                  }
                  aria-label="Toggle dark mode"
                  onClick={() => dispatch(toogleDarkMode())}
                  className="relative ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2"
                >
                  {isDark ? (
                    <>
                      <MdOutlineLightMode size={30} color={textWhite} />
                      {hoveredField === "daymode" && (
                        <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                          daymode
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <MdOutlineDarkMode size={30} color={primaryBlack} />
                      {hoveredField === "nightmode" && (
                        <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                          nightmode
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div>
                  {nav_icon_update && (<Link to="/account">
                    {isDark ? (
                      <IoChatbubblesOutline size={35} color={`${textWhite}`} />
                    ) : (
                      <IoChatbubblesOutline size={35} color={`${primaryBlack}`} />
                    )}
                  </Link>)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 dark:bg-lightBlack bg-textWhite">
              <div className="sm:col-span-3"></div>
              <div className="flex justify-around w-full font-[400] text-[18px] dark:text-textWhite sm:col-span-6 text-primaryBlack">
                <Link to="/Home">
                  <div className="cursor-pointer hover:bg-primaryBlue px-6 py-2 text-textBlack hover:text-textWhite">
                    Home
                  </div>
                </Link>
                <Link to="/findDoctor">
                  <div className="cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite">
                    Doctors
                  </div>
                </Link>
               <Link to="/chat">
                   <div className="cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite">
                    By criteria
                  </div>
                </Link>
                <Link to="/FinalChatroom">
                  <div className="cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite">
                    Chats
                  </div>
                </Link>
              </div>
            </div>
          </>
        ) : (
          doc_accessToken && (
            <>
              <div className="flex w-full justify-between tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite">
                <div className="cursor-pointer laptop:w-[20%] tablet:w-[40%] h-[100px] overflow-hidden">
                  {!isDark ? (
                    <img
                      src="../../public/yattos4-removebg-preview.png"
                      alt="logo"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <img
                      src="../../public/croopedagain-removebg-preview.png"
                      alt="logo"
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>

                <div className="flex w-[30%] justify-end items-center gap-7">
                  <div
                    className="w-[10%] cursor-pointer"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Notifications"
                  >
                    <Link to={"/notification"}>
                      {!isDark ? (
                        <IoNotificationsOutline
                          size={30}
                          color={`${primaryGrey}`}
                        />
                      ) : (
                        <IoNotificationsOutline
                          size={30}
                          color={`${textWhite}`}
                        />
                      )}
                    </Link>
                  </div>

                  <div className="cursor-pointer flex justify-center items-center w-full ">
                    <Link to="/account">
                      <div className="flex justify-center items-center rounded-full overflow-hidden w-16 h-16 ">
                        <div className="w-full h-full flex justify-center items-center">
                          <img
                            src={userData?.data?.profileImage}
                            alt="Profile"
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div
                    onMouseOut={handleMouseOut}
                    onMouseOver={() =>
                      handleMouseOver(isDark ? "daymode" : "nightmode")
                    }
                    aria-label="Toggle dark mode"
                    onClick={() => dispatch(toogleDarkMode())}
                    className="relative ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2"
                  >
                    {isDark ? (
                      <>
                        <MdOutlineLightMode size={30} color={textWhite} />
                        {hoveredField === "daymode" && (
                          <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                            daymode
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <MdOutlineDarkMode size={30} color={primaryBlack} />
                        {hoveredField === "nightmode" && (
                          <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                            nightmode
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div>
                    {nav_icon_update && (<Link to="/FinalChatroom">
                      {isDark ? (
                        <IoChatbubblesOutline size={35} color={`${textWhite}`} />
                      ) : (
                        <IoChatbubblesOutline size={35} color={`${primaryBlack}`} />
                      )}
                    </Link>)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 dark:bg-lightBlack bg-textWhite">
                <div className="sm:col-span-3"></div>
                <div className="flex justify-center w-full font-[400] text-[18px] dark:text-textWhite sm:col-span-6 text-primaryBlack">
                  <Link to="/DocHome">
                    <div className="font-[500] cursor-pointer hover:bg-primaryBlue px-6 py-2 text-textBlack hover:text-textWhite">
                      Home
                    </div>
                  </Link>
                  <Link to="/prescripe">
                    <div className=" font-[500]  cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite">
                      Patients
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )
        )
      ) : (
        <>
          <div className="flex w-full justify-between tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite">
            <div className="cursor-pointer laptop:w-[20%] tablet:w-[40%] h-[100px] overflow-hidden">
              {!isDark ? (
                <img
                  src="../../public/yattos4-removebg-preview.png"
                  alt="logo"
                  className="object-contain w-full h-full"
                />
              ) : (
                <img
                  src="../../public/croopedagain-removebg-preview.png"
                  alt="logo"
                  className="object-contain w-full h-full"
                />
              )}
            </div>
            <div
              onMouseOut={handleMouseOut}
              onMouseOver={() =>
                handleMouseOver(isDark ? "daymode" : "nightmode")
              }
              aria-label="Toggle dark mode"
              onClick={() => dispatch(toogleDarkMode())}
              className="relative ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2"
            >
              {isDark ? (
                <>
                  <MdOutlineLightMode size={30} color={textWhite} />
                  {hoveredField === "daymode" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50 font-[500]">
                      daymode
                    </div>
                  )}
                </>
              ) : (
                <>
                  <MdOutlineDarkMode size={30} color={primaryBlack} />
                  {hoveredField === "nightmode" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50 font-[500]">
                      nightmode
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12  dark:bg-lightBlack bg-textWhite">
            <div className="sm:col-span-3"></div>
            <div className="flex justify-center w-full font-[400] text-[18px] dark:text-textWhite sm:col-span-6 text-primaryBlack">
              <Link to="/signup">
                <div className="cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite font-[500]">
                  signup
                </div>
              </Link>
              <Link to="/login">
                <div className="cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite font-[500]">
                  login
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
