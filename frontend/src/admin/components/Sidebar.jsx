import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset, logout } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaCirclePlus } from "react-icons/fa6";
import { IoIosNotifications, IoMdSettings, IoIosListBox } from "react-icons/io";
import { FaEdit, FaListAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOutSharp, IoWalletOutline } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { RiAuctionFill } from "react-icons/ri";
import { FaPaintBrush } from "react-icons/fa";


const Sidebar = ({ closeNavbar }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //console.log(user, "user in sidebar..........,,,,,,.. usertype..");

  useEffect(() => {}, [user]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="w-full hidden sm:block lg:sticky  top-5 lg:h-screen lg:w-[25%] sm:min-w-[250px] lg:max-w-[280px]  ">
      <div className="text-black bg-gray-300 p-5 rounded-2xl border border-black ">
        <ul className="flex flex-col gap-1 font-medium cursor-pointer">
          {/* <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/admin/dashboard"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/admin/dashboard"
              onClick={() => handleLinkClick("/admin/dashboard")}
            >
              <IoIosListBox
                size={16}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/admin/dashboard" ? " text-white" : ""
                }`}
              />
              Dashboard
            </Link>
          </li> */}

          <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-white hover:bg-gray-500 transition-all duration-500 ${
                activeLink === "/admin/users"
                  ? "bg-gray-400"
                  : "text-black"
              }`}
              to="/admin/users"
              onClick={() => handleLinkClick("/admin/users")}
            >
              <FaUser
                size={16}
                className={`text-black transition-all duration-500 ${
                  activeLink === "/admin/users" ? " text-black" : ""
                }`}
              />
              Users
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-2  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-white hover:bg-gray-500 transition-all duration-500 ${
                activeLink === "/admin/auctions"
                  ? "bg-gray-400"
                  : "text-black"
              }`}
              to="/admin/auctions"
              onClick={() => handleLinkClick("/admin/auctions")}
            >
              <RiAuctionFill
                size={16}
                className={`text-black transition-all duration-500 ${
                  activeLink === "/admin/auctions" ? " text-black" : ""
                }`}
              />
              Auctions
            </Link>
          </li>

          <li>
            <Link
              className={`flex items-center gap-2  py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-white hover:bg-gray-500 transition-all duration-500 ${
                activeLink === "/admin/artworks"
                  ? "bg-gray-400"
                  : "text-black"
              }`}
              to="/admin/artworks"
              onClick={() => handleLinkClick("/admin/artworks")}
            >
              <FaPaintBrush
                size={16}
                className={`text-black transition-all duration-500 ${
                  activeLink === "/admin/artworks" ? " text-black" : ""
                }`}
              />
              Artworks
            </Link>
          </li>

          <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-white hover:bg-gray-500 transition-all duration-500 ${
                activeLink === "/admin/categories"
                  ? "bg-gray-400 "
                  : "text-black"
              }`}
              to="/admin/categories"
              onClick={() => handleLinkClick("/admin/categories")}
            >
              <BiSolidCategory
                size={18}
                className={`text-black transition-all duration-500 ${
                  activeLink === "/admin/categories" ? " text-black" : ""
                }`}
              />
              Category
            </Link>
          </li>
          {/* <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/notifications"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/notifications"
              onClick={() => handleLinkClick("/user-profile/notifications")}
            >
              <IoIosNotifications
                size={18}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/notifications"
                    ? " text-white"
                    : ""
                }`}
              />
              Notifications
            </Link>
          </li> */}
          {/* <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/account-settings"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/account-settings"
              onClick={() => handleLinkClick("/user-profile/account-settings")}
            >
              <IoMdSettings
                size={18}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/account-settings"
                    ? " text-white"
                    : ""
                }`}
              />
              Account Settings
            </Link>
          </li> */}
          {/* <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/change-password"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/change-password"
              onClick={() => handleLinkClick("/user-profile/change-password")}
            >
              <RiLockPasswordFill
                size={16}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/change-password"
                    ? " text-white"
                    : ""
                }`}
              />
              Change Password
            </Link>
          </li> */}
          {/* <li>
            <Link
              className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-theme-color hover:bg-theme transition-all duration-500 ${
                activeLink === "/user-profile/payment-method"
                  ? "bg-theme-color hover:text-white"
                  : ""
              }`}
              to="/user-profile/payment-method"
              onClick={() => handleLinkClick("/user-profile/payment-method")}
            >
              <IoWalletOutline
                size={18}
                className={`text-theme-color transition-all duration-500 ${
                  activeLink === "/user-profile/payment-method"
                    ? " text-white"
                    : ""
                }`}
              />
              Payment Method
            </Link>
          </li> */}
          <li>
          <Link
              className="flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer hover:pl-[20px] hover:text-white hover:bg-gray-500 transition-all duration-500"
              onClick={() => {
                logoutHandle();
              }}
            >
              <IoLogOutSharp size={18} className="text-black" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
