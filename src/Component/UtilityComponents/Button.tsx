import React, { MouseEventHandler } from 'react';

interface ButtonProps {
    style: string;
    onclick?: MouseEventHandler<HTMLDivElement>;
    text: string;
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    const { text, style, onclick, disabled } = props;
    return (
        <div
            className={`py-2 rounded-[12px] cursor-pointer bg-primaryBlue font-[600] text-textWhite searchButtonStyles hover:shadow-md hover:scale-105 transition-transform duration-300 disable-selection ${style}`}
            onClick={onclick}
            style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            <div className='flex justify-center'>
                <button type='submit'>
                    {text}
                </button>
            </div>

        </div>
    );
}

export default Button;
