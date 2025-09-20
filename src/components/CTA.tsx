import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  HeartIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

export const CTA = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-300 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="text-center">
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Ready to Save Lives?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Join our community of heroes. Whether you're a hospital in need or
              a donor ready to help, PulsePoint connects you instantly.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <motion.div animate="animate" className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 mx-auto w-fit border border-white/10">
                <HeartIcon className="h-12 w-12 text-red-400 mx-auto" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Lives Saved</div>
            </motion.div>

            <motion.div
              animate="animate"
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 mx-auto w-fit border border-white/10">
                <UserGroupIcon className="h-12 w-12 text-red-400 mx-auto" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">1,200+</div>
              <div className="text-gray-400">Active Donors</div>
            </motion.div>

            <motion.div
              animate="animate"
              transition={{ delay: 1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 mx-auto w-fit border border-white/10">
                <BuildingOffice2Icon className="h-12 w-12 text-red-400 mx-auto" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Partner Hospitals</div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/auth/signup"
                className="bg-white text-slate-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
              >
                <UserGroupIcon className="h-5 w-5" />
                <span>Join as Donor</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/auth/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center space-x-2 border border-red-500/30"
              >
                <BuildingOffice2Icon className="h-5 w-5" />
                <span>Register Hospital</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div variants={itemVariants} className="mt-12">
            <p className="text-gray-400 text-sm">
              Trusted by healthcare professionals across Nigeria
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
