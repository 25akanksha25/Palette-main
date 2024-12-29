import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoimg from "../../assets/logo.png";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-2  sm:px-14 bg-white py-4 border-b border-border-info-color">
      {/* Logo */}
      <div className="flex items-center px-1 z-[1]">
        <Link to="/admin/users" className="no-underline">
          <img
            src={logoimg}
            alt="Logo"
            className="h-[100px] w-[190px]" // Adjust height to fit your design
          />
        </Link>
      </div>

      {/* Profile */}
      {user && (
        <div className="relative">
          <img
            src={user?.profilePicture}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />

          {sidebarOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                onClick={logoutHandle}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
