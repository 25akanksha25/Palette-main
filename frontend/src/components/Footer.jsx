import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer className="absolute bottom-0 bg-white shadow w-full">
      <div className="lg:w-[80%] mx-auto p-4 md:py-8">
        <div className="sm:flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center mb-4 sm:mb-0 space-x-3 no-underline"
          >
            <h1 className="text-3xl font-bold text-black font-Roboto">
              <span className="uppercase text-black">Palette</span>
            </h1>
          </Link>
          <ul className="flex flex-wrap items-center text-sm font-medium text-black list-none">
            <li>
              <Link
                to="/about-us"
                className="me-4 md:me-6 text-black no-underline hover:text-theme-color"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="me-4 md:me-6 text-black no-underline hover:text-theme-color"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="text-black no-underline hover:text-theme-color"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
        <div className="font-Roboto flex justify-center text-black items-center text-sm sm:text-center">
          © {new Date().getFullYear()}
          <Link to="/" className="ml-1 no-underline">
            <p className="text-sm font-bold text-theme-color font-Roboto">
              <span className="uppercase text-theme-color">Palette</span>
            </p>
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;