import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api.js";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  SparklesIcon,
  GlobeIcon,
  HeartIcon,
  MessageCircleIcon,
} from "lucide-react";

import { capitialize } from "../lib/utils.js";
import FriendCard, { getLanguageFlag } from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs?.length > 0) {
      outgoingFriendReqs.forEach((req) =>
        outgoingIds.add(req.recipient._id)
      );
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200
                 animate-fadeIn"
    >
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
        {/* ================= Header Section ================= */}
        <section className="text-center space-y-4 relative overflow-hidden mt-2
                             animate-slideInUp"
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -top-8 right-1/3 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-12 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>

          {/* Badge */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="badge badge-secondary badge-lg gap-3 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary/20 hover:scale-105">
                <GlobeIcon className="size-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-semibold tracking-wide">Explore & Connect</span>
              </div>
              <div className="absolute inset-0 badge badge-secondary badge-lg opacity-20 blur-sm -z-10 group-hover:opacity-40 transition-opacity"></div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3 mt-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight
                           bg-gradient-to-r from-primary via-secondary to-accent
                           bg-clip-text text-transparent animate-gradient bg-300%
                           leading-tight"
            >
              Connect & Learn Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent
                            rounded-full mx-auto mt-2 opacity-60"></div>
            <p className="text-base-content/80 text-md sm:text-lg max-w-3xl mx-auto
                          leading-relaxed font-medium"
            >
              Build meaningful connections with language learners worldwide and
              <span className="text-primary font-semibold"> accelerate your journey</span> to fluency
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {[
              { text: "Real Conversations", color: "primary" },
              { text: "Cultural Exchange", color: "secondary" },
              { text: "Learn Together", color: "accent" },
            ].map(({ text, color }, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-4 py-2 bg-${color}/10 text-${color}
                           rounded-full border border-${color}/20 hover:bg-${color}/20
                           transition-colors group text-sm animate-slideInUp`}
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className={`w-2 h-2 bg-${color} rounded-full group-hover:animate-ping`} />
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* ================= Friends Section ================= */}
        <section className="space-y-6 animate-slideInUp" style={{ animationDelay: "500ms" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center
                          justify-between gap-4 bg-base-100 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="bg-primary text-primary-content rounded-full w-10 h-10
                               flex items-center justify-center p-2 overflow-hidden"
                >
                  <UsersIcon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight flex items-center gap-2">
                  Your Friends
                  <div className="badge badge-primary">{friends.length}</div>
                </h2>
                <p className="text-sm text-base-content/60">Your learning community</p>
              </div>
            </div>
            <Link
              to="/notifications"
              className="btn btn-outline btn-primary gap-2 text-sm hover:scale-105 transition-transform"
            >
              <UsersIcon className="size-4" />
              Friend Requests
            </Link>
          </div>

          {loadingFriends ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <span className="loading loading-spinner loading-lg text-primary" />
              <p className="text-base-content/60">Loading your friends...</p>
            </div>
          ) : friends.length === 0 ? (
            <div className="bg-base-100 rounded-2xl p-8 border-2 border-dashed border-base-300">
              <NoFriendsFound />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {friends.map((friend, i) => (
                <div
                  key={friend._id}
                  className="transform hover:scale-[1.02] transition-all duration-300 animate-slideInUp"
                  style={{ animationDelay: `${600 + i * 100}ms` }}
                >
                  <FriendCard friend={friend} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= Recommended Users ================= */}
        <section className="space-y-8 animate-slideInUp" style={{ animationDelay: "800ms" }}>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="badge badge-secondary badge-lg gap-2">
                <GlobeIcon className="size-4" />
                Discover
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight
                           bg-gradient-to-r from-secondary to-accent
                           bg-clip-text text-transparent"
            >
              Meet New Learners
            </h2>
            <p className="text-base-content/70 mt-2 max-w-2xl mx-auto">
              Discover perfect language exchange partners curated just for you based on your learning goals and interests
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <span className="loading loading-spinner loading-lg text-secondary" />
              <p className="text-base-content/60">Finding perfect matches for you...</p>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-gradient-to-br from-base-200 to-base-300 shadow-xl">
              <div className="card-body text-center p-12">
                <div className="avatar placeholder mb-4">
                  <div className="bg-base-300 text-base-content rounded-full w-16 h-16">
                    <SparklesIcon className="size-8" />
                  </div>
                </div>
                <h3 className="card-title justify-center mb-2">No recommendations available</h3>
                <p className="text-base-content/70">
                  We're working hard to find the perfect language partners for you. Check back soon!
                </p>
                <div className="card-actions justify-center mt-6">
                  <button className="btn btn-primary btn-outline">Refresh Recommendations</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedUsers.map((user, i) => {
                const sent = outgoingRequestsIds.has(user._id);
                return (
                  <div
                    key={user._id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl border border-base-300 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 group animate-slideInUp"
                    style={{ animationDelay: `${900 + i * 100}ms` }}
                  >
                    <div className="card-body p-6 space-y-5">
                      {/* Profile Header */}
                      <div className="flex items-center gap-4">
                        <div className="avatar online">
                          <div className="w-16 h-16 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2 group-hover:ring-primary/40 transition-all">
                            <img src={user.profilePic} alt={user.fullName} className="object-cover" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-base-content">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center gap-1 text-sm text-base-content/60 mt-1">
                              <MapPinIcon className="size-3" />
                              <span>{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-3">
                        <div className="badge badge-lg badge-secondary gap-2 font-medium">
                          <span className="text-lg">{getLanguageFlag(user.nativeLanguage)}</span>
                          Native: {capitialize(user.nativeLanguage)}
                        </div>
                        <div className="badge badge-lg badge-outline badge-primary gap-2 font-medium">
                          <span className="text-lg">{getLanguageFlag(user.learningLanguage)}</span>
                          Learning: {capitialize(user.learningLanguage)}
                        </div>
                      </div>

                      {/* Bio */}
                      {user.bio && (
                        <div className="bg-base-200 rounded-xl p-4 text-sm italic text-base-content/80">
                          "{user.bio}"
                        </div>
                      )}

                      {/* Action */}
                      <div className="card-actions pt-2">
                        <button
                          className={`btn w-full gap-2 ${sent
                            ? "btn-success btn-outline"
                            : "btn-primary hover:scale-105 shadow-lg hover:shadow-primary/25"
                            }`}
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={sent || isPending}
                        >
                          {isPending ? (
                            <>
                              <span className="loading loading-spinner loading-sm" />
                              Sending...
                            </>
                          ) : sent ? (
                            <>
                              <CheckCircleIcon className="size-4" />
                              Request Sent
                              <HeartIcon className="size-4 fill-current" />
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Global CSS for keyframes and utility classes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0%,100% { opacity: .7; }
          50%      { opacity: 1; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideInUp {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .pointer-events-none { pointer-events: none; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
          animation-delay: 500ms;
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 6s ease-in-out infinite;
        }
        .bg-300\\% { background-size: 300% 300%; }
      `}</style>
    </div>
  );
};

export default HomePage;
