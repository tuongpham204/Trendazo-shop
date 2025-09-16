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

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must not contain special characters",
    })
    .optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(7, "Password must contain at least 7 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Password can contain only letters, numbers, _ and -",
    }),
});

const LoginSingup = () => {
  const [state, setState] = useState("Login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const URL = import.meta.env.VITE_APP_API;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsCursorVisible(false);
    }
  };

  const handleFocus = () => {
    setIsCursorVisible(true);
  };

  const onSubmit = async (data) => {
    setIsCursorVisible(false);
    toast.loading("Please wait...");
    await axios
      .post(`${URL}/api/users`, data)
      .then((resq) => {
        let response = resq.data;
        if (response.success) {
          localStorage.setItem("auth-token", response.token);
          reset();
          login();
          const token = localStorage.getItem("auth-token");
          const decoded = jwtDecode(token);
          if (decoded.user.role === "admin") {
            return navigate("/admin");
          }
          navigate("/");
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.errors, {
          theme: "colored",
        });
        reset();
      })
      .finally(() => setIsCursorVisible(true));
  };

  const onLogin = async (data) => {
    setIsCursorVisible(false);
    toast.loading("Please wait...");
    await axios
      .post(`${URL}/api/users/login`, data)
      .then((resq) => {
        let response = resq.data;
        if (response.success) {
          localStorage.setItem("auth-token", response.token);
          reset();
          login();
          const token = localStorage.getItem("auth-token");
          const decoded = jwtDecode(token);
          if (decoded.user.role === "admin") {
            return navigate("/admin");
          }
          navigate("/");
        } else {
          toast.dismiss();
          toast.error(response.errors, {
            theme: "colored",
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsCursorVisible(true));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          {state === "Login" ? "Welcome Back" : "Create Account"}
        </h1>
        <form
          onSubmit={
            state === "Sign Up" ? handleSubmit(onSubmit) : handleSubmit(onLogin)
          }
          className="mt-8 space-y-6"
        >
          <div className="space-y-4">
            {state === "Sign Up" && (
              <Input
                name="username"
                type="text"
                placeholder="Your Name"
                register={register}
                error={errors?.username?.message}
                handleKeyDown={handleKeyDown}
                handleFocus={handleFocus}
                isCursorVisible={isCursorVisible}
              />
            )}
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              register={register}
              error={errors?.email?.message}
              handleKeyDown={handleKeyDown}
              handleFocus={handleFocus}
              isCursorVisible={isCursorVisible}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors?.password?.message}
              handleKeyDown={handleKeyDown}
              handleFocus={handleFocus}
              isCursorVisible={isCursorVisible}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-lg font-medium transition-all"
          >
            Continue
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-red-500 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-red-500 font-semibold cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        )}

        {state === "Sign Up" && (
          <div className="flex items-start mt-6 text-sm text-gray-600">
            <input
              type="checkbox"
              name="checkbox"
              required
              className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
            />
            <p className="ml-2">
              By continuing, I agree to the{" "}
              <span className="text-red-500 cursor-pointer hover:underline">
                Terms of Use
              </span>{" "}
              &{" "}
              <span className="text-red-500 cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSingup;
