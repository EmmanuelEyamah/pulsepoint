import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  HeartIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const heroImages = [
    "/assets/blood0.jpg",
    "/assets/blood1.jpg",
    "/assets/blood2.jpg",
    "/assets/blood5.webp",
  ];

  const imageDescriptions = [
    "Connecting donors with those in need",
    "Trusted by healthcare professionals",
    "Building stronger communities",
    "Advanced medical coordination",
  ];

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = heroImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch {
        console.log("Some images failed to load");
        setImagesLoaded(true); // Still show the component
      }
    };

    loadImages();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (!imagesLoaded) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length, imagesLoaded]);

  const scrollToNext = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Fixed Background - prevents any white flashes */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />

      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-10">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImage ? 1 : 0,
              scale: index === currentImage ? 1 : 1.05,
            }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" },
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: imagesLoaded ? `url(${image})` : "none",
                backgroundColor: "#1e293b", // Fallback dark color
              }}
            />
            {/* Consistent overlay - no flashing */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Main Heading */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              type: "spring",
              stiffness: 80,
            }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              <span className="inline-block">
                Save
                <motion.span
                  className="text-red-400 ml-4 inline-block"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Lives
                </motion.span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Together
              </span>
            </h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Connect hospitals in urgent need with nearby blood donors.
              <span className="text-red-300 font-semibold">
                {" "}
                Every drop counts
              </span>{" "}
              in saving lives.
            </motion.p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="flex justify-center items-center space-x-8 md:space-x-16 mb-10 py-6 px-8 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">
                500+
              </div>
              <div className="text-sm text-gray-400">Lives Saved</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">
                1.2K+
              </div>
              <div className="text-sm text-gray-400">Active Donors</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">
                50+
              </div>
              <div className="text-sm text-gray-400">Partner Hospitals</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Link
                to="/auth/signup"
                className="relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-red-500/25 inline-flex items-center space-x-3"
              >
                <HeartIcon className="h-6 w-6 group-hover:animate-pulse" />
                <span>Become a Donor</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/auth/signup"
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 shadow-2xl backdrop-blur-sm border border-white/20 hover:border-white/40 inline-flex items-center space-x-3"
              >
                <BuildingOffice2Icon className="h-6 w-6" />
                <span>Register Hospital</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-3">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "bg-red-400 scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
        <motion.p
          key={currentImage}
          className="text-gray-400 text-xs mt-3 text-center max-w-xs"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {imageDescriptions[currentImage]}
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={scrollToNext}
          className="text-gray-400 hover:text-white transition-colors duration-300 flex flex-col items-center"
        >
          <span className="text-xs mb-2 font-medium">Scroll Down</span>
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </motion.div>
    </section>
  );
};
