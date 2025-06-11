"use client"

import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser.js"
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const Sidebar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const currentPath = location.pathname

  // State for sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-base-200/80 backdrop-blur-md border-r border-base-300/50 hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out shadow-lg`}
    >
      {/* HEADER SECTION */}
      <div className="p-5 border-b border-base-300/50 relative">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-br from-primary to-secondary p-1.5 rounded-lg shadow-md shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105">
            <ShipWheelIcon className="size-7 text-base-100 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          {!isCollapsed && (
            <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary bg-size-200 animate-gradient-x tracking-wider transition-opacity duration-300">
              Streamify
            </span>
          )}
        </Link>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-base-100 border border-base-300 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-primary/10 group"
        >
          {isCollapsed ? (
            <ChevronRight className="size-4 text-base-content group-hover:text-primary transition-colors duration-200" />
          ) : (
            <ChevronLeft className="size-4 text-base-content group-hover:text-primary transition-colors duration-200" />
          )}
        </button>
      </div>

      {/* NAVIGATION SECTION */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-primary/10 ${
            currentPath === "/"
              ? "bg-primary/20 text-primary border-r-4 border-primary shadow-md"
              : "text-base-content/70 hover:text-primary"
          }`}
        >
          <HomeIcon className="size-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
          {!isCollapsed && <span className="font-medium transition-opacity duration-300">Home</span>}
          {isCollapsed && currentPath === "/" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 text-primary text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Home
            </div>
          )}
        </Link>

        <Link
          to="/friends"
          className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-primary/10 ${
            currentPath === "/friends"
              ? "bg-primary/20 text-primary border-r-4 border-primary shadow-md"
              : "text-base-content/70 hover:text-primary"
          }`}
        >
          <UsersIcon className="size-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
          {!isCollapsed && <span className="font-medium transition-opacity duration-300">Friends</span>}
          {isCollapsed && currentPath === "/friends" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 text-primary text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Friends
            </div>
          )}
        </Link>

        <Link
          to="/notifications"
          className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-primary/10 ${
            currentPath === "/notifications"
              ? "bg-primary/20 text-primary border-r-4 border-primary shadow-md"
              : "text-base-content/70 hover:text-primary"
          }`}
        >
          <BellIcon className="size-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
          {!isCollapsed && <span className="font-medium transition-opacity duration-300">Notifications</span>}
          {isCollapsed && currentPath === "/notifications" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 text-primary text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Notifications
            </div>
          )}
        </Link>

        {/* Tooltips for collapsed state */}
        {isCollapsed && (
          <>
            <Link to="/" className="group relative flex items-center justify-center">
              {currentPath !== "/" && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 text-base-content text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  Home
                </div>
              )}
            </Link>
            <Link to="/friends" className="group relative flex items-center justify-center">
              {currentPath !== "/friends" && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 text-base-content text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  Friends
                </div>
              )}
            </Link>
            <Link to="/notifications" className="group relative flex items-center justify-center">
              {currentPath !== "/notifications" && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 text-base-content text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                  Notifications
                </div>
              )}
            </Link>
          </>
        )}
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-base-300/50 mt-auto">
        <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="avatar online">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1 shadow-md overflow-hidden">
              <img
                src={authUser?.profilePic || "https://ui-avatars.com/api/?name=User&background=random"}
                alt={authUser?.fullName || "User"}
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 transition-opacity duration-300">
              <p className="font-semibold text-sm truncate">{authUser?.fullName || "User"}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block animate-pulse" />
                Online
              </p>
            </div>
          )}
        </div>

        {/* Collapsed state tooltip for user info */}
        {isCollapsed && (
          <div className="group relative flex justify-center mt-2">
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-base-100 text-base-content text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
              <div className="font-medium">{authUser?.fullName || "User"}</div>
              <div className="text-xs text-success">Online</div>
            </div>
          </div>
        )}
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </aside>
  )
}

export default Sidebar
