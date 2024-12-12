import React from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 my-12">
      <form className="flex flex-col items-start gap-6">
      <h1 className="text-4xl font-semibold mb-6 trajan text-start text-[#757575]">Register Your Account</h1>
        {/* Name and Email/Password Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-gray-600 mb-1 times">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-gray-600 mb-1 times">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 mb-1 times">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600 mb-1 times">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-[#CE0067] w-[150px] mr-auto text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
          >
            SUBMIT
          </button>
          <NavLink to={'/'} className="text-sm text-gray-500 hover:underline">
          Cancel
        </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
