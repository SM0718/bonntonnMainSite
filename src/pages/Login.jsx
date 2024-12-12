import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 my-12">
      <form className="flex flex-col items-start gap-4">
      <h1 className="text-4xl font-semibold mb-6 trajan text-start text-[#757575]">Login</h1>
        {/* Email and Password Fields */}
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 mb-1 times">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border-[2px] bg-white border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600 mb-1 times">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-[2px] bg-white border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <a
              href="#"
              className="text-sm text-gray-500 hover:underline mt-1"
            >
              Recover Password
            </a>
          </div>
        </div>
        {/* Buttons */}
        <button
          type="submit"
          className="bg-[#CE0067] w-[150px] mr-auto text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
        >
          SIGN IN
        </button>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          Create Account
        </a>
      </form>
    </div>
  );
};

export default Login;
