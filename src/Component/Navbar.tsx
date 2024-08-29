import React, { useEffect, useState } from 'react';
import { MdOutlineLightMode } from 'react-icons/md';
import { primaryGrey, textWhite } from '../Constants';
import SmallProfileCard from '../Component/UtilityComponents/SmallProfileCard';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { globalResizeFunction } from '../Utility/resizer.Utils';
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
    const dispatch = useDispatch();
    const { accessToken, mobile } = useSelector((state: any) => state.states);
    const [isOpen, setIsOpen] = useState(false);
    globalResizeFunction();

    return (
        <div className={`tablet:sticky top-0 z-10  `}>
            {!mobile ?
                accessToken ?
                    (

                        <>
                            <div className='flex w-full justify-between tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite  '>

                                <div className='cursor-pointer'>
                                    <Link to="/account">
                                        <img src="../../public/Logo.png" alt="logo" />
                                    </Link>
                                </div>
                                <div className='flex w-[30%] justify-end items-center gap-7 '>


                                    <div
                                        className='w-[10%] cursor-pointer'
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Notifications"
                                    >
                                        <IoNotificationsOutline size={20} color={`${primaryGrey}`} />
                                    </div>


                                    <div className='cursor-pointer'>
                                        <Link to="/account">
                                            <FaUser size={30} />
                                        </Link>
                                    </div>
                                    <div
                                        aria-label="Toggle dark mode"
                                        className='ml-4 hover:bg-[#dadada] rounded-xl cursor-pointer p-2'
                                    >
                                        <MdOutlineLightMode size={30} color={`${textWhite}`} />
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-12  dark:bg-lightBlack bg-textWhite'>
                                <div className='sm:col-span-3'></div>
                                <div className='flex justify-around w-full font-[400] text-[18px] dark:text-textWhite sm:col-span-6 text-primaryBlack'>
                                    <Link to='#'>
                                        <div className='cursor-pointer hover:bg-primaryBlue px-6 py-2 text-textBlack hover:text-textWhite'>
                                            Home
                                        </div>
                                    </Link>
                                    <Link to='/findDoctor'>
                                        <div className='`cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite '>
                                            Doctors
                                        </div>
                                    </Link>
                                    <Link to='/chat'>
                                        <div className='cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite'>
                                            By criteria
                                        </div>
                                    </Link>
                                    <Link to='#'>
                                        <div className='cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite'>
                                            account
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>

                    ) : (

                        <>
                            <div className='flex w-full justify-center tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite'>

                                <div className=' cursor-pointer'>
                                    <img src="../../public/Logo.png" alt="logo" />
                                </div>
                            </div>

                            <div className='grid grid-cols-12  dark:bg-lightBlack bg-textWhite'>
                                <div className='sm:col-span-3'></div>
                                <div className='flex justify-center w-full font-[400] text-[18px] dark:text-textWhite sm:col-span-6 text-primaryBlack'>

                                    <Link to='/signup'>
                                        <div className='cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite'>
                                            signup
                                        </div>
                                    </Link>
                                    <Link to='/login'>
                                        <div className='cursor-pointer hover:bg-primaryBlue px-6 py-2 hover:text-textWhite'>
                                            login
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>


                    ) : (
                    <div className='tablet:sticky top-0 z-10 '>
                        {accessToken ? (
                            <>

                                <div className='relative flex w-full justify-between tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite'>

                                    <div className='cursor-pointer w-[30%]'>
                                        <img src="../../public/Logo.png" alt="logo" />
                                    </div>

                                    <div className='tablet:hidden cursor-pointer flex justify-end' onClick={() => setIsOpen(!isOpen)}>
                                        <GiHamburgerMenu size={30} />
                                    </div>

                                    <div className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-textWhite dark:bg-lightBlack transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-20 shadow-lg`}>

                                        <div className='flex justify-end p-4 border-b-2' onClick={() => setIsOpen(false)}>
                                            <RxCross2 size={30} />
                                        </div>

                                        <div className='flex flex-col items-start gap-6 p-6 font-[400] text-[18px] dark:text-textWhite text-primaryBlack'>

                                            <div className='flex items-center gap-2'>
                                                <IoNotificationsOutline size={20} color={primaryGrey} className='cursor-pointer' data-tooltip-id="my-tooltip" data-tooltip-content="Notifications" />
                                                <div className='cursor-pointer'><SmallProfileCard /></div>
                                            </div>

                                            <Link to='#' className='cursor-pointer hover:bg-primaryBlue px-4 py-2 rounded hover:text-textWhite'>
                                                Home
                                            </Link>

                                            <Link to='/findDoctor' className='cursor-pointer hover:bg-primaryBlue px-4 py-2 rounded hover:text-textWhite'>
                                                Doctors
                                            </Link>

                                            <Link to='/chat' className='cursor-pointer hover:bg-primaryBlue px-4 py-2 rounded hover:text-textWhite'>
                                                By criteria
                                            </Link>

                                            <Link to='#' className='cursor-pointer hover:bg-primaryBlue px-4 py-2 rounded hover:text-textWhite'>
                                                Account
                                            </Link>

                                        </div>

                                    </div>

                                </div>
                            </>
                        ) : (
                            <>
                                <div className='relative flex w-full justify-between tablet:px-[5rem] px-[1rem] py-2 items-center border-b border-primaryGrey dark:bg-lightBlack bg-textWhite'>

                                    <div className='cursor-pointer w-[30%]'>
                                        <img src="../../public/Logo.png" alt="logo" />
                                    </div>

                                    <div className='tablet:hidden cursor-pointer flex justify-end' onClick={() => setIsOpen(!isOpen)}>
                                        <GiHamburgerMenu size={30} />
                                    </div>

                                    <div className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-textWhite dark:bg-lightBlack transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-20 shadow-lg`}>

                                        <div className='flex justify-end p-4 border-b-2' onClick={() => setIsOpen(false)}>
                                            <RxCross2 size={30} />
                                        </div>

                                        <div className='flex flex-col items-start gap-6 p-6 font-[400] text-[18px] dark:text-textWhite text-primaryBlack'>

                                            <Link to='/signUp' className='cursor-pointer hover:bg-primaryBlue px-4 py-2 rounded hover:text-textWhite'>
                                                signup
                                            </Link>

                                            <Link to='/login' className='cursor-pointer hover:bg-primaryBlue px-4 py-2 rounded hover:text-textWhite'>
                                                login
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}



        </div>
    )
}

export default Navbar
