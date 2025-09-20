import { motion } from "framer-motion";
import {
  BuildingOffice2Icon,
  BellAlertIcon,
  UserGroupIcon,
  HeartIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Hospital Posts Request",
      description:
        "Healthcare facilities post urgent blood needs with specific type, quantity, and location details.",
      icon: BuildingOffice2Icon,
      color: "from-blue-500 to-blue-600",
      details: [
        "Blood type needed",
        "Units required",
        "Urgency level",
        "Hospital location",
      ],
    },
    {
      id: 2,
      title: "Smart Notification",
      description:
        "Our system instantly alerts compatible donors within a 5-10km radius via SMS, email, and app notifications.",
      icon: BellAlertIcon,
      color: "from-yellow-500 to-orange-500",
      details: [
        "Location-based matching",
        "Real-time alerts",
        "Multiple channels",
        "Smart filtering",
      ],
    },
    {
      id: 3,
      title: "Donors Respond",
      description:
        "Nearby donors receive the alert, review request details, and head to the hospital to donate blood.",
      icon: UserGroupIcon,
      color: "from-green-500 to-green-600",
      details: [
        "Instant notifications",
        "Request details",
        "Hospital directions",
        "Quick response",
      ],
    },
    {
      id: 4,
      title: "Lives Saved",
      description:
        "Blood reaches patients in need quickly, and the system updates request status for all participants.",
      icon: HeartIcon,
      color: "from-red-500 to-red-600",
      details: [
        "Critical care delivered",
        "Real-time updates",
        "Impact tracking",
        "Community building",
      ],
    },
  ];

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

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const flowLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <HeartIcon className="h-4 w-4" />
            <span>Simple Process</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6">
            How It
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent ml-4">
              Works
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process connects hospitals with life-saving donors
            in minutes, not hours. Every second counts when lives are on the
            line.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
            <svg className="w-full h-2" viewBox="0 0 1200 8">
              <motion.path
                d="M 50 4 Q 300 4 400 4 T 800 4 T 1150 4"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                variants={flowLineVariants}
                strokeDasharray="5,5"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="25%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  variants={stepVariants}
                  className="relative group"
                >
                  {/* Step Card */}
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-red-200 relative overflow-hidden">
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />

                    {/* Step Number */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-bold flex items-center justify-center`}
                      >
                        {step.id}
                      </div>
                    </div>

                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-full h-full text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900">
                      {step.title}
                    </h3>

                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center text-sm text-slate-500"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Mobile Connection Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 bg-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-red-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-300 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Average Response Time
            </h3>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <ClockIcon className="h-8 w-8 text-red-400" />
              <span className="text-6xl md:text-7xl font-black text-red-400">
                8
              </span>
              <span className="text-2xl text-gray-300 self-end mb-2">
                minutes
              </span>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From request to donor notification, our system ensures rapid
              response when every minute matters most.
            </p>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-white mb-2">97%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">Availability</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">5km</div>
                <div className="text-gray-400">Average Distance</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
