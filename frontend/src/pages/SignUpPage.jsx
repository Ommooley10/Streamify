import { useState } from "react"
import { ShipWheel, Eye, EyeOff, CheckCircle2, Mail, User, Lock, Sparkles, Globe, MessageSquare } from "lucide-react"
import { Link } from "react-router"
import useSignUp from "../hooks/useSignUp.js"

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Using the existing custom hook
  const { isPending, error, signupMutation } = useSignUp()

  const handleSignup = (e) => {
    e.preventDefault()
    signupMutation(signupData)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-300 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-base-300 to-base-300"
      data-theme="dark"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto z-10">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border border-primary/20 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 border border-secondary/20 rounded-full"></div>

        <div className="border border-primary/30 flex flex-col lg:flex-row w-full mx-auto bg-base-100/80 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] overflow-hidden">
          {/* SIGNUP FORM - LEFT SIDE */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col relative">
            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full"></div>

            {/* LOGO */}
            <div className="mb-8 flex items-center gap-3 relative">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg shadow-primary/30 group transition-all duration-300 hover:shadow-primary/50 hover:scale-105">
                <ShipWheel className="size-8 text-base-100 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div>
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 animate-gradient-x tracking-wider">
                  Streamify
                </span>
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"></div>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="alert alert-error mb-6 animate-fadeIn shadow-lg border-error/30">
                <span>{error.response?.data?.message || "An error occurred"}</span>
              </div>
            )}

            <div className="w-full relative">
              <form onSubmit={handleSignup} className="space-y-7">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Create an Account
                  </h2>
                  <p className="text-sm opacity-70">Join Streamify and start your language learning adventure!</p>
                </div>

                <div className="space-y-5">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-1.5">
                        <User className="size-4 text-primary" />
                        Full Name
                      </span>
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="input input-bordered w-full pl-4 pr-4 h-12 bg-base-200/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                        required
                      />
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-focus-within:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"></div>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-1.5">
                        <Mail className="size-4 text-primary" />
                        Email
                      </span>
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="john@gmail.com"
                        className="input input-bordered w-full pl-4 pr-4 h-12 bg-base-200/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-focus-within:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"></div>
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-1.5">
                        <Lock className="size-4 text-primary" />
                        Password
                      </span>
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className="input input-bordered w-full pl-4 pr-12 h-12 bg-base-200/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity hover:text-primary"
                      >
                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                      </button>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-focus-within:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"></div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <CheckCircle2 className="size-3.5 text-primary" />
                      <p className="text-xs opacity-70">Password must be at least 6 characters long</p>
                    </div>
                  </div>

                  {/* TERMS CHECKBOX */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3 hover:bg-base-200/50 p-2 rounded-lg transition-colors duration-200">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        required
                      />
                      <span className="text-sm leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline cursor-pointer font-medium">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline cursor-pointer font-medium">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full btn-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
                  type="submit"
                  disabled={isPending || !agreedToTerms}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-size-200 animate-gradient-x"></span>
                  <span className="relative">
                    {isPending ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="size-5" />
                        Create Account
                      </div>
                    )}
                  </span>
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:text-secondary font-medium transition-colors duration-300 hover:underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* SIGNUP FORM - RIGHT SIDE */}
          <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/5 via-secondary/5 to-base-300/20 items-center justify-center p-10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 border border-primary/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 border border-secondary/10 rounded-full"></div>

            {/* Animated circles */}
            <div className="absolute w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-pulse"></div>
              <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-secondary/30 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-accent/30 rounded-full animate-pulse animation-delay-2000"></div>
            </div>

            <div className="max-w-md p-8 text-center space-y-8 relative z-10">
              {/* Illustration with enhanced styling */}
              <div className="relative aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
                <div className="relative bg-base-200/50 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-[0_10px_50px_rgba(8,_112,_184,_0.3)] hover:shadow-[0_20px_70px_rgba(8,_112,_184,_0.4)] transition-all duration-500 hover:scale-[1.02] group">
                  <img
                    src="/i.png"
                    alt="Language connection illustration"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Connect with language partners worldwide
                </h2>
                <p className="opacity-80 leading-relaxed">
                  Practice conversations, make friends, and improve your language skills together in our global
                  community of language enthusiasts
                </p>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 gap-4 pt-4">
                  <div className="bg-base-200/50 backdrop-blur-sm p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md group">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <MessageSquare className="size-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">Real-time Conversations</h3>
                        <p className="text-xs opacity-70 mt-1">Practice speaking with native speakers anytime</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200/50 backdrop-blur-sm p-4 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-md group">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors duration-300">
                        <Globe className="size-5 text-secondary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">Global Community</h3>
                        <p className="text-xs opacity-70 mt-1">Connect with language learners worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full blur-sm"></div>
      </div>

      {/* Add custom animation classes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
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
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default SignUpPage
