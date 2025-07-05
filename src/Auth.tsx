// src/Auth.tsx
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.emailVerified) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Sign in directly with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Check if email is verified
        if (!userCredential.user.emailVerified) {
          await signOut(auth);
          setError("Please verify your email before logging in. Check your inbox.");
          setLoading(false);
          return;
        }
        
        navigate("/dashboard");
      } else {
        // Validate passwords match
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        
        // Validate password meets requirements
        if (!isPasswordValid) {
          setError("Password does not meet requirements");
          setLoading(false);
          return;
        }

        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update display name if provided
        if (displayName && userCredential.user) {
          await updateProfile(userCredential.user, { displayName });
        }
        
        // Send verification email
        if (userCredential.user) {
          await sendEmailVerification(userCredential.user);
        }
        
        // Sign out immediately to prevent access before verification
        await signOut(auth);
        
        // Show success message
        setError(null);
        setIsLogin(true); // Switch to login mode
        alert("Account created! Please check your email to verify your account before logging in.");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      
      // Better error messages
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

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          theme === "dark" ? "bg-gray-800/50 backdrop-blur-md" : "bg-white"
        }`}>
          {/* Logo */}
          <Link to="/" className="flex justify-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              TruthCapture
            </h1>
          </Link>

          {/* Title */}
          <h2 className={`text-2xl font-bold text-center mb-8 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
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

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button
                onClick={async () => {
                  if (!email) {
                    setError("Please enter your email address first");
                    return;
                  }
                  try {
                    await sendPasswordResetEmail(auth, email);
                    alert("Password reset email sent! Check your inbox.");
                  } catch (err: any) {
                    setError(err.message || "Failed to send reset email");
                  }
                }}
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