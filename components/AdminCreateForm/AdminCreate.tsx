"use client";
import { registerAdmin } from "@/lib/database/actions/admin/auth/register";
import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast from react-toastify

type AdminRegistrationFormProps = {
  onSuccess: () => void;
  onFailure: (message: string) => void;
};

const AdminRegistrationForm: React.FC<AdminRegistrationFormProps> = ({
  onSuccess,
  onFailure,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Local loading state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Simple validation function
  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid Email.";
    }
    if (password.length < 10) {
      newErrors.password = "Password must be at least 10 characters long.";
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Replace this with your actual registration logic
      const res = await registerAdmin(email, password);
      if (res?.success) {
        toast.success("Registration successful!"); // Success notification
        onSuccess();
      } else {
        toast.error(res?.message || "Registration failed."); // Error notification
        onFailure(res?.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("An error occurred while registering."); // Error notification
      onFailure("An error occurred while registering.");
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default AdminRegistrationForm;
