import useAuthUser from "../hooks/useAuthUser.js"
import PageLoader from "../components/PageLoader.jsx"

const ProfilePage = () => {
  const { authUser, isLoading } = useAuthUser()

  if (isLoading) {
    return <PageLoader />
  }

  if (!authUser) {
    return (
      <div className="flex items-center justify-center h-full animate-fade-in">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">😔</div>
          <p className="text-lg font-medium">User not found.</p>
          <p className="text-sm text-base-content/60 mt-2">Please check your authentication status.</p>
        </div>
      </div>
    )
  }

  const { fullName, email, bio, profilePic, nativeLanguage, learningLanguage, location } = authUser

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-200 to-base-300 py-8 px-4 animate-fade-in">
      <div className="container mx-auto max-w-4xl">


        {/* Main Profile Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 animate-slide-in-bottom">
          <div className="card-body p-8">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0 animate-scale-in">
                <div className="avatar group">
                  <div className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100 shadow-lg hover:ring-secondary hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    {profilePic ? (
                      <img src={profilePic || "/placeholder.svg"} alt="Profile" className="object-cover transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <div className="flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 w-full h-full text-4xl font-bold text-primary transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20">
                        {fullName?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left animate-slide-in-right">
                <h2 className="text-3xl font-bold text-base-content mb-3 hover:text-primary transition-colors duration-300">{fullName}</h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 group hover:scale-105 transition-transform duration-300">
                  <svg className="w-4 h-4 text-base-content/60 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <p className="text-base-content/80 group-hover:text-primary transition-colors duration-300">{email}</p>
                </div>

                {bio && (
                  <div className="bg-gradient-to-r from-base-200 to-base-300/50 rounded-lg p-4 border-l-4 border-primary hover:border-secondary hover:shadow-md transition-all duration-300 animate-fade-in-up">
                    <p className="text-base-content/80 italic">"{bio}"</p>
                  </div>
                )}
              </div>
            </div>

            <div className="divider divider-primary opacity-0 animate-fade-in-delayed-2">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">Language Information</span>
            </div>

            {/* Language Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Native Language Card */}
              <div className="relative overflow-hidden group animate-slide-in-left">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                <div className="relative bg-base-100/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-6 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group-hover:bg-base-100/90">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary mb-1 group-hover:scale-105 transition-transform duration-300">Native Language</h3>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-block bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300">
                      {nativeLanguage || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Learning Language Card */}
              <div className="relative overflow-hidden group animate-slide-in-up">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                <div className="relative bg-base-100/80 backdrop-blur-sm border-2 border-secondary/20 rounded-xl p-6 hover:border-secondary/40 hover:shadow-xl transition-all duration-300 group-hover:bg-base-100/90">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-secondary mb-1 group-hover:scale-105 transition-transform duration-300">Learning Language</h3>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-block bg-gradient-to-r from-secondary to-secondary/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300">
                      {learningLanguage || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="relative overflow-hidden group animate-slide-in-right">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                <div className="relative bg-base-100/80 backdrop-blur-sm border-2 border-accent/20 rounded-xl p-6 hover:border-accent/40 hover:shadow-xl transition-all duration-300 group-hover:bg-base-100/90">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-accent mb-1 group-hover:scale-105 transition-transform duration-300">Location</h3>
                      <p className="text-xs text-base-content/60 uppercase tracking-wide">Current Base</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-block bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300">
                      {location || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
              <button className="btn btn-primary gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300 group">
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span className="group-hover:tracking-wide transition-all duration-300">Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-in-top {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes slide-in-bottom {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes slide-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }

        @keyframes slide-in-right {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }

        @keyframes slide-in-up {
          from { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in-top {
          animation: slide-in-top 0.8s ease-out;
        }

        .animate-slide-in-bottom {
          animation: slide-in-bottom 0.8s ease-out 0.2s both;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out 0.4s both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out 0.6s both;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out 0.5s both;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out 0.3s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out 0.7s both;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.6s ease-out 0.4s both;
        }

        .animate-fade-in-delayed-2 {
          animation: fade-in 0.6s ease-out 0.6s both;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}

export default ProfilePage