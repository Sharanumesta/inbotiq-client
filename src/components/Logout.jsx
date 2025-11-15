import Swal from "sweetalert2";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: "success",
          title: "Logged out",
          timer: 1200,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/login"), 1000);
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
