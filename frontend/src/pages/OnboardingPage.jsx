import { useState } from "react"
import useAuthUser from "../hooks/useAuthUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { completeOnboarding } from "../lib/api.js"
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  Camera,
  User,
  MessageSquare,
  Globe,
  CheckCircle,
  Sparkles,
  Languages,
} from "lucide-react"
import { LANGUAGES } from "../constants"

const OnboardingPage = () => {
  const { authUser } = useAuthUser()
  const queryClient = useQueryClient()

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully")
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },

    onError: (error) => {
      toast.error(error.response.data.message)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onboardingMutation(formState)
  }

  const handleRandomAvatar = () => {
    // We have exactly 21 offline avatars served from /avatars on the backend
    const AVATAR_COUNT = 21
    const idx = Math.floor(Math.random() * AVATAR_COUNT) + 1 // 1–21
    // Use backend base URL via env var (in Vite: VITE_API_URL)
    const apiBase = import.meta.env.VITE_API_URL || window.location.origin
    const randomAvatar = `${apiBase}/avatars/${idx}.png`

    setFormState(prev => ({
      ...prev,
      profilePic: randomAvatar,
    }))
    toast.success("Random profile picture generated!")
  }

  // Calculate completion percentage for progress indicator
  const getCompletionPercentage = () => {
    const fields = [
      formState.fullName,
      formState.bio,
      formState.nativeLanguage,
      formState.learningLanguage,
      formState.location,
      formState.profilePic,
    ]
    const completedFields = fields.filter((field) => field.trim() !== "").length
    return Math.round((completedFields / fields.length) * 100)
  }

  const completionPercentage = getCompletionPercentage()

  return (
    <div data-theme="dark" className="min-h-screen bg-base-100 flex items-center justify-center p-4 relative">
      {/* Background decorative elements using DaisyUI colors */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-xl mb-4">
            <Sparkles className="w-8 h-8 text-primary-content animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-3">Complete Your Profile</h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Let's set up your language learning journey and connect you with the perfect partners
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-base-200 rounded-box p-4 shadow-lg">
            <div className="flex items-center justify-between text-sm text-base-content mb-3">
              <span className="font-medium">Profile Completion</span>
              <span className="font-bold text-primary">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="card bg-base-200 shadow-2xl">
          <div className="card-body p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Picture Section */}
              <div className="text-center space-y-6">
                <div className="flex items-center gap-3 justify-center mb-6">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-base-content">Profile Picture</h2>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  {/* Enhanced Profile Picture Preview */}
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-base-300 border-4 border-base-300 overflow-hidden shadow-xl transition-all duration-300 group-hover:scale-105">
                      {formState.profilePic ? (
                        <img
                          src={formState.profilePic || "/placeholder.svg"}
                          alt="Profile Preview"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Camera className="w-12 h-12 text-base-content/40" />
                        </div>
                      )}
                    </div>
                    {formState.profilePic && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-base-200 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-success-content" />
                      </div>
                    )}
                  </div>

                  {/* Enhanced Random Avatar Button */}
                  <button
                    type="button"
                    onClick={handleRandomAvatar}
                    className="btn btn-accent btn-md gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShuffleIcon className="w-4 h-4" />
                    Generate Random Avatar
                  </button>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="form-control">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-primary" />
                      <label className="label-text font-semibold text-base-content">Full Name</label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                        className="input input-bordered w-full bg-base-100 focus:input-primary transition-all duration-300"
                        placeholder="Your full name"
                      />
                      {formState.fullName && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success" />
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="form-control">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-secondary" />
                      <label className="label-text font-semibold text-base-content">Bio</label>
                    </div>
                    <div className="relative">
                      <textarea
                        name="bio"
                        value={formState.bio}
                        onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                        className="textarea textarea-bordered w-full h-24 bg-base-100 focus:textarea-secondary transition-all duration-300 resize-none"
                        placeholder="Tell others about yourself and your language learning goals"
                      />
                      {formState.bio && <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-success" />}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="form-control">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinIcon className="w-4 h-4 text-error" />
                      <label className="label-text font-semibold text-base-content">Location</label>
                    </div>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
                      <input
                        type="text"
                        name="location"
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                        className="input input-bordered w-full pl-10 pr-12 bg-base-100 focus:input-error transition-all duration-300"
                        placeholder="City, Country"
                      />
                      {formState.location && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Languages Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Languages className="w-5 h-5 text-info" />
                      <h3 className="text-lg font-bold text-base-content">Languages</h3>
                    </div>

                    {/* Native Language */}
                    <div className="form-control">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-4 h-4 text-success" />
                        <label className="label-text font-semibold text-base-content">Native Language</label>
                      </div>
                      <div className="relative">
                        <select
                          name="nativeLanguage"
                          value={formState.nativeLanguage}
                          onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                          className="select select-bordered w-full bg-base-100 focus:select-success transition-all duration-300"
                        >
                          <option value="">Select your native language</option>
                          {LANGUAGES.map((lang) => (
                            <option key={`native-${lang}`} value={lang.toLowerCase()}>
                              {lang}
                            </option>
                          ))}
                        </select>
                        {formState.nativeLanguage && (
                          <CheckCircle className="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success pointer-events-none" />
                        )}
                      </div>
                    </div>

                    {/* Learning Language */}
                    <div className="form-control">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-4 h-4 text-info" />
                        <label className="label-text font-semibold text-base-content">Learning Language</label>
                      </div>
                      <div className="relative">
                        <select
                          name="learningLanguage"
                          value={formState.learningLanguage}
                          onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                          className="select select-bordered w-full bg-base-100 focus:select-info transition-all duration-300"
                        >
                          <option value="">Select language you're learning</option>
                          {LANGUAGES.map((lang) => (
                            <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                              {lang}
                            </option>
                          ))}
                        </select>
                        {formState.learningLanguage && (
                          <CheckCircle className="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success pointer-events-none" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <div className="pt-6">
                <button
                  className={`btn w-full ${
                    isPending ? "btn-disabled" : "btn-primary"
                  } btn-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                  disabled={isPending}
                  type="submit"
                >
                  {!isPending ? (
                    <>
                      <ShipWheelIcon className="w-5 h-5" />
                      Complete Onboarding
                    </>
                  ) : (
                    <>
                      <LoaderIcon className="animate-spin w-5 h-5" />
                      Setting up your profile...
                    </>
                  )}
                </button>

                {/* Completion Status */}
                <div className="mt-4 text-center">
                  <div className="text-sm text-base-content/70">
                    {completionPercentage === 100 ? (
                      <div className="flex items-center justify-center gap-2 text-success font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Profile Complete! Ready to submit.
                      </div>
                    ) : (
                      <span>
                        Complete all fields to unlock your language learning journey (
                        {6 - Math.floor((completionPercentage / 100) * 6)} fields remaining)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
