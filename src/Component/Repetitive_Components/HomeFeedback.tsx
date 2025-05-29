import React from 'react'
import { Link } from 'react-router-dom'

const HomeFeedback = () => {
    console.log("re-render-HomeFeedback")

    const review = [
        "Dr Hardik Seth is very co-operative and friendly Doctor. One of my relatives Mr Arvind Gupta’s treatment is going on for psychiatric problem. We r very much satisfied with his treatment and Consultation. My relative is improving a lot. Thanks Doctor.  - Santosh Gupta",
        "Dr Hardik Seth is very co-operative and friendly Doctor. One of my relatives Mr Arvind Gupta’s treatment is going on for psychiatric problem. We r very much satisfied with his treatment and Consultation. My relative is improving a lot. Thanks Doctor.  - Santosh Gupta"
    ]
    return (

        <div className="w-full   min-h-[30vh] h-auto  flex  flex-col py-4 border-b-2 shadow-lg rounded-md mobile:hidden">
            <div className="flex flex-col  py-2  h-full">
                <div className="flex justify-start items-center w-full h-auto px-3">
                    <p className="h-auto font-[400] text-2xl">
                        Feedback
                    </p>
                </div>
                <div className="w-full h-full px-3 py-3 gap-4 flex flex-col">

                    {review.map((item, index) => (
                        <div key={index} className="border-2 h-32 w-full rounded-l-full flex ">
                            <div className="w-[18.5%] h-[12.6vh]  rounded-full flex   justify-start items-start">
                            </div>
                            <div className="w-[80%] flex justify-center items-center ml-2">
                                <p className="font-[500]">{item}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default React.memo(HomeFeedback)
