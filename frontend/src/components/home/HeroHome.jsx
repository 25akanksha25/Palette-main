import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import herovector from "../../assets/heroimg.jfif";
import { RiFindReplaceLine } from "react-icons/ri";
import ImageCarousel from "../../pages/slider"; // Import the carousel component

const HeroHome = () => {
  const logInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* Image Carousel at the Top */}
      <ImageCarousel />

      <div className="lg:h-[85vh] py-20 p-5 bg-white lg:px-12 flex items-center justify-center flex-wrap lg:flex-nowrap gap-5 text-white">
        <div className="w-full flex flex-col gap-4 z-[1]">
          <h3 className="tracking-wider text-black">DISCOVER, COLLECT AND SELL</h3>
          <h1 className="text-5xl font-bold text-black">
            Discover Rare Products And Bid in Real-Time
          </h1>
          <p className="text-black">
            Our real-time auctions let you join the thrill of selling, hunting
            and bidding live on rare Products. Explore our listings to start
            bidding or sell your own products!
          </p>
          <div className="flex gap-4">
            <Link
              className="hover:scale-105 flex border border-black px-5 py-3 mt-2 rounded-xl text-black cursor-pointer font-bold tracking-wide hover:bg-black hover:text-white transition-all duration-200 w-fit"
              to="/about-us"
            >
              <div className="flex items-center gap-2">
                <RiFindReplaceLine />
                <span>Explore More</span>
              </div>
            </Link>
            <Link
              className="hover:scale-105 flex bg-black px-5 py-3 mt-2 rounded-xl text-white cursor-pointer font-bold tracking-wide hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all duration-200 w-fit"
              to={logInUser ? "/user-profile/profile" : "/login"}
            >
              <div className="flex items-center gap-2">
                <span>Create Now</span>
                <FaArrowRightLong />
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full lg:p-20 animate-float">
          <img src={herovector} alt="Hero-img" />
        </div>
      </div>
    </>
  );
};

export default HeroHome;
