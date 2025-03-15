import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useStore from "@/store/store";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Button } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const user = useStore((state) => state.user);
  const login = useStore((state) => state.login);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
        credentials: "include",
      });

      const responseData = await request.json();

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
          navigate("/");
        }, 2000);
      } else {
        toast.error(responseData.message || "Login failed", { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login", { position: "top-right" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8f5f0] to-[#faf9f6] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Decorative elements - adjusted for responsiveness */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-12 sm:-top-24 -left-12 sm:-left-24 w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-[#BD9153]/5 blur-3xl"></div>
        <div className="absolute top-1/4 -right-6 sm:-right-12 w-20 sm:w-36 h-20 sm:h-36 rounded-full bg-[#BD9153]/10 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-[#BD9153]/5 blur-3xl"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md lg:max-w-lg relative z-10"
      >
        {/* Card with decorative border */}
        <div className="p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#BD9153]/30 via-[#BD9153]/10 to-transparent backdrop-blur-sm shadow-xl">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
            {/* Logo or brand element - adjusted size for mobile */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-full bg-gradient-to-br from-[#BD9153] to-[#d5b27c] flex items-center justify-center shadow-lg">
                <span className="text-white trajan text-xl sm:text-2xl font-bold">B</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl trajan font-bold text-gray-800 tracking-wider mb-1 sm:mb-2 text-center">Welcome Back</h1>
            <p className="text-center times text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">Please enter your credentials to continue</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="block text-gray-700 times font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#BD9153]/20 to-[#d5b27c]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email" } }}
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
                <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                  <label htmlFor="password" className="block text-gray-700 times font-medium text-sm sm:text-base">Password</label>
                  <span 
                    onClick={() => navigate('/recover-account')} 
                    className="times text-xs sm:text-sm text-[#BD9153] hover:text-[#d5b27c] hover:underline cursor-pointer transition-colors duration-300"
                  >
                    Forgot Password?
                  </span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#BD9153]/20 to-[#d5b27c]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } }}
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

              {/* Sign In Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6"
              >
                <Button
                  type="submit"
                  className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#BD9153] to-[#d5b27c] text-white rounded-xl py-2.5 sm:py-3 times uppercase tracking-widest font-medium text-sm sm:text-base hover:shadow-lg hover:from-[#d5b27c] hover:to-[#BD9153] transition-all duration-500 shadow-md"
                >
                  Sign In
                </Button>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center my-4 sm:my-6">
                <div className="flex-grow h-px bg-[#BD9153]/10"></div>
                <p className="mx-4 text-gray-500 times text-xs sm:text-sm">OR</p>
                <div className="flex-grow h-px bg-[#BD9153]/10"></div>
              </div>

              {/* Create account link */}
              <div className="text-center">
                <p className="times text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <NavLink 
                    to="/register" 
                    className="font-medium text-[#BD9153] hover:text-[#d5b27c] hover:underline transition-colors duration-300"
                  >
                    Create Account
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer note */}
        <p className="text-center text-gray-500 text-xs mt-4 sm:mt-6 times">
          © 2025 • Secure Login • Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Login;