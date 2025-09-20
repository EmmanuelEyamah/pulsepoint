import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusCircleIcon,
  MapPinIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  UserGroupIcon,
  CalendarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon as ExclamationTriangleSolidIcon } from "@heroicons/react/24/solid";

export const PostRequest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    bloodType: "",
    urgency: "",
    quantity: "",
    quantityUnit: "units",
    patientAge: "",
    patientGender: "",
    medicalCondition: "",
    deadline: "",
    location: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    additionalNotes: "",
    publicNotes: "",
    emergencyContact: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    {
      value: "critical",
      label: "Critical",
      color: "red",
      description: "Life-threatening, needed within 2 hours",
    },
    {
      value: "high",
      label: "High",
      color: "orange",
      description: "Urgent surgery, needed within 6 hours",
    },
    {
      value: "medium",
      label: "Medium",
      color: "yellow",
      description: "Scheduled procedure, needed within 24 hours",
    },
    {
      value: "low",
      label: "Low",
      color: "blue",
      description: "Routine procedure, needed within 48 hours",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Request submitted:", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Posted Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Your blood request has been posted and donors in the area will be
            notified. You'll receive updates as donors respond.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              Request Details
            </h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <span className="font-medium">Blood Type:</span>{" "}
                {formData.bloodType}
              </p>
              <p>
                <span className="font-medium">Urgency:</span> {formData.urgency}
              </p>
              <p>
                <span className="font-medium">Quantity:</span>{" "}
                {formData.quantity} {formData.quantityUnit}
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  bloodType: "",
                  urgency: "",
                  quantity: "",
                  quantityUnit: "units",
                  patientAge: "",
                  patientGender: "",
                  medicalCondition: "",
                  deadline: "",
                  location: "",
                  contactPerson: "",
                  contactPhone: "",
                  contactEmail: "",
                  additionalNotes: "",
                  publicNotes: "",
                  emergencyContact: "",
                });
                setCurrentStep(1);
              }}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Post Another Request
            </motion.button>
            <motion.button
              onClick={() =>
                (window.location.href = "/dashboard/active-requests")
              }
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Active Requests
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <PlusCircleIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Post Blood Request
            </h1>
            <p className="text-gray-600 mt-1">
              Create an urgent blood donation request to reach nearby donors
            </p>
          </div>
        </div>

        {/* Emergency Alert */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-3">
            <ExclamationTriangleSolidIcon className="h-5 w-5" />
            <div>
              <p className="font-semibold">
                Critical requests get priority visibility
              </p>
              <p className="text-sm text-red-100">
                Ensure all information is accurate for faster donor response
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Progress Steps */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 lg:w-24 h-1 mx-2 ${
                      step < currentStep ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Blood Details</span>
            <span>Patient Info</span>
            <span>Contact & Submit</span>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div variants={itemVariants}>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-8">
            {/* Step 1: Blood Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Blood Request Details
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Blood Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Blood Type Required *
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {bloodTypes.map((type) => (
                        <motion.button
                          key={type}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              bloodType: type,
                            }))
                          }
                          className={`p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
                            formData.bloodType === type
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-gray-200 bg-gray-50 text-gray-600 hover:border-red-200"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Quantity Needed *
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        required
                        min="1"
                      />
                      <select
                        name="quantityUnit"
                        value={formData.quantityUnit}
                        onChange={handleInputChange}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="units">Units</option>
                        <option value="ml">ml</option>
                        <option value="liters">Liters</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Urgency Level *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {urgencyLevels.map((level) => (
                      <motion.button
                        key={level.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            urgency: level.value,
                          }))
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          formData.urgency === level.value
                            ? `border-${level.color}-500 bg-${level.color}-50`
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full bg-${level.color}-500`}
                          />
                          <span className="font-semibold text-gray-900">
                            {level.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {level.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Deadline *
                  </label>
                  <div className="relative max-w-md">
                    <input
                      type="datetime-local"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Patient Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Patient Information
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Patient Age (Optional)
                    </label>
                    <input
                      type="number"
                      name="patientAge"
                      value={formData.patientAge}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Age in years"
                      min="0"
                      max="120"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Patient Gender (Optional)
                    </label>
                    <select
                      name="patientGender"
                      value={formData.patientGender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Medical Condition/Procedure *
                  </label>
                  <textarea
                    name="medicalCondition"
                    value={formData.medicalCondition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the medical condition or procedure requiring blood"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hospital address or specific location within hospital"
                      required
                    />
                    <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Public Notes (Optional)
                  </label>
                  <textarea
                    name="publicNotes"
                    value={formData.publicNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional information that will be visible to donors"
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Name of responsible person"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Contact Phone *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+234 123 456 7890"
                        required
                      />
                      <PhoneIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="contact@hospital.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Emergency Contact (Optional)
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="24/7 emergency line"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Additional Notes (Internal Use Only)
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Internal notes for hospital staff (not visible to donors)"
                    rows={4}
                  />
                </div>

                {/* Review Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>Request Summary</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-800">
                        Blood Type:
                      </span>
                      <span className="ml-2 text-blue-700">
                        {formData.bloodType || "Not specified"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">
                        Quantity:
                      </span>
                      <span className="ml-2 text-blue-700">
                        {formData.quantity} {formData.quantityUnit}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">
                        Urgency:
                      </span>
                      <span className="ml-2 text-blue-700 capitalize">
                        {formData.urgency || "Not specified"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">
                        Deadline:
                      </span>
                      <span className="ml-2 text-blue-700">
                        {formData.deadline
                          ? new Date(formData.deadline).toLocaleString()
                          : "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-8 py-6 bg-gray-50 flex justify-between items-center">
            {currentStep > 1 ? (
              <motion.button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Previous
              </motion.button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 &&
                    (!formData.bloodType ||
                      !formData.quantity ||
                      !formData.urgency ||
                      !formData.deadline)) ||
                  (currentStep === 2 &&
                    (!formData.medicalCondition || !formData.location))
                }
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next Step
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.contactPerson ||
                  !formData.contactPhone ||
                  !formData.contactEmail
                }
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
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
                    <span>Posting Request...</span>
                  </>
                ) : (
                  <>
                    <PlusCircleIcon className="h-5 w-5" />
                    <span>Post Blood Request</span>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
