import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  EyeIcon,
  EyeSlashIcon,
  HeartIcon,
  BuildingOffice2Icon,
  UserIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export const Login = () => {
  const [userType, setUserType] = useState<"donor" | "hospital">("donor");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "rememberMe") {
      setRememberMe((e.target as HTMLInputElement).checked);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Login submitted:", { userType, ...formData, rememberMe });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo and Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <Link
              to="/home"
              className="inline-flex items-center space-x-2 mb-6"
            >
              <img
                src="/assets/logo.png"
                alt="PulsePoint"
                className="h-16 w-auto"
              />
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">Sign in to continue saving lives</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* User Type Selection */}
            <div className="p-6 border-b border-gray-100 bg-white/90">
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => setUserType("donor")}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === "donor"
                      ? "border-red-500 bg-red-50/80 text-red-700"
                      : "border-gray-200 bg-gray-50/80 text-gray-600 hover:border-red-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HeartIcon className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Donor</span>
                </motion.button>

                <motion.button
                  onClick={() => setUserType("hospital")}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === "hospital"
                      ? "border-blue-500 bg-blue-50/80 text-blue-700"
                      : "border-gray-200 bg-gray-50/80 text-gray-600 hover:border-blue-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BuildingOffice2Icon className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Hospital</span>
                </motion.button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 bg-white/90 backdrop-blur-sm"
            >
              <div className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                    <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-slate-600"
                    >
                      Remember me
                    </label>
                  </div>

                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                    userType === "donor"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </motion.button>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-slate-600">
                    Don't have an account?{" "}
                    <Link
                      to="/auth/signup"
                      className="text-red-600 hover:text-red-700 font-medium hover:underline"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Help Section */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Need help?{" "}
              <Link
                to="/home"
                className="text-red-400 hover:text-red-300 hover:underline"
              >
                Contact Support
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
