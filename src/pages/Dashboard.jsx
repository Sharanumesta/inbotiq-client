import axios from "axios";
import { useEffect, useState } from "react";
import { getToken, logout } from "../utils/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setError("Unauthorized: Please login again.");
      setLoading(false);
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);

        if (err.response) {
          setError(err.response.data.msg || "Failed to fetch user");
        } else if (err.request) {
          setError("No response from server.");
        } else {
          setError("Request error occurred.");
        }

        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
          <div className="h-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>

          <button
            onClick={() => {
              logout();
              window.location = "/login";
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="bg-white max-w-2xl mx-auto p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, <span className="text-blue-600">{user.name}</span>
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Role: <span className="font-semibold">{user.role}</span>
        </p>

        {user.role === "ADMIN" ? (
          <div className="p-4 bg-purple-100 rounded-lg border border-purple-300">
            <h2 className="text-xl font-bold mb-2 text-purple-800">
              Admin Dashboard
            </h2>
            <p className="text-gray-700">
              Manage users, view analytics, and access admin tools.
            </p>
          </div>
        ) : (
          <div className="p-4 bg-green-100 rounded-lg border border-green-300">
            <h2 className="text-xl font-bold mb-2 text-green-800">
              User Dashboard
            </h2>
            <p className="text-gray-700">
              Access your personal dashboard and user features.
            </p>
          </div>
        )}

        <button
          onClick={() => {
            logout();
            window.location = "/login";
          }}
          className="mt-6 bg-red-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
