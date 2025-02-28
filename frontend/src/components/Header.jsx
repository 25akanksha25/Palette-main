import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { getNotificationForUser } from "../store/notification/notificationSlice";
import socket from "../socket";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import logoimg from "../assets/logo.png";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  let navigate = useNavigate();
  let location = useLocation();
  const logInUser = JSON.parse(localStorage.getItem("user"));

  //console.log(notifications, "notifications............ header......");
  //i want a length of isRead ===false
  const unReadNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );
  //console.log(unReadNotifications.length, "unreadnotificatons........ length");

  useEffect(() => {}, [user]);
  useEffect(() => {
    if (logInUser) {
      dispatch(getNotificationForUser());
    }
    socket.on("newBidNotification", (data) => {
      
      socket.emit("joinAuction", logInUser?._id);

      dispatch(getNotificationForUser());
    });

    //console.log(notifications, "notification dispatch............");
  }, [location]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-2  sm:px-14 bg-white py-4 border-b border-border-info-color">
      {/* Logo */}
      <div className="flex items-center px-1 z-[1]">
        <Link to="/" className="no-underline">
          <img
            src={logoimg}
            alt="Logo"
            className="h-[100px] w-[190px]" // Adjust height to fit your design
          />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden sm:block">
        <Link
          to="/"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Home
        </Link>

        <Link
          to="/contact-us"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Contact
        </Link>
        <Link
          to="/about-us"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          About
        </Link>
        <Link
          to="/artwork"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Artworks
        </Link>
        <Link
          to="/dashboard"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Auctions
        </Link>
        <Link
          to="/viewroom"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Viewing Rooms
        </Link>
        <Link
          to="/events"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Fairs & Events
        </Link>
      </div>

      <div className="flex items-center cursor-pointer z-[1]">
        {user ? (
          <div className="flex justify-center items-center">
            <Link
              to="/user-profile/cart"
              className="text-black font-Roboto text-lg mx-3"
            >
              <BsCart3 className="text-black  hover:text-pink-500  transition-all " />
            </Link>
            <img
              src={user?.profilePicture}
              key={user.profilePicture}
              alt="user image"
              className="w-10 h-10 rounded-full order-2 cursor-pointer active:scale-[0.95] transition-all"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <Link to="/user-profile/notifications" className="mr-2 relative">
              {unReadNotifications.length > 0 ? (
                <span className="absolute right-0 top-0 w-[18px] h-[18px] flex items-center justify-center bg-black rounded-full  text-white text-xs font-bold ">
                  {unReadNotifications.length}
                </span>
              ) : null}

              <IoIosNotificationsOutline
                size={37}
                className="text-black text-xl cursor-pointer bg-gray-300 hover:bg-white hover:text-black hover:border-2 hover:border-black rounded-full p-2 transition-all "
              />
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3"
            >
              {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-400 transition-all duration-150 text-md font-semibold"
            >
              Sign In
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-black font-Roboto sm:hidden text-lg mx-3 order-3 z-50"
            >
              {navbarOpen ? <FaTimes size={25} color="black"/> : <FaBars size={25} color="black"/>}
            </Link>
          </>
        )}
      </div>

      {/* Dropdown Menu */}
      {user && sidebarOpen ? (
        <div
          className={`${
            sidebarOpen ? "animate-fadein" : "hidden"
          } rounded-xl origin-top-right overflow-hidden absolute right-12 top-20 mt-[4px] bg-white shadow-lg border border-gray-200 z-50 w-[300px]`}
        >
          <nav className="pt-2 [&_a]:transition-all [&_a]:duration-100">
            <Link
              to="/user-profile/profile"
              className="block no-underline text-gray-800 font-Roboto text-lg py-3 px-7 hover:bg-gray-100 hover:font-medium"
              onClick={() => setSidebarOpen(false)}
            >
              Profile
            </Link>
            <Link
              to={
                user.userType === "seller"
                  ? "/user-profile/manage-items"
                  : "/user-profile/bids-items"
              }
              className="block no-underline text-gray-800 font-Roboto text-lg py-3 px-7 hover:bg-gray-100 hover:font-medium"
              onClick={() => setSidebarOpen(false)}
            >
              {user.userType === "seller" ? "Manage Items" : "Bids Items"}
            </Link>

            <Link
              to="/user-profile/account-settings"
              className="block no-underline text-gray-800 font-Roboto text-lg py-3 px-7 hover:bg-gray-100 hover:font-medium"
              onClick={() => setSidebarOpen(false)}
            >
              Account Setting
            </Link>
            <Link
              onClick={() => {
                logoutHandle();
                setSidebarOpen(false);
              }}
              className="block no-underline text-gray-800 font-Roboto text-lg py-3 px-7 hover:bg-gray-100 hover:font-medium"
            >
              Logout
            </Link>
          </nav>
        </div>
      ) : null}


      {/* Mobile Navbar */}
      {navbarOpen && (
        <ul className="flex sm:hidden flex-col justify-center items-center absolute top-16 left-0 w-full h-screen bg-gradient-to-b from-gray-200 to-gray-100 text-gray-800 z-10">
          <li className="cursor-pointer capitalize text-2xl py-4">
            <Link to="/" onClick={() => setNavbarOpen(!navbarOpen)}>
              Home
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-2xl py-4">
            <Link to="/contact-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              Contact
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-2xl py-4">
            <Link to="/about-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              About
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-2xl py-4">
            <Link to="/artwork" onClick={() => setNavbarOpen(!navbarOpen)}>
              Artworks
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-2xl py-4">
            <Link to="/auction" onClick={() => setNavbarOpen(!navbarOpen)}>
              Auctions
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-2xl py-4">
            <Link to="/rooms" onClick={() => setNavbarOpen(!navbarOpen)}>
              Viewing Rooms
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-2xl py-4">
            <Link to="/events" onClick={() => setNavbarOpen(!navbarOpen)}>
              Fairs & Events
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
