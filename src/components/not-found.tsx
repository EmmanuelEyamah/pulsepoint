import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  HomeIcon,
  HeartIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export const NotFoundPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated 404 */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative inline-block">
            <motion.div
              className="text-9xl md:text-[12rem] font-bold text-red-200 select-none"
              animate={{
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                  "0 0 40px rgba(239, 68, 68, 0.5)",
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.div>

            {/* Floating Heart */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              variants={pulseVariants}
              animate="animate"
            >
              <HeartIcon className="h-16 w-16 text-red-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Page Not Found
            </h1>
          </div>
          <p className="text-lg text-slate-600 mb-2">
            Oops! It seems like this page has gone missing.
          </p>
          <p className="text-slate-500">
            Don't worry, even heroes sometimes take a wrong turn. Let's get you
            back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/home"
              className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Go Home</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-slate-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl border border-gray-200"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Go Back</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Need Help Finding Something?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div>
              <strong className="text-slate-800">For Donors:</strong>
              <p>Find nearby blood requests and save lives</p>
            </div>
            <div>
              <strong className="text-slate-800">For Hospitals:</strong>
              <p>Post urgent blood needs and connect with donors</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
