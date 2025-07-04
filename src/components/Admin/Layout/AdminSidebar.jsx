import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { FaUserCheck } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { GiTeacher } from "react-icons/gi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
// Icons
import {
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiLogOut,
  FiChevronRight,
  FiChevronLeft,
  FiX,
  FiHome,
  FiDollarSign,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { FaRegFileCode } from "react-icons/fa";

import {
  FaUserPlus,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserCog,
  FaKey,
} from "react-icons/fa";
import { AiOutlineFileText, AiOutlineDatabase } from "react-icons/ai";
import { BsBook, BsCalendarCheck, BsFileEarmarkText } from "react-icons/bs";
import { MdPayment, MdAssignment, MdEmail } from "react-icons/md";
import { IoSchool, IoStatsChart } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { BiCog, BiExport } from "react-icons/bi";

const AdminSidebar = ({
  isCollapsedProp = false,
  isMobile = false,
  onCloseMobile,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedProp);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [adminData, setAdminData] = useState(null);
  const [isRegister, setisRegister] = useState(false);
  const [isAccountant, setisAccountant] = useState(false);
  const [isAcademic, setisAcademic] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Load user data from localStorage once on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const localData = localStorage.getItem("user");
        if (localData) {
          const parsedData = JSON.parse(localData);
          setAdminData(parsedData);
          if (parsedData.registration_admin) {
            setisRegister(parsedData.registration_admin);
          }
          if (parsedData.academic_admin) {
            setisAcademic(parsedData.academic_admin);
            console.log("Academic Admin");
          }
          if (parsedData.accounts_admin) {
            setisAccountant(parsedData.accounts_admin);
            console.log("Accounting Admin");
          }
        }
      } catch (err) {
        console.error("Error loading admin data:", err);
      }
    };

    loadUserData();
  }, []);

  // Check if a menu should be expanded based on current location
  useEffect(() => {
    if (!isCollapsed) {
      const expanded = {};
      getMenuItems().forEach((item) => {
        if (item.subItems) {
          const isActive = item.subItems.some(
            (subItem) => location.pathname === subItem.path
          );
          if (isActive) {
            expanded[item.id] = true;
          }
        }
      });
      setExpandedMenus(expanded);
    }
  }, [location.pathname, isCollapsed]);

  // Define menu items
  const getMenuItems = () => {
    const menuItems = [
      {
        id: 1,
        title: "Dashboard",
        icon: <FiHome className="w-5 h-5" />,
        path: "/admin",
      },
    ];

    if (isAcademic) {
      menuItems.push({
        id: 2,
        title: "Academic Management",
        icon: <BsBook className="w-5 h-5" />,
        path: "/admin-academic",
        subItems: [
          {
            id: "am-1",
            title: "Course Code Management",
            icon: <IoSchool className="w-4 h-4" />,
            path: "/course-code-management",
          },
          {
            id: "am-2",
            title: "Teacher Course Management",
            icon: <MdAssignment className="w-4 h-4" />,
            path: "/teacher-course-management",
          },
          {
            id: "am-3",
            title: "Student Semester Management",
            icon: <AiOutlineFileText className="w-4 h-4" />,
            path: "/student-semester",
          },
          {
            id: "am-4",
            title: "Create Course Code",
            icon: <FaRegFileCode className="w-4 h-4" />,
            path: "/academic-Create-Course-Code",
          },
          {
            id: "am-5",
            title: "Academic Management Notice",
            icon: <BsFileEarmarkText className="w-4 h-4" />,
            path: "/academic-management-notice",
          },
          {
            id: "am-6",
            title: "Communication",
            icon: <MdOutlineConnectWithoutContact className="w-4 h-4" />,
            path: "/academic-communication",
          },
        ],
      });
    }

    if (isAccountant) {
      menuItems.push({
        id: 3,
        title: "Finance & Accounting",
        icon: <FiDollarSign className="w-5 h-5" />,
        path: "/admin-finance",
        subItems: [
          {
            id: "fa-1",
            title: "New register student",
            icon: <HiUserAdd className="w-4 h-4" />,
            path: "/new-registerStudent",
          },
          {
            id: "fa-2",
            title: "Regular student",
            icon: <FaUserGraduate className="w-4 h-4" />,
            path: "/regular-student",
          },
          {
            id: "fa-3",
            title: "Employee salary",
            icon: <FaMoneyCheckAlt className="w-4 h-4" />,
            path: "/employees-salary",
          },
          {
            id: "fa-4",
            title: "Financial Management Notice",
            icon: <BsFileEarmarkText className="w-4 h-4" />,
            path: "/financial-management-notice",
          },
          {
            id: "fa-5",
            title: "Communication",
            icon: <MdOutlineConnectWithoutContact className="w-4 h-4" />,
            path: "/account-communication",
          },
        ],
      });
    }

    if (isRegister) {
      menuItems.push({
        id: 4,
        title: "Registration & Records",
        icon: <AiOutlineDatabase className="w-5 h-5" />,
        path: "/admin-records",
        subItems: [
          {
            id: "rr-1",
            title: "Student Document Verification",
            icon: <FaUserCheck className="w-4 h-4" />,
            path: "/student-document-verification",
          },
          {
            id: "rr-2",
            title: "Teacher Document Verification",
            icon: <FaChalkboardTeacher className="w-4 h-4" />,
            path: "/teacher-document-verification",
          },
          {
            id: "rr-3",
            title: "Students details",
            icon: <FaUserGraduate className="w-4 h-4" />,
            path: "/students-details",
          },
          {
            id: "rr-4",
            title: "Teachers details",
            icon: <GiTeacher className="w-4 h-4" />,
            path: "/teachers-details",
          },
          {
            id: "rr-5",
            title: "Register Management Notice",
            icon: <BsFileEarmarkText className="w-4 h-4" />,
            path: "/register-management-notice",
          },

          {
            id: "rr-7",
            title: "Communication",
            icon: <MdOutlineConnectWithoutContact className="w-4 h-4" />,
            path: "/register-communication",
          },
        ],
      });
    }

    return menuItems;
  };

  const handleLogout = useCallback(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8B5CF6", // Purple
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");

        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/admin-login");
        });
      }
    });
  }, [navigate]);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
    // Close all expanded menus when sidebar is collapsed
    if (!isCollapsed) {
      setExpandedMenus({});
    }
  }, [isCollapsed]);

  const toggleSubMenu = useCallback((id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // Animation variants
  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "5rem" },
  };

  const mobileSidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const textVariants = {
    visible: { opacity: 1, transition: { delay: 0.1 } },
    hidden: { opacity: 0, transition: { duration: 0.1 } },
  };

  const subMenuVariants = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
          delay: 0.1,
        },
      },
    },
  };

  // Fix: Always show text on mobile
  const showText = !isCollapsed || isMobile;

  // Fix: Make sure onCloseMobile is defined
  const handleCloseMobile = useCallback(() => {
    if (onCloseMobile && typeof onCloseMobile === "function") {
      onCloseMobile();
    }
  }, [onCloseMobile]);

  // Get menu items for rendering
  const menuItems = getMenuItems();

  // Mock user data - used as fallback
  const mockAdminData = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
  };

  // Use admin data from state or fallback to mock data
  const displayAdminData = adminData || mockAdminData;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <motion.div
        className={`h-screen ${
          isMobile ? "fixed top-0 left-0 z-50 shadow-2xl" : "relative"
        }`}
        variants={isMobile ? mobileSidebarVariants : sidebarVariants}
        initial={isMobile ? "hidden" : isCollapsed ? "collapsed" : "expanded"}
        animate={isMobile ? "visible" : isCollapsed ? "collapsed" : "expanded"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? "none" : "auto",
        }}
      >
        <div className="flex flex-col h-full bg-gray-900 text-gray-100 shadow-xl overflow-hidden">
          {/* Header section */}
          <motion.div
            className="flex items-center justify-between h-16 px-4 border-b border-gray-700 flex-shrink-0 bg-gray-900"
            layout="position"
          >
            <div className="flex items-center">
              <motion.div
                className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="text-white font-bold text-lg">
                  E
                </Link>
              </motion.div>

              <AnimatePresence>
                {showText && (
                  <motion.span
                    className="ml-3 font-semibold text-lg text-purple-300 whitespace-nowrap"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Link to="/">ECollege Admin</Link>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {isMobile ? (
              <motion.button
                onClick={handleCloseMobile}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close sidebar"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-5 h-5 text-gray-300" />
              </motion.button>
            ) : (
              <motion.button
                onClick={toggleCollapse}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isCollapsed ? (
                  <FiChevronRight className="w-5 h-5 text-gray-300" />
                ) : (
                  <FiChevronLeft className="w-5 h-5 text-gray-300" />
                )}
              </motion.button>
            )}
          </motion.div>

          {/* Main content area with scrolling */}
          <div className="flex flex-col flex-grow overflow-hidden">
            {/* Menu items with fixed height and proper scrolling */}
            <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent overflow-x-hidden">
              <nav className="space-y-1 px-3 py-4">
                {/* Menu items */}
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const hasSubMenu = item.subItems && item.subItems.length > 0;
                  const isSubActive =
                    hasSubMenu &&
                    item.subItems.some(
                      (subItem) => location.pathname === subItem.path
                    );
                  const isExpanded = expandedMenus[item.id];

                  return (
                    <div key={item.id}>
                      {/* Main menu item */}
                      {hasSubMenu ? (
                        <button
                          onClick={() => toggleSubMenu(item.id)}
                          className={`w-full flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-200 ${
                            isSubActive
                              ? "bg-purple-700 text-white shadow-md"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                        >
                          <div className="flex items-center">
                            <motion.div
                              className={
                                isCollapsed && !isMobile ? "mx-auto" : ""
                              }
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {React.cloneElement(item.icon, {
                                className: `w-5 h-5 ${
                                  isSubActive ? "text-white" : "text-gray-400"
                                }`,
                              })}
                            </motion.div>

                            <AnimatePresence>
                              {showText && (
                                <motion.span
                                  className={`ml-3 font-medium whitespace-nowrap ${
                                    isSubActive ? "text-white" : "text-gray-300"
                                  }`}
                                  variants={textVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="hidden"
                                >
                                  {item.title}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Chevron indicator for submenu */}
                          {showText && hasSubMenu && (
                            <motion.div
                              initial={false}
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiChevronRight
                                className={`w-4 h-4 ${
                                  isSubActive ? "text-white" : "text-gray-400"
                                }`}
                              />
                            </motion.div>
                          )}
                        </button>
                      ) : (
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center py-3 px-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-purple-700 text-white shadow-md"
                                : "text-gray-300 hover:bg-gray-800"
                            }`
                          }
                          onClick={isMobile ? handleCloseMobile : undefined}
                        >
                          {({ isActive }) => (
                            <>
                              <motion.div
                                className={
                                  isCollapsed && !isMobile ? "mx-auto" : ""
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {React.cloneElement(item.icon, {
                                  className: `w-5 h-5 ${
                                    isActive ? "text-white" : "text-gray-400"
                                  }`,
                                })}
                              </motion.div>

                              <AnimatePresence>
                                {showText && (
                                  <motion.span
                                    className={`ml-3 font-medium whitespace-nowrap ${
                                      isActive ? "text-white" : "text-gray-300"
                                    }`}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                  >
                                    {item.title}
                                  </motion.span>
                                )}
                              </AnimatePresence>

                              {isActive && showText && (
                                <motion.div
                                  className="w-1.5 h-1.5 rounded-full bg-white ml-auto"
                                  layoutId="activeIndicator"
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                  }}
                                />
                              )}
                            </>
                          )}
                        </NavLink>
                      )}

                      {/* Submenu items */}
                      {hasSubMenu && showText && (
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={subMenuVariants}
                              className="ml-4 mt-1 space-y-1"
                            >
                              {item.subItems.map((subItem) => (
                                <NavLink
                                  key={subItem.id}
                                  to={subItem.path}
                                  className={({ isActive }) =>
                                    `flex items-center py-2 px-3 rounded-md transition-all duration-200 ${
                                      isActive
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                                    }`
                                  }
                                  onClick={
                                    isMobile ? handleCloseMobile : undefined
                                  }
                                >
                                  {({ isActive }) => (
                                    <>
                                      {React.cloneElement(subItem.icon, {
                                        className: `w-4 h-4 ${
                                          isActive
                                            ? "text-white"
                                            : "text-gray-400"
                                        }`,
                                      })}
                                      <span className="ml-3 text-sm font-medium">
                                        {subItem.title}
                                      </span>
                                      {isActive && (
                                        <motion.div
                                          className="w-1 h-1 rounded-full bg-white ml-auto"
                                          layoutId={`subActiveIndicator-${item.id}`}
                                          transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                          }}
                                        />
                                      )}
                                    </>
                                  )}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Footer section - fixed at bottom */}
            <motion.div
              className="flex-shrink-0 border-t border-gray-700 pt-2 bg-gray-800"
              layout="position"
            >
              {/* Status indicator for admins */}
              <AnimatePresence>
                {showText && displayAdminData?.role && (
                  <motion.div
                    className="px-4 py-2"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="text-xs flex items-center text-purple-300">
                      <motion.div
                        className="w-2 h-2 rounded-full mr-2 bg-purple-500"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                      <span>Admin Panel</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User info with icon instead of photo */}
              <div className="px-3 py-2">
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center"
                  >
                    <FiUser className="w-4 h-4 text-purple-300" />
                  </motion.div>

                  <AnimatePresence>
                    {showText && (
                      <motion.div
                        className="ml-3 overflow-hidden"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <p className="text-sm font-medium text-gray-200 truncate">
                          {displayAdminData.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {displayAdminData.email}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Logout button */}
              <div className="px-3 pb-4">
                <motion.button
                  className={`flex items-center w-full py-2.5 px-3 rounded-lg text-gray-300 hover:bg-red-900 ${
                    isCollapsed && !isMobile ? "justify-center" : ""
                  }`}
                  whileHover={{ backgroundColor: "rgba(127, 29, 29, 0.5)" }}
                  whileTap={{ backgroundColor: "rgba(127, 29, 29, 0.7)" }}
                  onClick={handleLogout}
                >
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiLogOut className="w-5 h-5 text-red-400" />
                  </motion.div>

                  <AnimatePresence>
                    {showText && (
                      <motion.span
                        className="ml-3 font-medium whitespace-nowrap text-red-400"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        Logout
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminSidebar;
