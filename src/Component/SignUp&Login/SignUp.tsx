import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowPassword, toogleCongirmPassword, tooglePatientCheck, toogleTermAcdepted } from '../../Redux/slices/signup_login.';
import { signup } from '../../Redux/slices/signup_login.';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/Store';
import Button from '../UtilityComponents/Button';
import { globalResizeFunction } from '../../Utility/resizer.Utils';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: '', email: "", password: "", address: "", role: "", phone: "" });

  const { showPassword, termsAccepted, confirmPassword, mobile } = useAppSelector((state) => state.states);
  const dispatch = useAppDispatch();

  globalResizeFunction();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    dispatch(tooglePatientCheck(value));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toogleTermAcdepted());
  };

  const handleConfirmPasswordStae = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toogleCongirmPassword(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedCredentials = {
      ...credentials,
      phone: Number(credentials.phone),
    };

    if (confirmPassword !== credentials.password) {
      alert('conform passwprd is not save ')
    } else {
      dispatch(signup({
        name: updatedCredentials.name,
        email: updatedCredentials.email,
        password: updatedCredentials.password,
        phone: updatedCredentials.phone,
        address: updatedCredentials.address,
        role: updatedCredentials.role
      }));

      setCredentials({ name: '', email: "", password: "", address: "", role: "", phone: "" });

    }
  };

  return (

    !mobile ? (
      <div className='flex w-[100%] h-[85vh] justify-center items-center bg-textWhite dark:bg-lightBlack'>

        <div className='flex flex-col justify-center items-center mt-[2rem] dark:border-textWhite pb-[9rem] desktop:w-[40%] tablet:w-[90%]'>

          <div className='w-full flex flex-col justify-center items-center'>

            <div className="flex w-[80%] flex-col justify-center items-center h-[60vh] border-2 rounded-2xl shadow-2xl">

              <form onSubmit={handleSubmit}>
                
                <div className='flex flex-row pb-5 gap-[1rem]'>
                  <label>
                    Role:
                    <select
                      name="role"
                      value={credentials.role}
                      onChange={handleRoleChange}
                      className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full placeholder-gray-500 outline-none shadow-lg'
                    >
                      <option value="">Select Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="patient">Patient</option>
                    </select>
                  </label>
                </div>

                <div className='flex flex-row pb-5 gap-[1rem]'>
                  <input type="text"
                    placeholder="Name"
                    value={credentials.name}
                    name="name"
                    id="name"
                    className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg'
                    onChange={handleInputChange} />
                  <input type="text"
                    placeholder="Email"
                    value={credentials.email}
                    name="email"
                    id="email"
                    className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg'
                    onChange={handleInputChange} />
                </div>

                <div className='flex flex-col pb-5'>
                  <div className='relative'>
                    <input type="text"
                      name="address"
                      value={credentials.address}
                      id="address"
                      placeholder='Address'
                      className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg'
                      onChange={handleInputChange} />
                  </div>
                </div>

                <div className='flex flex-col pb-5'>
                  <div className='relative'>
                    <input type={showPassword ? "text" : "password"}
                      name="password"
                      value={credentials.password}
                      id="password"
                      placeholder='Password'
                      className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg'
                      onChange={handleInputChange} />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button type="button"
                        className="focus:outline-none"
                        onClick={() => dispatch(toggleShowPassword())}>
                        {credentials.password.length === 0 ? " " : (showPassword ? "Hide" : "Show")}
                      </button>
                    </span>
                  </div>
                </div>

                <div className='flex flex-col pb-5'>
                  <div className='relative'>
                    <input type='tel'
                      name="phone"
                      value={credentials.phone}
                      id="phone"
                      placeholder='phone'
                      className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg'
                      onChange={handleInputChange} />
                  </div>
                </div>

                <div className='flex flex-col pb-5'>
                  <div className='relative'>
                    <input type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      id="confirmPassword"
                      placeholder='Confirm Password'
                      className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg'
                      onChange={handleConfirmPasswordStae} />
                  </div>
                </div>

                <div className='flex space-x-2'>
                  <label className="space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={termsAccepted}
                      onChange={handleCheckboxChange} />
                    <span className="text-sm dark:text-textWhite">
                      I agree to all <a href="#" className="text-primaryBlue">terms & conditions</a>
                    </span>
                  </label>
                  <div className='font-[500] cursor-pointer'>
                    <a href="#" className="text-primaryBlue">Forgot your password?</a>
                  </div>
                </div>

                <div className='flex justify-center items-center flex-col'>
                  <div className='font-[500] cursor-pointer dark:text-textWhite pt-8'>
                    Already have an account? <a href="#" className="text-primaryBlue">Login</a>
                  </div>
                </div>
                <div className='flex justify-center mt-3'>
                  <Button text='Submit' style='w-[50%]' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) :
      (
        <div className='flex w-[100%] h-[100vh] justify-center items-center bg-textWhite dark:bg-lightBlack'>

          <div className='flex flex-col justify-center items-center mt-[2rem] dark:border-textWhite pb-[9rem] desktop:w-[40%] tablet:w-[90%]  '>

            <div className='w-full flex flex-col justify-center items-center '>

              <div className="flex w-[80%] flex-col justify-center items-center">

                <form onSubmit={handleSubmit}>

                  <div className='flex flex-row pb-5 gap-[1rem]'>
                    <label>
                      Role:
                      <select
                        name="role"
                        value={credentials.role}
                        onChange={handleRoleChange}
                        className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full placeholder-gray-500 outline-none shadow-lg'
                      >
                        <option value="">Select Role</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                      </select>
                    </label>
                  </div>

                  <div className='flex flex-row pb-5 gap-[1rem]'>
                    <input type="text"
                      placeholder="Name"
                      value={credentials.name}
                      name="name"
                      id="name"
                      className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg'
                      onChange={handleInputChange} />
                    <input type="text"
                      placeholder="Email"
                      value={credentials.email}
                      name="email"
                      id="email"
                      className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg'
                      onChange={handleInputChange} />
                  </div>

                  <div className='flex flex-col pb-5'>
                    <div className='relative'>
                      <input type="text"
                        name="address"
                        value={credentials.address}
                        id="address"
                        placeholder='Address'
                        className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg'
                        onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className='flex flex-col pb-5'>
                    <div className='relative'>
                      <input type={showPassword ? "text" : "password"}
                        name="password"
                        value={credentials.password}
                        id="password"
                        placeholder='Password'
                        className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg'
                        onChange={handleInputChange} />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button type="button"
                          className="focus:outline-none"
                          onClick={() => dispatch(toggleShowPassword())}>
                          {credentials.password.length === 0 ? " " : (showPassword ? "Hide" : "Show")}
                        </button>
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-col pb-5'>
                    <div className='relative'>
                      <input type='tel'
                        name="phone"
                        value={credentials.phone}
                        id="phone"
                        placeholder='phone'
                        className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full pr-10 outline-none shadow-lg'
                        onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className='flex flex-col pb-5'>
                    <div className='relative'>
                      <input type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        id="confirmPassword"
                        placeholder='Confirm Password'
                        className='border border-primaryGrey rounded-[10px] h-[2.5rem] w-full outline-none shadow-lg'
                        onChange={handleConfirmPasswordStae} />
                    </div>
                  </div>

                  <div className='flex space-x-2'>
                    <label className="space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={termsAccepted}
                        onChange={handleCheckboxChange} />
                      <span className="text-sm dark:text-textWhite">
                        I agree to all <a href="#" className="text-primaryBlue">terms & conditions</a>
                      </span>
                    </label>

                  </div>

                  <div className='flex justify-center items-center flex-col'>
                    <div className='font-[500] cursor-pointer dark:text-textWhite pt-8'>
                      Already have an account? <a href="#" className="text-primaryBlue">Login</a>
                    </div>
                  </div>

                  <div className='flex justify-center mt-3'>
                    <Button text='Submit' style='w-[50%]' />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      )
  )
}

export default SignUp;