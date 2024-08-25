import React, { useState } from 'react'

const LeftScrollBar = () => {
    const data = [
        'Apple',
        'Banana',
        'Orange',
        'Mango',
        'Pineapple',
        'Grapes'
    ];

    const [searchQuery, setSearchQuery] = useState('');

    const filteritems = data.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
        <div className='flex flex-col items-center border-2 shadow-lg rounded-md w-[100%] h-full p-4 space-y-4'>
            <div className='w-full rounded-full border-b-2 border-gray-300 outline-none shadow-lg'>
                <input
                    className="w-full h-[2.5rem] outline-none  placeholder-gray-500 px-4"
                    type="text"
                    placeholder='search'
                    id="serach"
                    name="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-col w-full space-y-2">
                {searchQuery.length === 0 ? data.map((item, index) => (
                    <div key={index} className='bg-white shadow-md border border-gray-200 rounded-md p-2 h-[7rem] flex items-center'>
                        <p className='flex-grow text-left'>{item}</p>
                    </div>
                )) : filteritems.map((item, index) => (
                    <div key={index} className='bg-white shadow-md border border-gray-200 rounded-md p-2 h-[7rem] flex items-center'>
                        <p className='flex-grow text-left'>{item}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default LeftScrollBar
