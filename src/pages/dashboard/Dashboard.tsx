import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import {
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusCircleIcon,
  FireIcon,
  TrophyIcon,
  CalendarIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  MapPinIcon as MapPinSolidIcon,
} from "@heroicons/react/24/solid";

export const Dashboard = () => {
  const { user } = useAuthStore();

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Mock data - replace with actual data from your store/API
  const donorStats = {
    totalDonations: 8,
    livesSaved: 24,
    nextEligible: "Dec 15, 2025",
    nearbyRequests: 5,
    recentDonations: [
      {
        date: "Nov 2, 2025",
        location: "General Hospital",
        status: "completed",
      },
      {
        date: "Aug 15, 2025",
        location: "City Medical Center",
        status: "completed",
      },
    ],
  };

  const hospitalStats = {
    activeRequests: 3,
    totalDonors: 847,
    thisMonth: 23,
    responseRate: "92%",
    recentRequests: [
      { bloodType: "O-", urgency: "Critical", posted: "2 hours ago" },
      { bloodType: "A+", urgency: "High", posted: "1 day ago" },
    ],
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "red",
    trend,
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<any>;
    color?: "red" | "blue" | "green" | "orange";
    trend?: string;
  }) => {
    const colorClasses = {
      red: "from-red-500 to-red-600 text-red-600 bg-red-50",
      blue: "from-blue-500 to-blue-600 text-blue-600 bg-blue-50",
      green: "from-green-500 to-green-600 text-green-600 bg-green-50",
      orange: "from-orange-500 to-orange-600 text-orange-600 bg-orange-50",
    };

    return (
      <motion.div
        variants={itemVariants}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-lg`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          {trend && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
              {trend}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
          <p className="text-gray-600 font-medium mb-1">{title}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </motion.div>
    );
  };

  const QuickAction = ({
    title,
    description,
    icon: Icon,
    color = "red",
    onClick,
  }: {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color?: "red" | "blue";
    onClick?: () => void;
  }) => (
    <motion.button
      variants={itemVariants}
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 border-dashed transition-all duration-300 text-left w-full ${
        color === "red"
          ? "border-red-200 hover:border-red-300 hover:bg-red-50"
          : "border-blue-200 hover:border-blue-300 hover:bg-blue-50"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            color === "red"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.button>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-8"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg ${
              user?.userType === "donor"
                ? "from-red-500 to-red-600"
                : "from-blue-500 to-blue-600"
            }`}
          >
            {user?.userType === "donor" ? (
              <HeartSolidIcon className="h-8 w-8 text-white" />
            ) : (
              <MapPinSolidIcon className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-gray-600 mt-1">
              {user?.userType === "donor"
                ? `Ready to save lives? Your blood type ${user?.bloodType || "O+"} is valuable.`
                : `Manage your blood requests and connect with donors.`}
            </p>
          </div>
        </div>

        {/* Quick Status Alert */}
        {user?.userType === "donor" && (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-5 w-5" />
              <div>
                <p className="font-semibold">Eligible to donate!</p>
                <p className="text-sm text-green-100">
                  Your next donation can save up to 3 lives
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {user?.userType === "hospital" && donorStats.nearbyRequests > 0 && (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <BellIcon className="h-5 w-5" />
              <div>
                <p className="font-semibold">3 active critical requests</p>
                <p className="text-sm text-orange-100">
                  Monitor responses and manage donor outreach
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.userType === "donor" ? (
          <>
            <StatCard
              title="Total Donations"
              value={donorStats.totalDonations}
              subtitle="Lifetime contributions"
              icon={HeartIcon}
              color="red"
            />
            <StatCard
              title="Lives Saved"
              value={donorStats.livesSaved}
              subtitle="Estimated impact"
              icon={TrophyIcon}
              color="green"
              trend="+3 this year"
            />
            <StatCard
              title="Next Eligible"
              value={donorStats.nextEligible}
              subtitle="Ready to donate"
              icon={CalendarIcon}
              color="blue"
            />
            <StatCard
              title="Nearby Requests"
              value={donorStats.nearbyRequests}
              subtitle="In your area"
              icon={MapPinIcon}
              color="orange"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Active Requests"
              value={hospitalStats.activeRequests}
              subtitle="Currently seeking donors"
              icon={PlusCircleIcon}
              color="blue"
            />
            <StatCard
              title="Registered Donors"
              value={hospitalStats.totalDonors.toLocaleString()}
              subtitle="In your network"
              icon={UserGroupIcon}
              color="green"
            />
            <StatCard
              title="This Month"
              value={hospitalStats.thisMonth}
              subtitle="Successful donations"
              icon={ChartBarIcon}
              color="red"
              trend="+15%"
            />
            <StatCard
              title="Response Rate"
              value={hospitalStats.responseRate}
              subtitle="Donor engagement"
              icon={FireIcon}
              color="orange"
            />
          </>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="space-y-4">
            {user?.userType === "donor" ? (
              <>
                <QuickAction
                  title="Find Blood Requests"
                  description="View urgent requests in your area"
                  icon={MapPinIcon}
                  color="red"
                />
                <QuickAction
                  title="Schedule Donation"
                  description="Book your next donation appointment"
                  icon={CalendarIcon}
                  color="red"
                />
                <QuickAction
                  title="Update Profile"
                  description="Keep your health information current"
                  icon={HeartIcon}
                  color="red"
                />
              </>
            ) : (
              <>
                <QuickAction
                  title="Post New Request"
                  description="Create an urgent blood request"
                  icon={PlusCircleIcon}
                  color="blue"
                />
                <QuickAction
                  title="View Donors"
                  description="Browse available donors nearby"
                  icon={UserGroupIcon}
                  color="blue"
                />
                <QuickAction
                  title="Analytics"
                  description="View donation statistics and trends"
                  icon={ChartBarIcon}
                  color="blue"
                />
              </>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {user?.userType === "donor"
              ? "Recent Donations"
              : "Recent Requests"}
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {user?.userType === "donor" ? (
              <div className="divide-y divide-gray-100">
                {donorStats.recentDonations.map((donation, index) => (
                  <div
                    key={index}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <HeartIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {donation.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            {donation.date}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
                <div className="p-6 text-center">
                  <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                    View All Donations
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {hospitalStats.recentRequests.map((request, index) => (
                  <div
                    key={index}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                          <span className="text-red-600 font-bold text-sm">
                            {request.bloodType}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Blood Type {request.bloodType}
                          </p>
                          <p className="text-sm text-gray-600">
                            {request.posted}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          request.urgency === "Critical"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {request.urgency}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="p-6 text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View All Requests
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
