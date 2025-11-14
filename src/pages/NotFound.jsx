import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-gray-700 text-xl mb-6">Page Not Found</p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
