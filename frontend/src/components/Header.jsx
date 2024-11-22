import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {}, [user]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-2 sm:px-14 bg-white py-4 border-b border-border-info-color">
      <div className="flex items-center px-1 z-[1]">
        <Link to="/dashboard" className="no-underline">
          <h1 className="text-3xl font-bold text-black font-Roboto">
            Palatte
          </h1>
        </Link>
      </div>
      <div className="hidden sm:block">
        {/* Existing Links */}
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

        {/* New Links from Navbar */}
        <Link
          to="/buy"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Buy
        </Link>
        <Link
          to="/sell"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Sell
        </Link>
        <Link
          to="/new"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          What’s New
        </Link>
        <Link
          to="/artist"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Artists
        </Link>
        <Link
          to="/Artwork"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Artworks
        </Link>
        <Link
          to="/auction"
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
          to="/galleries"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Galleries
        </Link>
        <Link
          to="/event"
          className="text-black font-Roboto text-lg mx-3 hover:text-pink-500 transition-all"
        >
          Fairs & Events
        </Link>
      </div>
      <div className="flex items-center cursor-pointer z-[1]">
        {user ? (
          <div className="flex justify-center items-center">
            <img
              src={user?.profilePicture}
              alt="user image"
              className="w-10 h-10 rounded-full order-2 cursor-pointer active:scale-[0.95] transition-all"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3"
            >
              {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </Link>
          </div>
        ) : (
          <>
            {/* <Link
              to="/login"
              className="bg-blue-500 no-underline font-Roboto text-base hover:bg-color-danger transition-all duration-150 text-white py-1 sm:py-2 sm:px-3 px-2 rounded-md text-md font-semibold"
            >
              Sign In
            </Link> */}
            <Link
              to="/login"
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-400 transition-all duration-150 text-md font-semibold"
            >
              Sign In
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3 z-50"
            >
              {navbarOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
            </Link>
          </>
        )}
      </div>

      {user && sidebarOpen ? (
        <div
          className={`${
            sidebarOpen ? "animate-fadein" : "hidden"
          } rounded-xl origin-top-right overflow-hidden absolute right-12 top-16 mt-[4px] bg-body-bg z-50 w-[250px]`}
        >
          <nav className="pt-2 [&_a]:transition-all [&_a]:duration-100">
            <Link
              to="/user-profile/profile"
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
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
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              {user.userType === "seller" ? "Manage Items" : "Bids Items"}
            </Link>

            <Link
              to="/user-profile/account-settings"
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
              onClick={() => setSidebarOpen(false)}
            >
              Account Settings
            </Link>
            <Link
              onClick={() => {
                logoutHandle();
                setSidebarOpen(false);
              }}
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light"
            >
              Logout
            </Link>
          </nav>
        </div>
      ) : null}

      {navbarOpen && (
        <ul className="flex sm:hidden flex-col justify-center items-center absolute top-16 left-0 w-full h-screen bg-gradient-to-b from-theme-bg2 to-theme-bg text-body-text-color z-10">
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/" onClick={() => setNavbarOpen(!navbarOpen)}>
              Home
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/contact-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              Contact
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/about-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              About
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/buy" onClick={() => setNavbarOpen(!navbarOpen)}>
              Buy
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/sell" onClick={() => setNavbarOpen(!navbarOpen)}>
              Sell
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/new" onClick={() => setNavbarOpen(!navbarOpen)}>
              What’s New
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/artist" onClick={() => setNavbarOpen(!navbarOpen)}>
              Artists
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/artwork" onClick={() => setNavbarOpen(!navbarOpen)}>
              Artworks
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/auction" onClick={() => setNavbarOpen(!navbarOpen)}>
              Auctions
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/rooms" onClick={() => setNavbarOpen(!navbarOpen)}>
              Viewing Rooms
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/galleries" onClick={() => setNavbarOpen(!navbarOpen)}>
              Galleries
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/event" onClick={() => setNavbarOpen(!navbarOpen)}>
              Fairs & Events
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
