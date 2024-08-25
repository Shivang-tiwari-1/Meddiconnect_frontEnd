import React from 'react'

const SmallProfileCard = () => {
    return (
        <div className='flex items-center'>
            <div className='px-2 w-[60px] h-[60px] flex items-center'>
                <img src="../../public/Akash Yadav.png" alt="shivang" />
            </div>
            <div className="px-2">
                <div className="font-[600] text-[14px] text-primaryBlack dark:text-textWhite">
                    Akash
                </div>
                <div className="font-[400] text-[14px] text-primaryGrey dark:text-textGrey">
                    Owner
                </div>
            </div>
        </div>
    )
}

export default SmallProfileCard
