import React from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { IoChatbubblesOutline, IoNotificationsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'
import { primaryBlack, primaryGrey, textWhite } from '../../Constants';
import { useAppSelector } from '../../Redux/Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { menu_change, toogleDarkMode } from '../../Redux/slices/StateChange.slice';
import { IoIosHeartEmpty, IoMdArrowRoundBack, IoMdMenu } from 'react-icons/io';

const NavBarComponents = () => {
  const dispatch = useDispatch();
  const doc_accessToken = useSelector((state: any) => state.states.doc_accessToken);
  const userData = useSelector((state: any) => state.states.userData);
  const role = useSelector((state: any) => state.states.role);
  const pat_accessToken = useSelector((state: any) => state.states.pat_accessToken);
  const isDark = useAppSelector((state) => state.stateChange.isDark);
  const menu = useAppSelector((state) => state.stateChange.menu);
  const showMessageIcon = useAppSelector(state => state.MessageSlice.showMessageIcon);
  const nav_icon_update = useAppSelector((state) => state.stateChange.nav_icon_update);
  const chatting_doctors = useAppSelector((state) => state.MessageSlice.chatting_doctors);
  return (
    <>
      {pat_accessToken || doc_accessToken ? (
        role !== "doctor" ? (
          <>
            <div className="flex w-[100%] justify-between tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite ">

              <div className="flex flex-row justify-between items-center w-full mobile:h-24">
                <div className="cursor-pointer laptop:w-[20%] tablet:w-[40%] h-[100px] overflow-hidden mobile:w-[40%] mobile:mb-4">
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

                <div className="flex tablet:w-[30%] laptop:w-[20%] desktop:w-[25%] justify-end items-center gap-7 ">
                  <div className='flex w-full  justify-evenly items-center'>
                    < div
                      className="cursor-pointer flex justify-center w-[30%]"
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

                    <div className="cursor-pointer flex justify-center items-center w-[33%] mobile:hidden">
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

                      aria-label="Toggle dark mode"
                      onClick={() => dispatch(toogleDarkMode())}
                      className="relative ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2  mobile:hidden"
                    >
                      {isDark ? (
                        <>
                          <MdOutlineDarkMode size={30} color={'white'} />
                        </>
                      ) : (
                        <>
                          <MdOutlineDarkMode size={30} color={primaryBlack} />

                        </>
                      )}
                    </div>


                  </div>



                  {!menu ? (
                    !isDark ?
                      (
                        <div className={`tablet:hidden desktop:hidden laptop:hidden  transition-transform duration-500 ${!menu ? 'rotate-180' : ''}`} onClick={() => dispatch(menu_change(true))}>
                          <IoMdMenu size={30} />
                        </div>
                      ) :
                      (
                        <div className={`tablet:hidden desktop:hidden laptop:hidden transition-transform duration-500 ${menu ? 'rotate-180' : ''} `} onClick={() => dispatch(menu_change(true))}>
                          <IoMdMenu size={30} color={"white"} />
                        </div>
                      )) :
                    (
                      <div className={`absolute border-2 h-[55vh]  top-10  z-50 w-[50%]  rounded-lg flex justify-center ${isDark ? "bg-black" : " bg-[#F0F0F5]"} transition-transform duration-500 ${menu ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex flex-col items-center w-[90%] my-3">
                          <div className="flex justify-center items-center gap-5">
                            {isDark ? <div onClick={() => dispatch(menu_change(false))}>
                              <IoMdArrowRoundBack size={30} color={"white"} />
                            </div> : <div onClick={() => dispatch(menu_change(false))}>
                              <IoMdArrowRoundBack size={30} />
                            </div>}
                            <div
                              aria-label="Toggle dark mode"
                              onClick={() => dispatch(toogleDarkMode())}
                              className="relative ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2  "
                            >
                              {isDark ? (
                                <>
                                  <MdOutlineLightMode size={30} color={textWhite} />
                                </>
                              ) : (
                                <>
                                  <MdOutlineDarkMode size={30} color={primaryBlack} />
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex  h-[38vh] flex-col  items-center w-full font-[400] text-[18px] dark:text-textWhite sm:col-span-6 text-primaryBlack overflow-x-scroll custom-scrollbar " >
                            <Link to="/Home">
                              <div className="cursor-pointer hover:bg-[#02a6d8] px-6 py-2 text-textBlack hover:text-textWhite">
                                Home
                              </div>
                            </Link>
                            <Link to="/findDoctor">
                              <div className="cursor-pointer hover:bg-[#02a6d8] px-6 py-2 hover:text-textWhite">
                                Doctors
                              </div>
                            </Link>
                            <Link to="/chat">
                              <div className="cursor-pointer hover:bg-[#02a6d8] px-6 py-2 hover:text-textWhite">
                                By criteria
                              </div>
                            </Link>
                            <Link to="/FinalChatroom">
                              <div className="cursor-pointer hover:bg-[#02a6d8] px-6 py-2 hover:text-textWhite">
                                Chats
                              </div>
                            </Link>

                          </div>


                          <div className="flex justify-center items-center gap-6">
                            <div
                              className="w-[33%] cursor-pointer flex justify-center"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Notifications"
                            >
                              <Link to={"/notification"}>
                                {!isDark ? (
                                  <IoNotificationsOutline
                                    size={30}
                                    color={`black`}
                                  />
                                ) : (
                                  <IoNotificationsOutline
                                    size={30}
                                    color={`white`}
                                  />
                                )}
                              </Link>
                            </div>

                            {userData?.data?.profileImage ?
                              (
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
                              ) :
                              (
                                <div className="cursor-pointer flex justify-center items-center w-[33%] ">
                                  <Link to="/account">
                                    <div className="flex justify-center items-center rounded-full overflow-hidden w-16 h-16">
                                      {!isDark ? (<div className="w-full h-full flex justify-center items-center">
                                        <FaRegUser size={30} />
                                      </div>) : (
                                        <div className="w-full h-full flex justify-center items-center">
                                          <FaRegUser size={30} color={'white'} />
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                </div>
                              )}

                          </div>


                        </div>

                      </div>
                    )}
                </div>
                
              </div>
            </div>

            <div className="grid grid-cols-12 dark:bg-lightBlack bg-textWhite   mobile:hidden ">
              <div className="sm:col-span-3"></div>
              <div className="flex justify-around w-full font-[400] text-[18px] dark:text-textWhite sm:col-span-6 text-primaryBlack">
                <Link to="/Home">
                  <div className="cursor-pointer hover:bg-[#02a6d8] px-6 py-2 text-textBlack hover:text-textWhite">
                    Home
                  </div>
                </Link>
                <Link to="/findDoctor">
                  <div className="cursor-pointer hover:bg-[#02a6d8] px-6 py-2 hover:text-textWhite">
                    Doctors
                  </div>
                </Link>
                <Link to="/appointMent">
                  <div className="cursor-pointer hover:bg-[#02a6d8] px-6 py-2 hover:text-textWhite">
                    Appointments
                  </div>
                </Link>
                 <Link to="/FinalChatroom">
                  <div className="cursor-pointer hover:bg-[#02a6d8] px-6 py-2 hover:text-textWhite">
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

                <div className="flex desktop:w-[20%] laptop:w-[20%] items-center gap-7">
                  <div
                    className="cursor-pointer"
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
                    aria-label="Toggle dark mode"
                    onClick={() => dispatch(toogleDarkMode())}
                    className="relative ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2 "
                  >
                    {isDark ? (
                      <>
                        <MdOutlineLightMode size={30} color={textWhite} />

                      </>
                    ) : (
                      <>
                        <MdOutlineDarkMode size={30} color={primaryBlack} />

                      </>
                    )}
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
                  {nav_icon_update || showMessageIcon && <Link to="/FinalChatroom">
                    <div className=" font-[500]  cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite">
                      Chats
                    </div>
                  </Link>}
                </div>
              </div>
            </>
          )
        )
      ) : (
        <>
          <div className="flex w-full justify-between items-center tablet:px-[5rem] px-[1rem] py-2  border-b border-primaryGrey dark:bg-lightBlack bg-textWhite ">
            <div className="flex justify-between items-center w-full">

              <div className="cursor-pointer laptop:w-[20%] tablet:w-[40%] h-[80px] overflow-hidden mobile:w-[40%] pb-2">
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

                aria-label="Toggle dark mode"
                onClick={() => dispatch(toogleDarkMode())}
                className="relative ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2"
              >
                {isDark ? (
                  <>
                    <MdOutlineLightMode size={30} color={textWhite} />
                  </>
                ) : (
                  <>
                    <MdOutlineDarkMode size={30} color={primaryBlack} />
                  </>
                )}
              </div>
            </div>

          </div>

          <div className="  dark:bg-lightBlack bg-textWhite flex justify-center items-center">
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
    </>
  )
}

export default React.memo(NavBarComponents);
