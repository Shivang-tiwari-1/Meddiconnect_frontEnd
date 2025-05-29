import moment from 'moment';
import React from 'react'
interface incomingdata {
    availability?: [];
    change?: string
}
const AppointmentNumberShow = (props) => {
    const { availability, change } = props;

    const check_day =
        availability?.filter((index: any) => {
            return index?.day === moment(new Date()).format('dddd').toString().toLowerCase() || index?.day === (change as any).toLowerCase();
        }) || [];

    return (
        <div className="flex h-[20vh] w-full">
            <div className="flex justify-end items-end w-full px-[2rem] pb-2 border-b-4 border-gray-500">
                {" "}

                <p className="text-9xl font-medium mb-4">
                    {" "}
                    {check_day?.length === 0
                        ? 0
                        : (check_day as any)[0]?.laterNumber?.number}
                </p>

            </div>
        </div>
    )
}

export default AppointmentNumberShow
