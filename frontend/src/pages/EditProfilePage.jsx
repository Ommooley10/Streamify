import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuthUser from "../hooks/useAuthUser";
import PageLoader from "../components/PageLoader";
import { updateProfile } from "../lib/api.js";
import { LANGUAGES } from "../constants";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { authUser, isLoading, refetch } = useAuthUser();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    profilePic: authUser?.profilePic || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const allFilled = Object.values(formData).every(
      (val) => val.trim() !== ""
    );
    setIsValid(allFilled);
  }, [formData]);

  if (isLoading) return <PageLoader />;

  const { mutate: saveProfile, isLoading: isSaving } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      if (refetch) refetch();
      navigate("/profile");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRandomAvatar = () => {
    const AVATAR_COUNT = 21;
    const idx = Math.floor(Math.random() * AVATAR_COUNT) + 1;
    const apiBase = import.meta.env.VITE_API_URL || window.location.origin;
    const randomAvatar = `${apiBase}/avatars/${idx}.png`;
    setFormData((prev) => ({ ...prev, profilePic: randomAvatar }));
    toast.success("Random avatar generated!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please fill in all fields before saving.");
      return;
    }
    saveProfile(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-base-content mb-1">Edit Profile</h1>
          <p className="text-sm text-base-content/70">Update your information to personalize your experience</p>
        </div>

        {/* Main Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  {formData.profilePic ? (
                    <div className="avatar">
                      <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={formData.profilePic}
                          alt="Avatar Preview"
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar placeholder">
                      <div className="w-20 h-20 rounded-full bg-neutral text-neutral-content ring ring-primary ring-offset-base-100 ring-offset-2">
                        <span className="text-2xl">?</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-secondary btn-xs gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Generate Random Avatar
                </button>
              </div>

              {/* Hidden input for profilePic */}
              <input type="hidden" name="profilePic" value={formData.profilePic} />

              {/* Personal Information Section */}
              <div className="divider">
                <span className="text-base-content/70 font-medium">Personal Information</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text text-sm font-medium">Full Name</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input input-bordered input-sm focus:input-primary transition-colors"
                  />
                </div>

                {/* Location */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text text-sm font-medium">Location</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="input input-bordered input-sm focus:input-primary transition-colors"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text text-sm font-medium">Bio</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  className="textarea textarea-bordered textarea-sm h-20 focus:textarea-primary transition-colors resize-none"
                />
                <label className="label pt-1">
                  <span className="label-text-alt text-xs text-base-content/60">
                    {formData.bio.length}/200 characters
                  </span>
                </label>
              </div>

              {/* Language Learning Section */}
              <div className="divider">
                <span className="text-base-content/70 font-medium">Language Learning</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Native Language */}
                <div className="form-control">
                  <div className="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <label className="label-text text-sm font-medium text-base-content">Native Language</label>
                    <span className="label-text-alt text-error">*</span>
                  </div>
                  <div className="relative">
                    <select
                      name="nativeLanguage"
                      value={formData.nativeLanguage}
                      onChange={handleChange}
                      className="select select-bordered select-sm w-full bg-base-100 focus:select-primary transition-all duration-300"
                    >
                      <option value="">Select your native language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`native-${lang}`} value={lang.toLowerCase()}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    {formData.nativeLanguage && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-success pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Learning Language */}
                <div className="form-control">
                  <div className="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <label className="label-text text-sm font-medium text-base-content">Learning Language</label>
                    <span className="label-text-alt text-error">*</span>
                  </div>
                  <div className="relative">
                    <select
                      name="learningLanguage"
                      value={formData.learningLanguage}
                      onChange={handleChange}
                      className="select select-bordered select-sm w-full bg-base-100 focus:select-info transition-all duration-300"
                    >
                      <option value="">Select language you're learning</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    {formData.learningLanguage && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-success pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Validation Alert */}
              {!isValid && (
                <div className="alert alert-warning py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm">Please fill in all required fields to save your profile.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="card-actions justify-end pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="btn btn-ghost"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary gap-2 ${isSaving || !isValid ? "btn-disabled" : ""}`}
                  disabled={isSaving || !isValid}
                >
                  {isSaving ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;