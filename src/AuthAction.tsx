// src/AuthAction.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { applyActionCode, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "./config/firebase";
import { useTheme } from "./context/theme-context";
import PasswordPolicyInput from "./components/PasswordPolicyInput";

const AuthAction: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  
  // For password reset
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    if (mode === "resetPassword" && oobCode) {
      // Verify the password reset code
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setEmail(email);
        })
        .catch((error) => {
          setError("Invalid or expired password reset link");
          console.error(error);
        });
    }
  }, [mode, oobCode]);

  const handleVerifyEmail = async () => {
    if (!oobCode) {
      setError("Invalid verification link");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await applyActionCode(auth, oobCode);
      setSuccess(true);
      
      // Redirect to auth page after 3 seconds
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (error: any) {
      console.error("Email verification error:", error);
      if (error.code === "auth/invalid-action-code") {
        setError("This verification link has already been used or is invalid");
      } else {
        setError(error.message || "Failed to verify email");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!oobCode) {
      setError("Invalid password reset link");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet requirements");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
      
      // Redirect to auth page after 3 seconds
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (error: any) {
      console.error("Password reset error:", error);
      if (error.code === "auth/invalid-action-code") {
        setError("This reset link has expired or is invalid");
      } else {
        setError(error.message || "Failed to reset password");
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-verify email on page load
  useEffect(() => {
    if (mode === "verifyEmail" && oobCode && !success && !error) {
      handleVerifyEmail();
    }
  }, [mode, oobCode]);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          theme === "dark" ? "bg-gray-800/50 backdrop-blur-md" : "bg-white"
        }`}>
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              TruthCapture
            </h1>
          </div>

          {mode === "verifyEmail" && (
            <>
              <h2 className={`text-2xl font-bold text-center mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Email Verification
              </h2>

              {loading && (
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    Verifying your email...
                  </p>
                </div>
              )}

              {success && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl">✓</span>
                  </div>
                  <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Your email has been verified successfully!
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Redirecting to login...
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl">✕</span>
                  </div>
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={() => navigate("/auth")}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </>
          )}

          {mode === "resetPassword" && (
            <>
              <h2 className={`text-2xl font-bold text-center mb-8 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Reset Your Password
              </h2>

              {!success ? (
                <>
                  {email && (
                    <p className={`text-center mb-6 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Reset password for: <span className="font-medium">{email}</span>
                    </p>
                  )}

                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-500 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <PasswordPolicyInput
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onValidationChange={setIsPasswordValid}
                      className="w-full"
                      showInput={true}
                      showChecklist={true}
                      placeholder="New password"
                      confirmPassword={confirmPassword}
                    />

                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === "dark"
                          ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />

                    <button
                      onClick={handleResetPassword}
                      disabled={loading || !isPasswordValid}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                        loading || !isPasswordValid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-3xl">✓</span>
                  </div>
                  <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Your password has been reset successfully!
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Redirecting to login...
                  </p>
                </div>
              )}
            </>
          )}

          {!mode && (
            <div className="text-center">
              <p className="text-red-500 mb-4">Invalid action link</p>
              <button
                onClick={() => navigate("/auth")}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthAction;