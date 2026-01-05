import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/common/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(7, "Password must contain at least 7 characters"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("auth-user", JSON.stringify(userData));
    reset();
    login(userData);
    navigate(userData.role === "admin" ? "/admin" : "/");
  };

  const onSubmit = async (data) => {
    toast.loading("Please wait...");
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (user) {
        toast.dismiss();
        toast.success("Login successful!", { theme: "colored" });
        handleLoginSuccess(user);
      } else {
        toast.dismiss();
        toast.error("Invalid email or password", { theme: "colored" });
      }
    } catch (err) {
      toast.dismiss();
      toast.error("An error occurred", { theme: "colored" });
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
          <div className="text-center mb-8">
            <div
              className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 
              rounded-full flex items-center justify-center mb-4 shadow-lg"
            >
              <FiMail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              Sign In
            </motion.button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-500 dark:text-indigo-400 font-semibold cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
