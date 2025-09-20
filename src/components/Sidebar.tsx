import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import {
  HomeIcon,
  HeartIcon,
  BuildingOffice2Icon,
  PlusCircleIcon,
  ListBulletIcon,
  UserGroupIcon,
  ChartBarIcon,
  MapPinIcon,
  ClockIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  badge?: number;
}

export const Sidebar = () => {
  const { user, sidebarCollapsed, toggleSidebar, setSidebarCollapsed } =
    useAuthStore();
  const location = useLocation();

  const donorNavItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    {
      name: "Find Requests",
      href: "/dashboard/requests",
      icon: MapPinIcon,
      badge: 5,
    },
    { name: "My Donations", href: "/dashboard/donations", icon: HeartIcon },
    { name: "History", href: "/dashboard/history", icon: ClockIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  ];

  const hospitalNavItems: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    {
      name: "Post Request",
      href: "/dashboard/post-request",
      icon: PlusCircleIcon,
    },
    {
      name: "Active Requests",
      href: "/dashboard/active-requests",
      icon: ListBulletIcon,
      badge: 3,
    },
    { name: "Donors", href: "/dashboard/donors", icon: UserGroupIcon },
    // { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
    // { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  ];

  const navItems =
    user?.userType === "donor" ? donorNavItems : hospitalNavItems;

  const isActiveRoute = (href: string) => {
    return (
      location.pathname === href ||
      (href !== "/dashboard" && location.pathname.startsWith(href))
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Full Height */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarCollapsed ? 80 : 320,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-gray-100 z-40 shadow-lg overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-100">
            <motion.div className="flex items-center" layout>
              <Link to="/home" className="flex items-center space-x-3">
                <img
                  src="/assets/logo.png"
                  alt="PulsePoint"
                  className="h-10 w-auto"
                />
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-2xl font-bold text-slate-800"
                    >
                      PulsePoint
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>

          {/* User Info Section */}
          <div className="p-6 border-b border-gray-100">
            <motion.div className="flex items-center justify-between" layout>
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                        {user?.userType === "donor" ? (
                          <HeartIcon className="h-6 w-6 text-white" />
                        ) : (
                          <BuildingOffice2Icon className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {user?.userType === "donor"
                          ? "Donor Portal"
                          : "Hospital Portal"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {user?.userType === "donor"
                          ? `Type ${user?.bloodType}`
                          : user?.hospitalName}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors group ml-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sidebarCollapsed ? (
                  <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                ) : (
                  <ChevronLeftIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-red-50 text-red-700 shadow-sm border border-red-100"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <AnimatePresence mode="wait">
                        {!sidebarCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center justify-between flex-1 ml-4"
                          >
                            <span className="font-semibold text-sm">
                              {item.name}
                            </span>
                            {item.badge && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tooltip for collapsed sidebar */}
                      {sidebarCollapsed && (
                        <div className="absolute left-20 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                              {item.badge}
                            </span>
                          )}
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-6 space-y-4 border-t border-gray-100">
            {/* Help & Support */}
            <Link
              to="/help"
              className="group flex items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700 transition-all duration-300">
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="ml-4 font-semibold text-sm"
                  >
                    Help & Support
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Emergency Contact - Only for hospitals */}
            {user?.userType === "hospital" && (
              <motion.div
                className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <PhoneIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">Emergency Line</h4>
                          <p className="text-xs text-red-100">
                            Critical requests only
                          </p>
                        </div>
                      </div>
                      <motion.button
                        className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Call Emergency
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-12 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PhoneIcon className="h-5 w-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
