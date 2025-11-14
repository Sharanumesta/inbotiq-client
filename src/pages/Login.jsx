import axios from "axios";
import { useState } from "react";
import { setToken } from "../utils/auth";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const submit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      form,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    setToken(res.data.token);
    window.location = "/dashboard";

  } catch (err) {
    console.error("Login error:", err);

    if (err.response) {
      setErrors({ backend: err.response.data.msg || "Login failed" });
    } else if (err.request) {
      setErrors({ backend: "No response from server." });
    } else {
      setErrors({ backend: "Unexpected error occurred." });
    }
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        {errors.backend && (
          <p className="text-red-600 text-center mb-3">{errors.backend}</p>
        )}

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <input
              type="email"
              className={`w-full p-3 border rounded-md focus:ring-2 ${
                errors.email ? "border-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className={`w-full p-3 border rounded-md focus:ring-2 ${
                errors.password ? "border-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="button"
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>

            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
