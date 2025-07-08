// src/Auth.tsx - Complete updated version
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { useTheme } from "./context/theme-context";
import PasswordPolicyInput from "./components/PasswordPolicyInput";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification, 
  signOut, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { auth } from "./config/firebase";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.emailVerified) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Clear messages when switching modes
  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
    setPassword("");
    setConfirmPassword("");
    setShowSuccessMessage(false);
  }, [isLogin, showForgotPassword]);

  // Countdown timer for redirect - FIXED
  useEffect(() => {
    if (showSuccessMessage && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showSuccessMessage && redirectCountdown === 0) {
      // Redirect when countdown reaches 0
      setShowSuccessMessage(false);
      setIsLogin(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDisplayName("");
    }
  }, [showSuccessMessage, redirectCountdown]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          await signOut(auth);
          setError("Please verify your email before logging in. Check your inbox.");
          setLoading(false);
          return;
        }
        
        navigate("/dashboard");
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        
        if (!isPasswordValid) {
          setError("Password does not meet requirements");
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        if (displayName && userCredential.user) {
          await updateProfile(userCredential.user, { displayName });
        }
        
        if (userCredential.user) {
          await sendEmailVerification(userCredential.user);
        }
        
        await signOut(auth);
        
        // Show success screen
        setShowSuccessMessage(true);
        setRedirectCountdown(5);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered");
      } else if (err.code === 'auth/invalid-email') {
        setError("Invalid email address");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak");
      } else if (err.code === 'auth/user-not-found') {
        setError("No account found with this email");
      } else if (err.code === 'auth/wrong-password') {
        setError("Incorrect password");
      } else {
        setError(err.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccessMessage("Password reset email sent! Check your inbox.");
      setResetEmail("");
      setTimeout(() => {
        setShowForgotPassword(false);
      }, 3000);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email");
      } else {
        setError(err.message || "Failed to send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  // Success message screen after signup
  if (showSuccessMessage) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl text-center ${
            theme === "dark" ? "bg-gray-800/50 backdrop-blur-md" : "bg-white"
          }`}>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Check Your Email!
            </h2>

            <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              We've sent a verification email to:
              <br />
              <span className="font-semibold">{email}</span>
            </p>

            <div className={`p-4 rounded-lg mb-6 ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"}`}>
              <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Please click the link in the email to verify your account.
                <br />
                Don't forget to check your spam folder!
              </p>
            </div>

            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Redirecting to login in {redirectCountdown} seconds...
            </p>

            <button
              onClick={() => {
                setShowSuccessMessage(false);
                setIsLogin(true);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setDisplayName("");
              }}
              className="mt-4 text-blue-500 hover:text-blue-600 text-sm font-semibold"
            >
              Go to Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
            theme === "dark" ? "bg-gray-800/50 backdrop-blur-md" : "bg-white"
          }`}>
            <Link to="/" className="flex justify-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                TruthCapture
              </h1>
            </Link>

            <h2 className={`text-2xl font-bold text-center mb-8 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Reset Password
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-500 text-sm">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  "Send Reset Email"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-sm text-blue-500 hover:text-blue-600 font-semibold"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          theme === "dark" ? "bg-gray-800/50 backdrop-blur-md" : "bg-white"
        }`}>
          <Link to="/" className="flex justify-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              TruthCapture
            </h1>
          </Link>

          <h2 className={`text-2xl font-bold text-center mb-8 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-500 text-sm">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
            </div>

            {isLogin ? (
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>
            ) : (
              <>
                <PasswordPolicyInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onValidationChange={setIsPasswordValid}
                  className="w-full"
                  showInput={true}
                  showChecklist={true}
                  placeholder="Password"
                  confirmPassword={confirmPassword}
                />

                <div>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === "dark"
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading || (!isLogin && !isPasswordValid)}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                loading || (!isLogin && !isPasswordValid)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;