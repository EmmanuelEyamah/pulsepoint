import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Password reset requested for:", email);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsEmailSent(true);
    } catch {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Resent password reset email to:", email);
    } catch {
      setError("Failed to resend email. Please try again.");
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
      <div className="max-w-md mx-auto">
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
              {isEmailSent ? "Check Your Email" : "Forgot Password?"}
            </h1>
            <p className="text-slate-600">
              {isEmailSent
                ? "We've sent a password reset link to your email address"
                : "No worries! Enter your email and we'll send you reset instructions"}
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {!isEmailSent ? (
              /* Reset Form */
              <form onSubmit={handleSubmit} className="p-6">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email address"
                        required
                        disabled={isLoading}
                      />
                      <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                    >
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
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
                        <span>Sending Reset Link...</span>
                      </>
                    ) : (
                      <>
                        <EnvelopeIcon className="h-5 w-5" />
                        <span>Send Reset Link</span>
                      </>
                    )}
                  </motion.button>

                  {/* Back to Login */}
                  <div className="text-center">
                    <Link
                      to="/auth/login"
                      className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 font-medium hover:underline"
                    >
                      <ArrowLeftIcon className="h-4 w-4" />
                      <span>Back to Sign In</span>
                    </Link>
                  </div>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="p-6 text-center">
                <div className="mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircleIcon className="h-10 w-10 text-green-600" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Reset Link Sent!
                  </h3>
                  <p className="text-slate-600">
                    We've sent a password reset link to:
                  </p>
                  <p className="font-medium text-slate-800 mt-1">{email}</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Didn't receive the email?</strong> Check your spam
                      folder or try resending.
                    </p>
                  </div>

                  {/* Resend Button */}
                  <motion.button
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-slate-700 py-3 px-6 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
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
                        <span>Resending...</span>
                      </span>
                    ) : (
                      "Resend Email"
                    )}
                  </motion.button>

                  {/* Back to Login */}
                  <Link
                    to="/auth/login"
                    className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 font-medium hover:underline"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          {/* Help Section */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Still having trouble?{" "}
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
