import React, { useState } from "react";
import {
  reSetCredentials,
  setCredentials,
  setHoverField,
  toggleShowPassword,
  toogleCongirmPassword,
  tooglePatientCheck,
  toogleTermAcdepted,
} from "../../Redux/slices/signup_login.";
import { signup } from "../../Redux/slices/signup_login.";
import { useAppDispatch, useAppSelector } from "../../Redux/Store/Store";
import Button from "../UtilityComponents/Button";
import { globalResizeFunction } from "../../Utility/resizer.Utils";
import { useNavigate } from "react-router-dom";
import { IoMdLocate } from "react-icons/io";
import { get_Current_location } from "../../Services/service";
import Loader from "../../Utility/loader/Loader";

const SignUp = React.memo(() => {
  const navigate = useNavigate();

  //**************************APPSELECTOR****************/
  const {
    showPassword,
    termsAccepted,
    confirmPassword,
    credentials,
    mobile,
    hoveredField,
    loading,
    coordinates,
  } = useAppSelector((state) => state.states);

  const { isDark } = useAppSelector((state) => state.stateChange);

  //*************************DISPATCH********************/
  const dispatch = useAppDispatch();

  //***************************HANDLEFUNCTION**************/
  globalResizeFunction();

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;
    if (type === "file" && files) {
      setProfileImage(files[0]);
    } else {
      dispatch(
        setCredentials({ field: name as keyof typeof credentials, value })
      );
    }
  };
  const handleRolegenderChange = (e: any) => {
    const { value } = e.target;
    if (value === "doctor" || value === "patient") {
      dispatch(setCredentials({ field: "role", value }));
    } else {
      dispatch(setCredentials({ field: "gender", value }));
    }
    dispatch(tooglePatientCheck(value));
  };
  const handleCheckboxChange = () => {
    dispatch(toogleTermAcdepted());
  };
  const handleConfirmPasswordState = (e: any) => {
    dispatch(toogleCongirmPassword(e.target.value));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmPassword !== credentials?.password) {
      alert("Confirm password does not match");
      return;
    }
    if (!termsAccepted) {
      alert("You must accept the terms and conditions");
      return;
    }

    const formData = new FormData();

    Object.entries(credentials).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });

    if (profileImage) { formData.append("profileImage", profileImage); } else {
      throw new Error('no profile imahe')
    }
    formData.append("latitude", (coordinates as any)?.latitude);
    formData.append("longitude", (coordinates as any)?.longitude);
    dispatch(signup(formData)).then((action) => {
      if (action.type === "user/signup/fulfilled") {
        navigate("/login", { replace: true });
      }
    });
    dispatch(
      reSetCredentials()
    );
    dispatch(toogleCongirmPassword(""));
  };
  const handleMouseOver = (fieldNam: string) => {
    dispatch(setHoverField(fieldNam));
  };
  const handleMouseOut = () => {
    dispatch(setHoverField(""));
  };


  return (
    <div
      className={`flex w-[100%] mobile:h-[100vh] desktop:h-[86vh] justify-center items-center ${isDark ? "bg-lightBlack" : "bg-white"}`}
    >
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`flex flex-col justify-center items-center mt-[2rem]  pb-[9rem] desktop:w-[40%] tablet:w-[90%]  mobile:w-full `}
        >
          <div className="w-full flex flex-col justify-center items-center mobile:w-full">
            <div className="flex w-[80%] flex-col justify-center items-center h-[60vh] border-2 rounded-2xl shadow-2xl mobile:w-[90%] mobile:h-[80vh]">
              <form onSubmit={handleSubmit} className="mobile:w-[80%]">
                <div className="flex flex-row pb-5 gap-[1rem] ">
                  <div className="w-1/2 relative font-[500]">
                    <select
                      name="role"
                      value={credentials?.role}
                      onChange={handleRolegenderChange}
                      onMouseOver={() => handleMouseOver("role")}
                      onMouseOut={handleMouseOut}
                      className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full placeholder-gray-500 outline-none shadow-lg"
                    >
                      <option value="">Select Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="patient">Patient</option>
                    </select>
                    {hoveredField === "role" && (
                      <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                        Select your role
                      </div>
                    )}
                  </div>
                  <div className="relative w-1/2 font-[500]">
                    <select
                      name="gender"
                      value={credentials?.gender}
                      onChange={handleRolegenderChange}
                      onMouseOver={() => handleMouseOver("gender")}
                      onMouseOut={handleMouseOut}
                      className="border border-primaryGrey rounded-lg h-10 w-full placeholder-gray-500 outline-none shadow-lg"
                    >
                      <option value=""> gender</option>
                      <option value="Male">Male</option>
                      <option value="female">Femlae</option>
                      <option value="other">other</option>
                    </select>

                    {hoveredField === "gender" && (
                      <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                        Select your gender
                      </div>
                    )}
                  </div>
                  <div className={`w-1/2 relative`}>
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      accept="image/*"
                      onMouseOver={() => handleMouseOver("profileImage")}
                      onMouseOut={handleMouseOut}
                      className={`border border-primaryGrey rounded-[10px] h-[2.5rem] w-full placeholder-gray-500 outline-none shadow-lg ${isDark ? "bg-white" : ""
                        }`}
                      onChange={handleInputChange}
                    />
                    {hoveredField === "profileImage" && (
                      <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                        Upload your image
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row pb-5 gap-[1rem] ">
                  <div className="w-1/2 relative">
                    <input
                      type="text"
                      placeholder="Name"
                      value={credentials?.name}
                      name="name"
                      id="name"
                      required
                      className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg font-[500
                    ]"
                      onChange={handleInputChange}
                      onMouseOver={() => handleMouseOver("Name")}
                      onMouseOut={handleMouseOut}
                    />
                    {hoveredField === "Name" && (
                      <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                        Enter your Name
                      </div>
                    )}
                  </div>
                  <div className="w-1/2 relative">
                    <input
                      type="text"
                      placeholder="Email"
                      value={credentials?.email}
                      name="email"
                      id="email"
                      required
                      className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg"
                      onChange={handleInputChange}
                      onMouseOver={() => handleMouseOver("Email")}
                      onMouseOut={handleMouseOut}
                    />
                    {hoveredField === "Email" && (
                      <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                        Enter your Email
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row pb-5 relative">
                  <input
                    type="text"
                    name="address"
                    value={credentials?.address}
                    id="address"
                    placeholder="Address"
                    required
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                    onChange={handleInputChange}
                    onMouseOver={() => handleMouseOver("Address")}
                    onMouseOut={handleMouseOut}
                  />

                  {hoveredField === "Address" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                      Enter your Address
                    </div>
                  )}
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() =>
                        get_Current_location(navigator.geolocation, dispatch)
                      }
                      className="flex justify-center items-center"
                      onMouseOver={() => handleMouseOver("locateMe")}
                      onMouseOut={handleMouseOut}
                    >
                      <IoMdLocate size={25} className="absolute right-2 " />
                    </button>
                    {hoveredField === "locateMe" && (
                      <div className="absolute right-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                        Locate me
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col pb-5 relative">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={credentials?.password}
                      id="password"
                      placeholder="Password"
                      required
                      className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                      onChange={handleInputChange}
                      onMouseOver={() => handleMouseOver("Password")}
                      onMouseOut={handleMouseOut}
                    />
                    {hoveredField === "Password" && (
                      <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                        Enter your Password
                      </div>
                    )}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        className="focus:outline-none"
                        onClick={() => dispatch(toggleShowPassword())}
                      >
                        {credentials?.password?.length === 0
                          ? " "
                          : showPassword
                            ? "Hide"
                            : "Show"}
                      </button>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pb-5 relative">
                  <input
                    type="tel"
                    name="phone"
                    value={(credentials as any)?.phone}
                    id="phone"
                    required
                    placeholder="Phone"
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg"
                    onChange={handleInputChange}
                    onMouseOver={() => handleMouseOver("Phone")}
                    onMouseOut={handleMouseOut}
                  />
                  {hoveredField === "Phone" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                      Enter your Phone
                    </div>
                  )}
                </div>

                <div className="flex flex-col pb-5 relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg"
                    onChange={handleConfirmPasswordState}
                    onMouseOver={() => handleMouseOver("Confirm Password")}
                    onMouseOut={handleMouseOut}
                  />
                  {hoveredField === "Confirm Password" && (
                    <div className="absolute left-0 top-[-40px] p-2 bg-gray-200 text-black text-sm rounded-md shadow-lg z-50">
                      Confirm Password
                    </div>
                  )}
                </div>

                <div
                  className={` ${isDark ? "text-white" : ""
                    } flex space-x-2 justify-center font-[500]  `}
                >
                  <label className="space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox cursor-pointer"
                      checked={termsAccepted}
                      onChange={handleCheckboxChange}
                    />
                    <span className=" ">
                      I agree to all{" "}
                      <a
                        href="#"
                        className="underline text-primaryBlue cursor-pointer"
                      >
                        terms & conditions
                      </a>
                    </span>
                  </label>
                </div>

                <div
                  className={`flex justify-center items-center flex-col ${isDark ? "text-white" : ""
                    } `}
                >
                  <div className={`font-[500] cursor-pointer  pt-8`}>
                    Already have an account?{" "}
                    <a href="#" className="text-primaryBlue underline">
                      Login
                    </a>
                  </div>
                </div>

                <div className="flex justify-center mt-3">
                  <Button text="Submit" style="w-[50%]" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default SignUp;
