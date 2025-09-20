import { motion } from "framer-motion";
import { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "donor",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: "Call Us",
      description: "Speak directly with our support team",
      info: "+234 (0) 123 456 7890",
      subInfo: "Available 24/7 for emergencies",
      color: "from-green-500 to-green-600",
      action: "tel:+2341234567890",
    },
    {
      icon: EnvelopeIcon,
      title: "Email Support",
      description: "Get detailed help via email",
      info: "support@pulsepoint.ng",
      subInfo: "Response within 2 hours",
      color: "from-blue-500 to-blue-600",
      action: "mailto:support@pulsepoint.ng",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      description: "Chat with our support agents",
      info: "Available Now",
      subInfo: "Average wait time: 2 minutes",
      color: "from-purple-500 to-purple-600",
      action: "#",
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Emergency Line",
      description: "For critical blood requests",
      info: "+234 (0) 911 BLOOD",
      subInfo: "Hospital emergency only",
      color: "from-red-500 to-red-600",
      action: "tel:+234091125663",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Emergency only" },
    { day: "Public Holidays", hours: "Emergency only" },
  ];

  const quickHelp = [
    {
      question: "How do I register as a donor?",
      answer:
        "Click 'Sign Up' and select 'Donor' to create your profile with blood type verification.",
    },
    {
      question: "How quickly are requests posted?",
      answer:
        "Hospital requests are posted instantly and donors are notified within 2-3 minutes.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use bank-level encryption and comply with Nigerian data protection laws.",
    },
    {
      question: "What if I can't donate when notified?",
      answer:
        "No problem! Simply decline the request and we'll ask other available donors.",
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
      id="contact"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 3px 3px, rgba(239, 68, 68, 0.15) 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />

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
              <span>We're Here to Help</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6">
              Get in
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent ml-4">
                Touch
              </span>
            </h2>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about blood donation or need technical support? Our
              dedicated team is here to assist you 24/7.
            </p>
          </motion.div>

          {/* Contact Methods Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={index}
                  href={method.action}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 block"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-xl p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="text-red-600 font-semibold mb-1">
                    {method.info}
                  </div>
                  <div className="text-slate-500 text-xs">{method.subInfo}</div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Send us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="userType"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        I am a...
                      </label>
                      <select
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="donor">Blood Donor</option>
                        <option value="hospital">
                          Hospital Representative
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Office Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                  Our Office
                </h4>
                <div className="space-y-3 text-slate-600">
                  <p>
                    123 Health Street
                    <br />
                    Maitama District
                    <br />
                    Abuja, FCT 900001
                    <br />
                    Nigeria
                  </p>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-4 w-4 text-slate-400" />
                    <span>+234 (0) 123 456 7890</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-4 w-4 text-slate-400" />
                    <span>contact@pulsepoint.ng</span>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                  Office Hours
                </h4>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-slate-600">{schedule.day}</span>
                      <span className="text-slate-800 font-medium">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Help */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <QuestionMarkCircleIcon className="h-5 w-5 text-purple-500 mr-2" />
                  Quick Help
                </h4>
                <div className="space-y-4">
                  {quickHelp.map((item, index) => (
                    <details key={index} className="group">
                      <summary className="text-sm font-medium text-slate-700 cursor-pointer hover:text-red-600 transition-colors">
                        {item.question}
                      </summary>
                      <p className="text-sm text-slate-600 mt-2 pl-4">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Emergency Notice */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-red-50 border-l-4 border-red-500 p-6 rounded-xl"
          >
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-red-800 mb-2">
                  Medical Emergency?
                </h4>
                <p className="text-red-700 mb-3">
                  For life-threatening emergencies requiring immediate blood,
                  call our emergency hotline or contact emergency services
                  directly.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:199"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Emergency: 199
                  </a>
                  <a
                    href="tel:+234091125663"
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                  >
                    PulsePoint Emergency
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
