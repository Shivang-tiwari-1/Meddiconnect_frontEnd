import React from 'react'
import { Link } from 'react-router-dom'

const HomeFotter = () => {
    return (
        <div className="w-full grid grid-cols-1 mobile:grid-cols-2 mobilexl:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 gap-6">

            {/* Column 1 */}
            <div>
                <h2 className="font-bold text-lg mb-3">Yatros</h2>
                <ul className="space-y-1">
                    <li className=" cursor-pointer"><Link to={"#"}>About</Link> </li>
                    <li className=" cursor-pointer"><Link to={'#'}>Blog</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>Careers</Link>  </li>
                    <li className=" cursor-pointer"><Link to={"#"}>Press</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>Contact Us</Link></li>
                </ul>
            </div>


            <div>
                <h2 className="font-bold text-lg mb-3">For Patients</h2>
                <ul className="space-y-1">
                    <li className=" cursor-pointer"><Link to={"#"}>Search for doctors</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>Search for clinics</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}> Search for hospitals</Link></li>
                    <li className=" cursor-pointer"><Link to={"#"}>Search for diagnostics</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>  Read health articles</Link></li>
                </ul>
            </div>

            {/* Column 3 */}
            <div>
                <h2 className="font-bold text-lg mb-3">For Doctors</h2>
                <ul className="space-y-1">
                    <li className="hover:text-blue-400 cursor-pointer"><Link to={"#"}> Practo Consult</Link></li>
                    <li className="hover:text-blue-400 cursor-pointer"><Link to={"#"}>Practo Health Feed</Link> </li>
                    <li className="hover:text-blue-400 cursor-pointer"><Link to={"#"}>Practo Profile</Link> </li>
                </ul>
            </div>

            {/* Column 4 */}
            <div>
                <h2 className="font-bold text-lg mb-3">More</h2>
                <ul className="space-y-1">
                    <li className=" cursor-pointer"><Link to={"#"}>Help</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>Developers</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>Privacy Policy</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>Terms & Conditions </Link> </li>
                </ul>
            </div>

            {/* Column 5 */}
            <div>
                <h2 className="font-bold text-lg mb-3">Social</h2>
                <ul className="space-y-1">
                    <li className=" cursor-pointer"><Link to={"#"}>Facebook</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>Twitter</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>LinkedIn</Link> </li>
                    <li className=" cursor-pointer"><Link to={"#"}>GitHub</Link> </li>
                </ul>
            </div>

        </div>
    )
}

export default React.memo(HomeFotter)
