import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useStore from "@/store/store";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Button } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
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

      if (request.ok && responseData.statusCode === 200) {
        toast.success("Registration Successful", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after toast
      } else {
        toast.error(responseData.message || "Registration failed", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.", { position: "top-right" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8f5f0] to-[#faf9f6] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-12 sm:-top-24 -left-12 sm:-left-24 w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-[#BD9153]/5 blur-3xl"></div>
        <div className="absolute top-1/3 -right-6 sm:-right-12 w-20 sm:w-36 h-20 sm:h-36 rounded-full bg-[#BD9153]/10 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-[#BD9153]/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 sm:w-40 h-24 sm:h-40 rounded-full bg-[#BD9153]/5 blur-xl"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl relative z-10"
      >
        {/* Card with decorative border */}
        <div className="p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#BD9153]/30 via-[#BD9153]/10 to-transparent backdrop-blur-sm shadow-xl">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
            {/* Logo or brand element */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-full bg-gradient-to-br from-[#BD9153] to-[#d5b27c] flex items-center justify-center shadow-lg">
                <span className="text-white trajan text-xl sm:text-2xl font-bold">B</span>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl trajan font-bold text-gray-800 tracking-wider mb-1 sm:mb-2 text-center">Create Your Account</h1>
            <p className="text-center times text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">Join our community with just a few simple steps</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Name Fields - Responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative">
                  <label htmlFor="firstName" className="block text-gray-700 times font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">First Name</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BD9153]/20 to-[#d5b27c]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: "First Name is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="firstName"
                          placeholder="John"
                          className="w-full border-[1px] border-[#BD9153]/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#BD9153]/60 times text-gray-800 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                        />
                      )}
                    />
                  </div>
                  {errors.firstName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm times italic mt-1 sm:mt-1.5 ml-1"
                    >
                      {errors.firstName.message}
                    </motion.p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="lastName" className="block text-gray-700 times font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Last Name</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BD9153]/20 to-[#d5b27c]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: "Last Name is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="lastName"
                          placeholder="Doe"
                          className="w-full border-[1px] border-[#BD9153]/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#BD9153]/60 times text-gray-800 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                        />
                      )}
                    />
                  </div>
                  {errors.lastName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs sm:text-sm times italic mt-1 sm:mt-1.5 ml-1"
                    >
                      {errors.lastName.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="block text-gray-700 times font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#BD9153]/20 to-[#d5b27c]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ 
                      required: "Email is required", 
                      pattern: { 
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                        message: "Invalid email format" 
                      } 
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        className="w-full border-[1px] border-[#BD9153]/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#BD9153]/60 times text-gray-800 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs sm:text-sm times italic mt-1 sm:mt-1.5 ml-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-gray-700 times font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Create Password</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#BD9153]/20 to-[#d5b27c]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ 
                      required: "Password is required", 
                      minLength: { 
                        value: 6, 
                        message: "Password must be at least 6 characters" 
                      } 
                    }}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="••••••••"
                          className="w-full border-[1px] border-[#BD9153]/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#BD9153]/60 times text-gray-800 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base pr-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#BD9153] transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    )}
                  />
                </div>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs sm:text-sm times italic mt-1 sm:mt-1.5 ml-1"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Password requirements hint */}
              <div className="bg-[#BD9153]/5 rounded-xl p-3 sm:p-4">
                <p className="times text-xs sm:text-sm text-gray-600">
                  <span className="font-medium text-[#BD9153]">Password Requirements: </span>
                  At least 6 characters long with a mix of uppercase, lowercase, numbers, and special characters recommended for security.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#BD9153] to-[#d5b27c] text-white rounded-xl py-2.5 sm:py-3 times uppercase tracking-widest font-medium text-sm sm:text-base hover:shadow-lg hover:from-[#d5b27c] hover:to-[#BD9153] transition-all duration-500 shadow-md"
                  >
                    Create Account
                  </Button>
                </motion.div>
              </div>

              {/* Already have an account */}
              <div className="flex justify-center items-center pt-2 sm:pt-4">
                <NavLink 
                  to="/login" 
                  className="times text-gray-600 text-sm hover:text-[#BD9153] transition-colors duration-300"
                >
                  Already have an account? <span className="font-medium text-[#BD9153] hover:underline">Sign In</span>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer note */}
        <p className="text-center text-gray-500 text-xs mt-4 sm:mt-6 times">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Register;