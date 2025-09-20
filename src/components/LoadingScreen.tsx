import { motion } from "framer-motion";

export const LoadingScreen = () => {
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const dropVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center z-50">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Animation */}
        <motion.div
          className="relative mb-8"
          variants={dropVariants}
          animate="animate"
        >
          <motion.div
            className="relative inline-block"
            variants={pulseVariants}
            animate="animate"
          >
            <img
              src="/assets/logo.png"
              alt="PulsePoint"
              className="h-20 w-auto mx-auto"
            />

            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 border-4 border-red-300 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Second Pulse Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-red-200 rounded-full"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          variants={textVariants}
          animate="animate"
        >
          PulsePoint
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          className="text-lg text-slate-600 mb-8"
          variants={textVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          Connecting hearts, saving lives...
        </motion.p>

        {/* Loading Dots */}
        <div className="flex items-center justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-red-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
