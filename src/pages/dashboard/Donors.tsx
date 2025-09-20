import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  HeartIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  UserCircleIcon as UserCircleSolidIcon,
} from "@heroicons/react/24/solid";

interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  gender: string;
  age: number;
  city: string;
  state: string;
  address: string;
  lastDonation: string | null;
  nextEligible: string;
  totalDonations: number;
  eligibilityStatus: "eligible" | "not_eligible" | "pending";
  registeredDate: string;
  emergencyContact: string;
  avatar?: string;
}

export const Donors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBloodType, setFilterBloodType] = useState<string>("all");
  const [filterEligibility, setFilterEligibility] = useState<string>("all");
  const [filterLocation, setFilterLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddDonor, setShowAddDonor] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  const [newDonorForm, setNewDonorForm] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    gender: "",
    age: "",
    city: "",
    state: "",
    address: "",
    emergencyContact: "",
  });

  // Mock data - replace with actual API data
  const mockDonors: Donor[] = [
    {
      id: "DON001",
      name: "John Adebayo",
      email: "john.adebayo@email.com",
      phone: "+234 123 456 7890",
      bloodType: "O+",
      gender: "male",
      age: 28,
      city: "Lagos",
      state: "Lagos",
      address: "123 Victoria Island, Lagos",
      lastDonation: "2025-08-15T10:00:00",
      nextEligible: "2025-11-15T10:00:00",
      totalDonations: 12,
      eligibilityStatus: "eligible",
      registeredDate: "2023-03-15T10:00:00",
      emergencyContact: "+234 123 456 7891",
    },
    {
      id: "DON002",
      name: "Sarah Okafor",
      email: "sarah.okafor@email.com",
      phone: "+234 123 456 7892",
      bloodType: "A-",
      gender: "female",
      age: 32,
      city: "Abuja",
      state: "FCT",
      address: "456 Maitama, Abuja",
      lastDonation: "2025-09-01T14:30:00",
      nextEligible: "2025-12-01T14:30:00",
      totalDonations: 8,
      eligibilityStatus: "not_eligible",
      registeredDate: "2023-07-20T10:00:00",
      emergencyContact: "+234 123 456 7893",
    },
    {
      id: "DON003",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+234 123 456 7894",
      bloodType: "B+",
      gender: "male",
      age: 35,
      city: "Benin City",
      state: "Edo",
      address: "789 Ring Road, Benin City",
      lastDonation: null,
      nextEligible: "2025-09-20T00:00:00",
      totalDonations: 0,
      eligibilityStatus: "eligible",
      registeredDate: "2025-09-10T10:00:00",
      emergencyContact: "+234 123 456 7895",
    },
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const nigerianStates = [
    "Lagos",
    "FCT",
    "Kano",
    "Rivers",
    "Oyo",
    "Edo",
    "Delta",
    "Anambra",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDonorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDonor = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new donor:", newDonorForm);
    // API call would go here
    setShowAddDonor(false);
    setNewDonorForm({
      name: "",
      email: "",
      phone: "",
      bloodType: "",
      gender: "",
      age: "",
      city: "",
      state: "",
      address: "",
      emergencyContact: "",
    });
  };

  const filteredDonors = mockDonors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.phone.includes(searchQuery) ||
      donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBloodType =
      filterBloodType === "all" || donor.bloodType === filterBloodType;
    const matchesEligibility =
      filterEligibility === "all" ||
      donor.eligibilityStatus === filterEligibility;
    const matchesLocation =
      filterLocation === "all" || donor.state === filterLocation;

    return (
      matchesSearch && matchesBloodType && matchesEligibility && matchesLocation
    );
  });

  const getEligibilityStatus = (status: string) => {
    switch (status) {
      case "eligible":
        return {
          text: "Eligible",
          color: "green",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
        };
      case "not_eligible":
        return {
          text: "Not Eligible",
          color: "red",
          bgColor: "bg-red-100",
          textColor: "text-red-700",
        };
      case "pending":
        return {
          text: "Pending",
          color: "yellow",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
        };
      default:
        return {
          text: "Unknown",
          color: "gray",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
        };
    }
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

  const DonorCard = ({ donor }: { donor: Donor }) => {
    const eligibility = getEligibilityStatus(donor.eligibilityStatus);

    return (
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 p-6"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            {donor.avatar ? (
              <img
                src={donor.avatar}
                alt={donor.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
            ) : (
              <UserCircleSolidIcon className="h-10 w-10 text-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {donor.name}
                </h3>
                <p className="text-sm text-gray-600">ID: {donor.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  {donor.bloodType}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${eligibility.bgColor} ${eligibility.textColor}`}
                >
                  {eligibility.text}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <EnvelopeIcon className="h-4 w-4" />
                <span className="truncate">{donor.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <PhoneIcon className="h-4 w-4" />
                <span>{donor.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPinIcon className="h-4 w-4" />
                <span>
                  {donor.city}, {donor.state}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <HeartIcon className="h-4 w-4" />
                <span>{donor.totalDonations} donations</span>
              </div>
            </div>

            {/* Last Donation */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Last Donation:</span>
                <span className="ml-1">
                  {donor.lastDonation
                    ? new Date(donor.lastDonation).toLocaleDateString()
                    : "Never"}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Age:</span>
                <span className="ml-1">{donor.age} years</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Registered {new Date(donor.registeredDate).toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedDonor(donor)}
                >
                  <EyeIcon className="h-4 w-4" />
                </motion.button>
                <motion.button
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <PencilIcon className="h-4 w-4" />
                </motion.button>
                <motion.button
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => (window.location.href = `tel:${donor.phone}`)}
                >
                  <PhoneIcon className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <UserGroupIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Donor Registry
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your hospital's donor database and records
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => setShowAddDonor(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Donor</span>
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {mockDonors.length}
            </h3>
            <p className="text-gray-600 text-sm">Total Donors</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {
                mockDonors.filter((d) => d.eligibilityStatus === "eligible")
                  .length
              }
            </h3>
            <p className="text-gray-600 text-sm">Eligible Donors</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <HeartSolidIcon className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {mockDonors.reduce((sum, d) => sum + d.totalDonations, 0)}
            </h3>
            <p className="text-gray-600 text-sm">Total Donations</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {
                mockDonors.filter(
                  (d) =>
                    d.lastDonation &&
                    new Date(d.lastDonation) >
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                ).length
              }
            </h3>
            <p className="text-gray-600 text-sm">This Month</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search donors..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
          </motion.button>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Type
                  </label>
                  <select
                    value={filterBloodType}
                    onChange={(e) => setFilterBloodType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Blood Types</option>
                    {bloodTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eligibility Status
                  </label>
                  <select
                    value={filterEligibility}
                    onChange={(e) => setFilterEligibility(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="eligible">Eligible</option>
                    <option value="not_eligible">Not Eligible</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Locations</option>
                    {nigerianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">Name</option>
                    <option value="bloodType">Blood Type</option>
                    <option value="lastDonation">Last Donation</option>
                    <option value="totalDonations">Total Donations</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Donors Grid */}
      <motion.div variants={itemVariants}>
        {filteredDonors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <ExclamationCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No donors found
            </h3>
            <p className="text-gray-600">
              {searchQuery ||
              filterBloodType !== "all" ||
              filterEligibility !== "all" ||
              filterLocation !== "all"
                ? "Try adjusting your search criteria or filters."
                : "Start building your donor registry by adding new donors."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDonors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Add Donor Modal */}
      <AnimatePresence>
        {showAddDonor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddDonor(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleAddDonor} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Add New Donor
                  </h2>
                  <motion.button
                    type="button"
                    onClick={() => setShowAddDonor(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newDonorForm.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={newDonorForm.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={newDonorForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+234 123 456 7890"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Type *
                      </label>
                      <select
                        name="bloodType"
                        value={newDonorForm.bloodType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Blood Type</option>
                        {bloodTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={newDonorForm.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={newDonorForm.age}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Age"
                        min="18"
                        max="65"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={newDonorForm.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select State</option>
                        {nigerianStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={newDonorForm.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter city"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={newDonorForm.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact *
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={newDonorForm.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+234 123 456 7890"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <motion.button
                    type="button"
                    onClick={() => setShowAddDonor(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Donor
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donor Details Modal */}
      <AnimatePresence>
        {selectedDonor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDonor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Donor Details - {selectedDonor.name}
                  </h2>
                  <motion.button
                    onClick={() => setSelectedDonor(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Full Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedDonor.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Blood Type
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedDonor.bloodType}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <p className="text-gray-900 mt-1">
                        {selectedDonor.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Phone
                      </label>
                      <p className="text-gray-900 mt-1">
                        {selectedDonor.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedDonor.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Total Donations
                      </label>
                      <p className="text-gray-900 mt-1">
                        {selectedDonor.totalDonations}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Last Donation
                      </label>
                      <p className="text-gray-900 mt-1">
                        {selectedDonor.lastDonation
                          ? new Date(
                              selectedDonor.lastDonation
                            ).toLocaleDateString()
                          : "Never"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Emergency Contact
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedDonor.emergencyContact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
