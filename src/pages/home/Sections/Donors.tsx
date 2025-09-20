import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  HeartIcon,
  UserGroupIcon,
  MapPinIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  GiftIcon,
  StarIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export const Donors = () => {
  const steps = [
    {
      icon: UserGroupIcon,
      title: "Sign Up",
      description:
        "Create your profile with basic info and blood type verification.",
    },
    {
      icon: BellAlertIcon,
      title: "Get Notified",
      description:
        "Receive alerts when hospitals near you need your blood type.",
    },
    {
      icon: HeartIcon,
      title: "Save Lives",
      description: "Visit the hospital and make your life-saving donation.",
    },
  ];

  const benefits = [
    {
      icon: HeartIcon,
      title: "Save Lives",
      description: "Your single donation can save up to 3 lives",
      highlight: "3 lives",
    },
    {
      icon: MapPinIcon,
      title: "Nearby Requests",
      description: "Only get notified for hospitals within 10km",
      highlight: "10km radius",
    },
    {
      icon: ShieldCheckIcon,
      title: "Safe & Secure",
      description: "All hospitals are verified healthcare facilities",
      highlight: "100% verified",
    },
    {
      icon: GiftIcon,
      title: "Recognition",
      description: "Earn badges and certificates for your contributions",
      highlight: "Achievements",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Okafor",
      donations: 12,
      quote:
        "Being part of PulsePoint makes me feel like a real-life superhero. I've helped save 36 lives!",
      avatar: "SO",
    },
    {
      name: "Ahmed Ibrahim",
      donations: 8,
      quote:
        "The convenience of getting notified only when needed nearby is amazing. No more guessing.",
      avatar: "AI",
    },
    {
      name: "Grace Adebayo",
      donations: 15,
      quote:
        "I love seeing the impact of my donations. PulsePoint shows how many lives I've helped save.",
      avatar: "GA",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="donors"
      className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-red-100 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-100 rounded-full opacity-30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <HeartIcon className="h-4 w-4" />
              <span>Be A Hero</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6">
              Become a
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent ml-4">
                Life Saver
              </span>
            </h2>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of heroes in Nigeria who are making a difference.
              Get notified only when hospitals near you need your blood type.
            </p>
          </motion.div>

          {/* How It Works for Donors */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center relative">
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-red-300 to-red-400 transform translate-x-1/2 z-0" />
                    )}

                    <motion.div
                      className="relative z-10 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-200"
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full p-4 mx-auto mb-4">
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600">{step.description}</p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-slate-800 text-center mb-12">
              Why Donors Love PulsePoint
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:border-red-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-xl p-3 mb-4 group-hover:bg-red-200 transition-colors duration-300">
                      <Icon className="w-full h-full text-red-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-slate-600 text-sm mb-2">
                      {benefit.description}
                    </p>
                    <span className="text-red-600 font-semibold text-sm">
                      {benefit.highlight}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-slate-800 text-center mb-12">
              Stories from Our Heroes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center text-sm text-slate-600">
                        <HeartIcon className="h-4 w-4 text-red-500 mr-1" />
                        {testimonial.donations} donations
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                  <div className="flex text-yellow-400 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-slate-800 rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Save Lives?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join our community of heroes today. Your blood type might be
                exactly what someone needs to survive.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/auth/signup"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
                  >
                    <HeartIcon className="h-5 w-5" />
                    <span>Become a Donor</span>
                  </Link>
                </motion.div>

                <motion.button
                  className="bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 inline-flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span>Learn More</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
