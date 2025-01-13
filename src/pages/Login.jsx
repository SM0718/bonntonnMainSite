import React from "react";
import { useForm, Controller } from "react-hook-form";
import useStore from "@/store/store";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const isLoggedIn = useStore((state) => state.isLoggedIn); // Access login state
  const user = useStore((state) => state.user); // Access user info
  const login = useStore((state) => state.login);
  const navigate = useNavigate()
  // console.log(user.accessToken)

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const request = await fetch("https://bonnbackend.up.railway.app/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include", // Include cookies in the request
      });
  
      const responseData = await request.json();
      console.log("Response:", responseData.data.user);
  
      if (responseData.statusCode === 200) {
        toast.success("Login Successful, Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      
        login({
          isLoggedIn: true,
          user: responseData.data.user,
        });
      
        setTimeout(() => {
          navigate("/"); // Redirect after showing the toast
        }, 2000); // Match the `autoClose` duration
      }
       else {
        toast.error(responseData.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div className="flex flex-col items-center justify-center p-4 my-12">
      <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-semibold mb-6 trajan text-start text-[#757575]">Login</h1>

        {/* Email and Password Fields */}
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 mb-1 times">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email" } }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  className="border-[2px] bg-white border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600 mb-1 times">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  className="border-[2px] bg-white border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <a href="#" className="times text-sm text-gray-500 hover:underline mt-1">Recover Password</a>
          </div>
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="bg-[#CE0067] w-[150px] times mr-auto text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
        >
          SIGN IN
        </button>
        <NavLink to={"/register"} className="times text-sm text-gray-500 hover:underline">
          Create Account
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
