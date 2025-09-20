import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListBulletIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ExclamationTriangleIcon as ExclamationTriangleSolidIcon,
  FireIcon as FireSolidIcon,
} from "@heroicons/react/24/solid";

interface BloodRequest {
  id: string;
  bloodType: string;
  quantity: number;
  quantityUnit: string;
  urgency: "critical" | "high" | "medium" | "low";
  deadline: string;
  location: string;
  patientCondition: string;
  contactPerson: string;
  contactPhone: string;
  status: "active" | "fulfilled" | "expired" | "cancelled";
  donorResponses: number;
  confirmedDonors: number;
  postedAt: string;
  publicNotes?: string;
}

export const ActiveRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUrgency, setFilterUrgency] = useState<string>("all");
  const [filterBloodType, setFilterBloodType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("deadline");
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API data
  const mockRequests: BloodRequest[] = [
    {
      id: "REQ001",
      bloodType: "O-",
      quantity: 4,
      quantityUnit: "units",
      urgency: "critical",
      deadline: "2025-09-20T08:00:00",
      location: "Emergency Room - Ward 3",
      patientCondition: "Emergency surgery - traffic accident",
      contactPerson: "Dr. Sarah Johnson",
      contactPhone: "+234 123 456 7890",
      status: "active",
      donorResponses: 12,
      confirmedDonors: 2,
      postedAt: "2025-09-19T14:30:00",
      publicNotes: "Patient stable, surgery scheduled for tomorrow morning",
    },
    {
      id: "REQ002",
      bloodType: "A+",
      quantity: 2,
      quantityUnit: "units",
      urgency: "high",
      deadline: "2025-09-21T12:00:00",
      location: "Operating Theatre 2",
      patientCondition: "Scheduled cardiac surgery",
      contactPerson: "Dr. Michael Chen",
      contactPhone: "+234 123 456 7891",
      status: "active",
      donorResponses: 8,
      confirmedDonors: 1,
      postedAt: "2025-09-19T09:15:00",
    },
    {
      id: "REQ003",
      bloodType: "B+",
      quantity: 3,
      quantityUnit: "units",
      urgency: "medium",
      deadline: "2025-09-22T10:00:00",
      location: "Maternity Ward",
      patientCondition: "Planned cesarean delivery",
      contactPerson: "Dr. Amina Hassan",
      contactPhone: "+234 123 456 7892",
      status: "active",
      donorResponses: 5,
      confirmedDonors: 3,
      postedAt: "2025-09-18T16:45:00",
    },
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    { value: "critical", label: "Critical", color: "red" },
    { value: "high", label: "High", color: "orange" },
    { value: "medium", label: "Medium", color: "yellow" },
    { value: "low", label: "Low", color: "blue" },
  ];

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.patientCondition
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      request.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUrgency =
      filterUrgency === "all" || request.urgency === filterUrgency;
    const matchesBloodType =
      filterBloodType === "all" || request.bloodType === filterBloodType;

    return matchesSearch && matchesUrgency && matchesBloodType;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "red";
      case "high":
        return "orange";
      case "medium":
        return "yellow";
      case "low":
        return "blue";
      default:
        return "gray";
    }
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

    if (diffHours < 0) return { text: "Overdue", color: "text-red-600" };
    if (diffHours < 2)
      return { text: `${diffHours}h remaining`, color: "text-red-600" };
    if (diffHours < 24)
      return { text: `${diffHours}h remaining`, color: "text-orange-600" };

    const diffDays = Math.ceil(diffHours / 24);
    return { text: `${diffDays}d remaining`, color: "text-gray-600" };
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

  const RequestCard = ({ request }: { request: BloodRequest }) => {
    const timeRemaining = getTimeRemaining(request.deadline);
    const urgencyColor = getUrgencyColor(request.urgency);

    return (
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        whileHover={{ scale: 1.01 }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-xl bg-${urgencyColor}-100 flex items-center justify-center`}
              >
                <span className={`text-${urgencyColor}-600 font-bold text-lg`}>
                  {request.bloodType}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {request.quantity} {request.quantityUnit} -{" "}
                  {request.bloodType}
                </h3>
                <p className="text-sm text-gray-600">ID: {request.id}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {request.urgency === "critical" && (
                <ExclamationTriangleSolidIcon className="h-5 w-5 text-red-500" />
              )}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium bg-${urgencyColor}-100 text-${urgencyColor}-700 capitalize`}
              >
                {request.urgency}
              </span>
            </div>
          </div>

          {/* Patient Info */}
          <div className="mb-4">
            <p className="text-gray-800 font-medium mb-1">
              {request.patientCondition}
            </p>
            {request.publicNotes && (
              <p className="text-sm text-gray-600">{request.publicNotes}</p>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ClockIcon className="h-4 w-4" />
              <span className={timeRemaining.color}>{timeRemaining.text}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4" />
              <span>{request.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <PhoneIcon className="h-4 w-4" />
              <span>{request.contactPerson}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <UserGroupIcon className="h-4 w-4" />
              <span>
                {request.donorResponses} responses, {request.confirmedDonors}{" "}
                confirmed
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Donation Progress</span>
              <span>
                {request.confirmedDonors}/{request.quantity} units
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full bg-${urgencyColor}-500`}
                style={{
                  width: `${Math.min((request.confirmedDonors / request.quantity) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Posted {new Date(request.postedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedRequest(request)}
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
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <TrashIcon className="h-4 w-4" />
              </motion.button>
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
              <ListBulletIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Active Requests
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your hospital's blood donation requests
              </p>
            </div>
          </div>

          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/dashboard/post-request")}
          >
            <PlusCircleIcon className="h-5 w-5" />
            <span>New Request</span>
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ListBulletIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {mockRequests.length}
            </h3>
            <p className="text-gray-600 text-sm">Total Active</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FireSolidIcon className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {mockRequests.filter((r) => r.urgency === "critical").length}
            </h3>
            <p className="text-gray-600 text-sm">Critical</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {mockRequests.reduce((sum, r) => sum + r.donorResponses, 0)}
            </h3>
            <p className="text-gray-600 text-sm">Total Responses</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {mockRequests.reduce((sum, r) => sum + r.confirmedDonors, 0)}
            </h3>
            <p className="text-gray-600 text-sm">Confirmed Donors</p>
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
              placeholder="Search requests..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center space-x-4">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={filterUrgency}
                    onChange={(e) => setFilterUrgency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Urgency Levels</option>
                    {urgencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

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
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="deadline">Deadline</option>
                    <option value="urgency">Urgency</option>
                    <option value="responses">Donor Responses</option>
                    <option value="posted">Date Posted</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Requests Grid */}
      <motion.div variants={itemVariants}>
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <ExclamationCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No requests found
            </h3>
            <p className="text-gray-600">
              {searchQuery ||
              filterUrgency !== "all" ||
              filterBloodType !== "all"
                ? "Try adjusting your search criteria or filters."
                : "You haven't posted any blood requests yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Request Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRequest(null)}
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
                    Request Details - {selectedRequest.id}
                  </h2>
                  <motion.button
                    onClick={() => setSelectedRequest(null)}
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
                        Blood Type
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedRequest.bloodType}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Quantity
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedRequest.quantity}{" "}
                        {selectedRequest.quantityUnit}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Patient Condition
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedRequest.patientCondition}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Location
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedRequest.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Contact Person
                      </label>
                      <p className="text-gray-900 mt-1">
                        {selectedRequest.contactPerson}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Contact Phone
                      </label>
                      <p className="text-gray-900 mt-1">
                        {selectedRequest.contactPhone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Response Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Responses:</span>
                        <span className="ml-2 font-medium">
                          {selectedRequest.donorResponses}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Confirmed Donors:</span>
                        <span className="ml-2 font-medium">
                          {selectedRequest.confirmedDonors}
                        </span>
                      </div>
                    </div>
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
