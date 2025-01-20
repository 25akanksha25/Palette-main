import aboutimg from "../assets/aboutus.jpg";
import abouthead from "../assets/about-head3.png";
import mapimg from "../assets/mapimg.webp";
import CreateEarnHome from "../components/home/CreateEarnHome";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <img
          src={abouthead} // Replace this with your desired banner image path
          alt="About Us Banner"
          className="w-full h-[350px] object-cover"
        />
      </div>

      {/* About Us Parent */}
      <div className="text-black flex flex-col gap-20 pt-20 px-6 lg:px-11">
        {/* About Us Section */}
        <div className="flex items-center gap-12 flex-wrap lg:flex-nowrap">
          <img
            className="min-w-[600px] h-[500px] object-cover rounded-lg"
            src={aboutimg}
            alt="about us"
          />
          <div className="flex flex-col gap-1 lg:min-w-[50%] lg:w-1/2 pr-10">
            <div className="mb-4">
              <div className="text-3xl mb-14 tracking-[5px] uppercase text-pink-500 font-semibold">
                About Us
              </div>
              <h2 className="text-4xl font-medium italic text-black">
                Revolutionizing the Art Marketplace
              </h2>
            </div>
            <div className="text-lg text-gray-700 leading-8">
              <p className="mb-4">
                Welcome to Palette, a dedicated platform for connecting artists
                and collectors in a thriving auction environment. Here,
                creativity knows no bounds, and art finds its way to those who
                value its essence the most.
              </p>
              <p className="mb-4">
                Palette is your gateway to discovering unique paintings and
                digital art from across the globe. Whether you’re a seasoned
                collector or an emerging creator, our platform ensures seamless
                buying, selling, and showcasing experiences.
              </p>
              <p>
                Join us today and transform your passion for art into a journey
                of connection, inspiration, and creativity.
              </p>
            </div>
          </div>
        </div>

        {/* Global Reach Section */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-10 py-16 px-6 lg:px-20">
          {/* Left Content (Big Numbers and Minimal Text) */}
          <div className="flex-1">
            <h2 className="text-5xl lg:text-5xl font-bold text-black leading-snug">
              Reach a global network of collectors
            </h2>
            <div className="mt-10 space-y-8">
              <div>
                <h3 className="text-6xl lg:text-7xl font-extrabold text-black">
                  3M+
                </h3>
                <p className="text-xl lg:text-2xl text-gray-700">
                  Registered users worldwide
                </p>
              </div>
              <div>
                <h3 className="text-6xl lg:text-7xl font-extrabold text-black">
                  3,000
                </h3>
                <p className="text-xl lg:text-2xl text-gray-700">
                  Miles average transaction distance
                </p>
              </div>
              <div>
                <h3 className="text-6xl lg:text-7xl font-extrabold text-black">
                  190
                </h3>
                <p className="text-xl lg:text-2xl text-gray-700">
                  Countries in our network
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src={mapimg}
              alt="Global Reach Map"
              className="w-full min-w-[800px] h-[500px] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
        <CreateEarnHome />
        
      </div>
    </>
  );
};

export default AboutUs;
