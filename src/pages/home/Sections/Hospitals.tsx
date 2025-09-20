import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  BuildingOffice2Icon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  PhoneIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

export const Hospitals = () => {
  const features = [
    {
      icon: ClockIcon,
      title: "Emergency Response",
      description:
        "Post urgent blood requests and get donor responses within minutes, not hours.",
      stat: "8 min",
      statLabel: "avg response",
    },
    {
      icon: MapPinIcon,
      title: "Location-Based Matching",
      description:
        "Automatically notify compatible donors within your specified radius.",
      stat: "5-10km",
      statLabel: "radius coverage",
    },
    {
      icon: ShieldCheckIcon,
      title: "Verified Donors",
      description:
        "All donors are pre-screened with verified health records and blood type.",
      stat: "100%",
      statLabel: "verified",
    },
    {
      icon: BellAlertIcon,
      title: "Multi-Channel Alerts",
      description:
        "Reach donors through SMS, email, and push notifications simultaneously.",
      stat: "3 channels",
      statLabel: "notification",
    },
  ];

  const benefits = [
    "Reduce critical blood shortage incidents",
    "24/7 emergency blood request system",
    "Real-time donor availability tracking",
    "Comprehensive reporting and analytics",
    "Integration with existing hospital systems",
    "Dedicated support team for hospitals",
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
    <section id="hospitals" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-red-50/30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BuildingOffice2Icon className="h-4 w-4" />
              <span>For Healthcare Providers</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6">
              Empower Your
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent ml-4">
                Hospital
              </span>
            </h2>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Join Nigeria's leading blood donation network. Connect with
              thousands of verified donors and ensure your patients get the
              blood they need, when they need it.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-3 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-full h-full text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-red-600">
                        {feature.stat}
                      </span>
                      <span className="text-xs text-slate-500">
                        {feature.statLabel}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Why Choose PulsePoint?
              </h3>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/auth/signup"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
                  >
                    <BuildingOffice2Icon className="h-5 w-5" />
                    <span>Register Hospital</span>
                  </Link>
                </motion.div>

                <motion.button
                  className="bg-white text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200 inline-flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span>Schedule Demo</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div variants={itemVariants} className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">
                    Hospital Dashboard
                  </span>
                </div>

                {/* Mock Dashboard */}
                <div className="space-y-4">
                  <div className="bg-red-600 text-white p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Urgent Request</h4>
                        <p className="text-sm opacity-90">
                          O- Blood Type • 3 units needed
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-xs opacity-75">
                          donors notified
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-xl">
                      <div className="text-green-400 text-2xl font-bold">8</div>
                      <div className="text-gray-300 text-sm">Active Donors</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl">
                      <div className="text-blue-400 text-2xl font-bold">
                        2.5km
                      </div>
                      <div className="text-gray-300 text-sm">Avg Distance</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
