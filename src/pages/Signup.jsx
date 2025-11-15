import axios from "axios";
import { useState, useEffect } from "react";
import { setToken, getToken } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) navigate("/dashboard");
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Invalid email.";
    if (!form.password.trim()) newErrors.password = "Password required.";
    else if (form.password.length < 6) newErrors.password = "Minimum 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    Swal.fire({
      title: "Creating account...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        form
      );

      Swal.fire({
        icon: "success",
        title: "Account created successfully!",
        timer: 1500,
        showConfirmButton: false
      });

      setToken(res.data.token);
      setTimeout(() => navigate("/dashboard"), 1200);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: err.response?.data?.msg || "Try again"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form className="space-y-4" onSubmit={submit}>
          <input
            className={`w-full p-3 border rounded-md ${
              errors.name ? "border-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <input
            type="email"
            className={`w-full p-3 border rounded-md ${
              errors.email ? "border-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className={`w-full p-3 border rounded-md ${
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
              {showPass ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}

          <select
            className="w-full p-3 border rounded-md"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
