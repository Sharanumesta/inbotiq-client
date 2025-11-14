import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./utils/auth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function PrivateRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
