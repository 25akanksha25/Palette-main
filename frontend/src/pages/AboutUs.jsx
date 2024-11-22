import { Link } from "react-router-dom";
import aboutimg from "../assets/mapimg.webp";
import CreateEarnHome from "../components/home/CreateEarnHome";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="text-black flex items-center justify-center flex-col h-[280px] bg-cover bg-hero-img">
        <h1 id="home" className="text-center font-bold text-4xl">
          About Us
        </h1>
        <div className="flex gap-2 font-medium pt-2">
          <Link
            to={"/"}
            className=" no-underline hover:text-theme-color transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-theme-color">About Us</span>
        </div>
      </div>

      {/* About Us Parent */}
      <div className="text-black flex flex-col gap-20 pt-20 px-6 lg:px-11 ">
        {/* About Us Section */}
        <div className="flex items-center gap-6 flex-wrap lg:flex-nowrap">
          <img className="min-w-48 rounded-lg shadow-lg" src={aboutimg} alt="about us" />
          <div className="flex flex-col gap-6 lg:min-w-[50%] lg:w-1/2">
            <div className="mb-4">
              <span className="text-lg tracking-[5px] uppercase text-theme-color font-semibold">
                About Us
              </span>
              <h2 className="mt-2 text-4xl font-medium text-black">
                Revolutionizing the Art Marketplace
              </h2>
            </div>
            <div className="text-lg text-gray-700 leading-8">
              <p className="mb-4">
                Welcome to Palette, a dedicated platform for connecting artists and collectors in a thriving auction environment. Here, creativity knows no bounds, and art finds its way to those who value its essence the most.
              </p>
              <p className="mb-4">
                Palette is your gateway to discovering unique paintings and digital art from across the globe. Whether you’re a seasoned collector or an emerging creator, our platform ensures seamless buying, selling, and showcasing experiences.
              </p>
              <p>
                Join us today and transform your passion for art into a journey of connection, inspiration, and creativity.
              </p>
            </div>
          </div>
        </div>

        {/* Global Reach Section */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 lg:gap-10 py-16">
          {/* Text Content */}
          <div className="flex-1">
            <span className="text-lg tracking-[5px] uppercase text-theme-color font-semibold">
              Our Global Reach
            </span>
            <h2 className="mt-4 text-4xl font-medium text-black leading-snug">
              Connecting Art Collectors and Creators Across the Globe
            </h2>
            <div className="mt-6 text-lg text-gray-700 leading-8">
              <p className="mb-6">
                Palette is more than just an online platform—it's a thriving network of artists and collectors from every corner of the world. With a presence in <strong>150+ countries</strong> and an average transaction distance of <strong>2,000 miles</strong>, we bring the beauty of art to a global audience.
              </p>
              <p>
                Join a community of over <strong>1 million registered users</strong> who share a passion for creativity. Whether you're buying, selling, or admiring, Palette connects you to a universe of artistic possibilities.
              </p>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="flex-1">
            <img
              src="your-image-path-here.png" // Replace this with your actual image path
              alt="Global Reach Map"
              className="w-full object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-[1500px] m-auto">
          <div className="mb-10 text-center">
            <span className="text-lg tracking-[5px] uppercase text-theme-color font-semibold">
              Process
            </span>
            <h2 className="mt-2 text-4xl font-medium text-black">
              Create and Sell{" "}
              <span className="text-color-primary">Your Art</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 m-auto gap-5 w-full md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col text-black gap-4 justify-start p-8 rounded-2xl bg-theme-bg">
              <h2 className="text-5xl font-bold text-stroke">01</h2>
              <h3 className="text-2xl font-bold">Setup Your Account</h3>
              <p className="text-gray-700">
                Register for a free account and unlock the power to showcase your creativity.
              </p>
            </div>
            <div className="flex flex-col text-black gap-4 justify-start p-8 rounded-2xl bg-theme-bg">
              <h2 className="text-5xl font-bold text-stroke">02</h2>
              <h3 className="text-2xl font-bold">Create Your Auction</h3>
              <p className="text-gray-700">
                Create a compelling listing that showcases your artwork to attract buyers.
              </p>
            </div>
            <div className="flex flex-col text-black gap-4 justify-start p-8 rounded-2xl bg-theme-bg">
              <h2 className="text-5xl font-bold text-stroke">03</h2>
              <h3 className="text-2xl font-bold">Add Starting Price for Bid</h3>
              <p className="text-gray-700">
                Set a starting bid and optional reserve price for your pieces.
              </p>
            </div>
            <div className="flex flex-col text-black gap-4 justify-start p-8 rounded-2xl bg-theme-bg">
              <h2 className="text-5xl font-bold text-stroke">04</h2>
              <h3 className="text-2xl font-bold">List Art for Sale</h3>
              <p className="text-gray-700">
                Publish your art and let the auction excitement begin!
              </p>
            </div>
          </div>
        </div>

        <CreateEarnHome />
      </div>
    </>
  );
};

export default AboutUs;
