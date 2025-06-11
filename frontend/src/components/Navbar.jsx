"use client"

import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser.js"
import { BellIcon, LogOutIcon, ChevronDown, User, Settings, HelpCircle } from "lucide-react"
import ThemeSelector from "./ThemeSelector.jsx"
import useLogout from "../hooks/useLogout.js"
import { useState } from "react"

const Navbar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const isChatPage = location.pathname?.startsWith("/chat")
  const { logoutMutation } = useLogout()

  // State for dropdown menu
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Mock notification count - replace with actual data if available
  const notificationCount = 0

  return (
    <nav className="bg-base-200/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-30 h-16 flex items-center shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* RIGHT SIDE ITEMS */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Theme Selector */}
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Link to="/notifications" className="btn btn-ghost btn-circle relative group">
                <BellIcon className="h-5 w-5 text-base-content opacity-70 group-hover:text-primary group-hover:opacity-100 transition-colors duration-200" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-error text-error-content text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Link>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 hover:bg-base-300/50 p-1 pr-2 rounded-full transition-colors duration-200"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="avatar online">
                  <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1 shadow-md overflow-hidden">
                    <img
                      src={authUser?.profilePic || "https://ui-avatars.com/api/?name=User&background=random"}
                      alt={authUser?.fullName || "User"}
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <span className="hidden md:inline-block text-sm font-medium">
                  {authUser?.fullName?.split(" ")[0] || "User"}
                </span>
                <ChevronDown className="h-4 w-4 text-base-content/70" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg py-1 border border-base-300 animate-fadeIn z-50"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div className="px-4 py-2 border-b border-base-300">
                    <p className="text-sm font-medium">{authUser?.fullName || "User"}</p>
                    <p className="text-xs text-base-content/70 truncate">{authUser?.email || "user@example.com"}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-base-200 transition-colors duration-200"
                  >
                    <User className="h-4 w-4 mr-2 text-primary" />
                    Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm hover:bg-base-200 transition-colors duration-200"
                  >
                    <Settings className="h-4 w-4 mr-2 text-primary" />
                    Settings
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center px-4 py-2 text-sm hover:bg-base-200 transition-colors duration-200"
                  >
                    <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                    Help
                  </Link>

                  <div className="border-t border-base-300 mt-1">
                    <button
                      onClick={logoutMutation}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-error hover:bg-base-200 transition-colors duration-200"
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile-only logout button */}
            <div className="sm:hidden">
              <button
                className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-colors duration-200"
                onClick={logoutMutation}
              >
                <LogOutIcon className="h-5 w-5 text-base-content opacity-70" />
                <span className="sr-only">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation classes */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
