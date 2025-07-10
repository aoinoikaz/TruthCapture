// src/components/PasswordPolicyInput.tsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/theme-context";

interface PasswordRule {
  message: string;
  test: (password: string) => boolean;
  value?: number;
}

interface PasswordPolicy {
  minLength: PasswordRule;
  maxLength: PasswordRule;
  uppercase: PasswordRule;
  lowercase: PasswordRule;
  number: PasswordRule;
  specialChar: PasswordRule;
}

const passwordPolicy: PasswordPolicy = {
  minLength: {
    value: 8,
    message: "At least 8 characters",
    test: (password: string) => password.length >= 8,
  },
  maxLength: {
    value: 32,
    message: "At most 32 characters",
    test: (password: string) => password.length <= 32,
  },
  uppercase: {
    message: "At least one uppercase letter",
    test: (password: string) => /[A-Z]/.test(password),
  },
  lowercase: {
    message: "At least one lowercase letter",
    test: (password: string) => /[a-z]/.test(password),
  },
  number: {
    message: "At least one number",
    test: (password: string) => /[0-9]/.test(password),
  },
  specialChar: {
    message: "At least one special character (!@#$%^&*)",
    test: (password: string) => /[!@#$%^&*]/.test(password),
  },
};

interface PasswordPolicyInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange: (isValid: boolean) => void;
  className?: string;
  showInput?: boolean;
  showChecklist?: boolean;
  placeholder?: string;
  confirmPassword?: string;
}

interface ValidationState {
  minLength: boolean;
  maxLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
  matchConfirm: boolean;
}

const PasswordPolicyInput: React.FC<PasswordPolicyInputProps> = ({
  value,
  onChange,
  onValidationChange,
  className,
  showInput = true,
  showChecklist = false,
  placeholder,
  confirmPassword = "",
}) => {
  const { theme } = useTheme();
  const [validationState, setValidationState] = useState<ValidationState>({
    minLength: false,
    maxLength: true,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    matchConfirm: true,
  });

  useEffect(() => {
    const newValidationState: ValidationState = {
      minLength: passwordPolicy.minLength.test(value),
      maxLength: passwordPolicy.maxLength.test(value),
      uppercase: passwordPolicy.uppercase.test(value),
      lowercase: passwordPolicy.lowercase.test(value),
      number: passwordPolicy.number.test(value),
      specialChar: passwordPolicy.specialChar.test(value),
      matchConfirm: confirmPassword.length === 0 || value === confirmPassword,
    };
    setValidationState(newValidationState);

    const isValid = Object.values(newValidationState).every((valid) => valid);
    onValidationChange(isValid);
  }, [value, confirmPassword, onValidationChange]);

  const rulesMet = Object.values(validationState).filter((valid) => valid).length;
  const strength = rulesMet < 4 ? "Weak" : rulesMet < 6 ? "Medium" : "Strong";
  const strengthColor =
    strength === "Weak"
      ? "text-red-500"
      : strength === "Medium"
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div className={className}>
      {showInput && (
        <input
          type="password"
          placeholder={placeholder || "Password"}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            theme === "dark"
              ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
              : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required
        />
      )}

      {showChecklist && value.length > 0 && (
        <div className={`mt-4 p-4 rounded-lg ${
          theme === "dark" ? "bg-gray-700/30" : "bg-gray-100"
        }`}>
          {/* Password Strength */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Password strength
              </span>
              <span className={`text-sm font-medium ${strengthColor}`}>
                {strength}
              </span>
            </div>
            <div className="w-full bg-gray-600/30 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  strength === "Weak"
                    ? "bg-red-500 w-1/3"
                    : strength === "Medium"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-green-500 w-full"
                }`}
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-1 text-sm">
            {Object.entries(passwordPolicy).map(([key, rule]) => (
              <div
                key={key}
                className={`flex items-center ${
                  validationState[key as keyof ValidationState]
                    ? "text-green-500"
                    : theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <span className="mr-2">
                  {validationState[key as keyof ValidationState] ? "✓" : "○"}
                </span>
                {rule.message}
              </div>
            ))}
            {confirmPassword && (
              <div
                className={`flex items-center ${
                  validationState.matchConfirm
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <span className="mr-2">
                  {validationState.matchConfirm ? "✓" : "○"}
                </span>
                Passwords match
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordPolicyInput;