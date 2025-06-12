import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api.js";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import DisplayFriendCard from "../components/displayFriendCard.jsx";
import { UsersIcon, HeartIcon, MessageCircleIcon, SparklesIcon } from "lucide-react";

const FriendsPage = () => {
  const {
    data: friends = [],
    isLoading: loadingFriends,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">

        {/* Enhanced Header Section */}
        <section className="text-center space-y-6 mb-12 relative overflow-hidden">
          {/* Floating Background Decorations */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-8 left-1/4 w-24 h-24 bg-primary/8 rounded-full blur-2xl animate-float"></div>
            <div className="absolute -top-4 right-1/3 w-32 h-32 bg-secondary/6 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-16 right-1/4 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-float-slow"></div>
          </div>

          {/* Main Header */}
          <div className="space-y-4 animate-slideInUp opacity-0 animation-delay-200">
            <div className="relative">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-300% leading-snug">
                Your Learning Community
              </h1>

            </div>

            {/* Stats Section */}
            {!loadingFriends && friends.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slideInUp opacity-0 animation-delay-300">
                <div className="stats stats-horizontal shadow-lg bg-base-100 border border-base-300">
                  <div className="stat place-items-center px-6 py-4">
                    <div className="stat-figure text-primary">
                      <UsersIcon className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-base-content/60">Total Friends</div>
                    <div className="stat-value text-primary text-3xl font-bold">{friends.length}</div>
                  </div>

                  <div className="stat place-items-center px-6 py-4">
                    <div className="stat-figure text-secondary">
                      <MessageCircleIcon className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-base-content/60">Active Chats</div>
                    <div className="stat-value text-secondary text-3xl font-bold">{friends.length}</div>
                  </div>

                  <div className="stat place-items-center px-6 py-4">
                    <div className="stat-figure text-accent">
                      <HeartIcon className="w-8 h-8 fill-current" />
                    </div>
                    <div className="stat-title text-base-content/60">Connections</div>
                    <div className="stat-value text-accent text-3xl font-bold">{friends.length}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Friends Content Section */}
        <section className="animate-slideInUp opacity-0 animation-delay-600">
          {/* Loading State */}
          {loadingFriends ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse-slow">
              <div className="loading loading-spinner loading-lg text-primary"></div>
              <div className="text-center space-y-2">
                <p className="text-base-content/80 text-xl font-medium">Loading your friends...</p>
                <p className="text-base-content/60">Preparing your language community</p>
              </div>
            </div>
          ) : friends.length === 0 ? (
            // Empty State
            <div className="animate-fadeIn">
              <div className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-300/50">
                <NoFriendsFound />
              </div>
            </div>
          ) : (
            // Friends Grid with Enhanced Layout
            <div className="space-y-8">
              {/* Friends Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {friends.map((friend, index) => (
                  <div
                    key={friend._id}
                    className="animate-slideInUp opacity-0 transform hover:scale-[1.02] transition-all duration-300"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <DisplayFriendCard friend={friend} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
          animation-delay: 4s;
        }

        .animate-gradient {
          animation: gradient 4s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .bg-300\% {
          background-size: 300% 300%;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-700 {
          animation-delay: 700ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        @media (max-width: 640px) {
          .stats-horizontal {
            display: grid;
            grid-template-columns: 1fr;
          }
          
          .stat {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FriendsPage;