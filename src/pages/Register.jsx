import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import useStore from "@/store/store";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    
    const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//   const onSubmit = async (data) => {
//     console.log(data);
//     try {
//         const request = await fetch("http://localhost:4000/api/v1/users/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json", // Set JSON content type
//             },
//             body: JSON.stringify({
//                 fullName: `${data.firstName} ${data.lastName}`,
//                 email: data.email,
//                 password: data.password,
//             }),
//         });

//         if (request.ok) {
//             const responseData = await request.json();
//             if(responseData.statusCode === 200) {
//               toast.success("Registration Successfull", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 theme: "dark",
//             })
//               navigate("/login")
//             }
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };

const onSubmit = async (data) => {
  console.log("Form submitted:", data);
  try {
      const request = await fetch("https://bonnbackend.up.railway.app/api/v1/users/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              fullName: `${data.firstName} ${data.lastName}`,
              email: data.email,
              password: data.password,
          }),
      });

      const responseData = await request.json();
      console.log("Response:", responseData); // Add this log

      if (request.ok) {
          if(responseData.statusCode === 200) {
              toast.success("Registration Successful", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: "dark",
              });
              navigate("/login")
          }
      } else {
          // Add error handling for non-200 responses
          toast.error(responseData.message || "Registration failed");
      }
  } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
  }
};
  return (
    <div className="flex flex-col items-center justify-center p-4 my-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-6"
      >
        <h1 className="text-4xl font-semibold mb-6 trajan text-start text-[#757575]">
          Register Your Account
        </h1>
        {/* Name and Email/Password Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-gray-600 mb-1 times">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: "First Name is required" })}
              className={`bg-white border times ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.firstName
                  ? "focus:ring-red-500"
                  : "focus:ring-pink-500"
              }`}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm times">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-gray-600 mb-1 times">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: "Last Name is required" })}
              className={`bg-white border times ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.lastName
                  ? "focus:ring-red-500"
                  : "focus:ring-pink-500"
              }`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm times">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 mb-1 times">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className={`bg-white border times ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.email
                  ? "focus:ring-red-500"
                  : "focus:ring-pink-500"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm times">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600 mb-1 times">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`bg-white border times ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:outline-none focus:ring-1 ${
                errors.password
                  ? "focus:ring-red-500"
                  : "focus:ring-pink-500"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm times">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-[#CE0067] w-[150px] mr-auto times text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
          >
            SUBMIT
          </button>
          <NavLink to={"/"} className="text-sm text-gray-500 times hover:underline">
            Cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
