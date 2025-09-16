/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Input from "../components/common/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// 📝 Schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, "Password must contain at least 7 characters"),
});

const signupSchema = loginSchema.extend({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, { message: "No special characters allowed" }),
});

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_APP_API;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(state === "Sign Up" ? signupSchema : loginSchema),
  });

  // ✅ Xử lý chung sau khi login/signup thành công
  const handleAuthSuccess = (token) => {
    localStorage.setItem("auth-token", token);
    reset();
    login();
    const decoded = jwtDecode(token);
    navigate(decoded.user.role === "admin" ? "/admin" : "/");
  };

  // ✅ Submit Login / Signup
  const onSubmit = async (data) => {
    toast.loading("Please wait...");
    try {
      const endpoint = state === "Sign Up" ? "/api/users" : "/api/users/login";
      const res = await axios.post(`${URL}${endpoint}`, data);

      if (res.data.success) {
        toast.dismiss();
        toast.success(`${state} successful!`, { theme: "colored" });
        handleAuthSuccess(res.data.token);
      } else {
        toast.dismiss();
        toast.error(res.data.errors || "Something went wrong", {
          theme: "colored",
        });
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.errors || "Server error", {
        theme: "colored",
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 
      flex items-center justify-center py-12 px-4 transition-colors duration-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 
              rounded-full flex items-center justify-center mb-4 shadow-lg"
            >
              <FiUser className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {state === "Login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {state === "Login"
                ? "Enter your credentials to access your account"
                : "Sign up to get started with your new account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {state === "Sign Up" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    name="username"
                    type="text"
                    placeholder="Your Username"
                    icon={
                      <FiUser className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    }
                    register={register}
                    error={errors?.username?.message}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              icon={
                <FiMail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              }
              register={register}
              error={errors?.email?.message}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              icon={
                <FiLock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              }
              register={register}
              error={errors?.password?.message}
            />

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center items-center py-4 px-6 rounded-xl 
                text-white bg-gradient-to-r from-indigo-500 to-blue-500 
                dark:from-indigo-600 dark:to-blue-600
                hover:from-indigo-600 hover:to-blue-600 
                dark:hover:from-indigo-700 dark:hover:to-blue-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                dark:focus:ring-indigo-400 focus:ring-offset-2 
                dark:focus:ring-offset-gray-800 text-lg font-semibold 
                transition-all duration-300 shadow-lg"
            >
              {state === "Login" ? "Sign In" : "Sign Up"}
            </motion.button>
          </form>

          {/* Toggle Link */}
          <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-indigo-500 dark:text-indigo-400 font-semibold cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-indigo-500 dark:text-indigo-400 font-semibold cursor-pointer hover:underline"
                >
                  Sign up here
                </span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;
