import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react"; // For the Back to Top button icon

const PrivacyPolicy = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show/hide Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-white">
        {/* Header Section */}
        <div className="flex items-center justify-center flex-col h-[280px] bg-hero-img bg-cover">
          <h1 className="text-center font-bold text-7xl text-black">
            Privacy Policy
          </h1>
          <div className="flex gap-2 text-lg pt-2 text-black">
            <Link
              to="/"
              className="no-underline hover:text-[#c97064] transition-all"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-[#c97064] cursor-pointer">
              Privacy Policy
            </span>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="px-24 py-20 flex flex-col m-auto max-w-[1300px]">
          <div className="flex flex-col md:flex-row gap-10 mt-6">
            {/* Left Side - Privacy Policy Content */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black">
                This Privacy Policy will help you better understand how we
                collect, use, and share your personal information.
              </h2>
              <div id="collect-info">
                <h2 className="font-bold text-lg text-black mt-8">
                  What Personal Information do we collect?
                </h2>
                <p className="text-gray-700 pt-5">
                  To register for our Services, we collect personal information
                  such as your name, email, phone number, billing address, and
                  shipping address. This information is provided when you
                  register for an account or contact us.
                </p>
              </div>

              <div id="usage-info">
                <h2 className="font-bold text-2xl text-black mt-8">
                  How we use the Personal Information
                </h2>
                <ul className="flex flex-col gap-2 list-disc pl-4 text-gray-700 pt-5">
                  <li>
                    <span className="font-semibold">
                      To provide and improve services:
                    </span>{" "}
                    We use your information to allow you to participate in
                    auctions and provide customer support.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Personalize your experience:
                    </span>{" "}
                    We personalize your experience based on your preferences and
                    past activity.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Send marketing communications:
                    </span>{" "}
                    We may use your contact information for promotional offers
                    and newsletters. You can opt out at any time.
                  </li>
                </ul>
              </div>

              <div id="security">
                <h2 className="font-bold text-2xl text-black mt-8">
                  Security of User Data
                </h2>
                <p className="text-gray-700 pt-5">
                  We take steps to protect your personal information from
                  unauthorized access. This includes encryption, secure storage,
                  and limited access.
                </p>
                <ul className="flex flex-col gap-2 list-disc pl-4 text-gray-700 pt-5">
                  <li>Storing your information securely</li>
                  <li>Using encryption to protect data</li>
                  <li>Limiting access to authorized personnel only</li>
                </ul>
              </div>

              <div id="copyright">
                <h2 className="font-bold text-2xl text-black mt-8">
                  Copyright and Security
                </h2>
                <p className="text-gray-700 pt-5">
                  We respect intellectual property rights and prohibit listing
                  items that infringe on copyrights or trademarks. We also take
                  measures to secure our website.
                </p>
              </div>
            </div>

            {/* Right Side - Table of Contents */}
            <div className="w-full md:w-[30%] md:sticky self-start">
              <div className="bg-white">
                <h2 className="font-semibold text-3xl text-black">
                  Table of Contents
                </h2>
                <ul className="list-decimal pl-5 text-xl text-black mt-4">
                  <li>
                    <a href="#collect-info" className="text-black underline">
                      What Personal Information do we collect?
                    </a>
                  </li>
                  <li>
                    <a href="#usage-info" className="text-black underline">
                      How we use the Personal Information
                    </a>
                  </li>
                  <li>
                    <a href="#security" className="text-black underline">
                      Security of User Data
                    </a>
                  </li>
                  <li>
                    <a href="#copyright" className="text-black underline">
                      Copyright and Security
                    </a>
                  </li>
                </ul>
                {/* Horizontal Line Below TOC */}
                <hr className="mt-7 border-gray-600" />
              </div>
            </div>
          </div>

          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed z-10 bottom-5 right-5 bg-[#c97064] text-white p-3 rounded-full shadow-lg hover:bg-[#a85650] transition-all flex items-center justify-center"
              aria-label="Back to Top"
            >
              <ChevronUp size={24} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
