import { Link } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6";
import heroImg from "../../assets/hero-img.jfif";

const CreateEarnHome = () => {
    const logInUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex flex-row items-center h-[400px] mb-10 px-8 py-6 mt-20 rounded-[20px] overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
    }}
    >
      <div className="flex-1 bg-gray-800 text-white p-8 rounded-l-[20px] rounded-r-[20px] flex flex-col justify-center">
        <h2 className="mb-2 text-6xl font-medium">
          Meet your new art advisor
        </h2>
        <Link
          className="border-2 border-white px-4 py-2 mt-4 rounded-xl text-white cursor-pointer font-bold tracking-wide hover:scale-105 transition-all duration-200 flex items-center gap-2 w-fit"
          to={logInUser ? "/create-auction" : "/login"}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">Discover Palette</span>
            <FaArrowRightLong />
          </div>
        </Link>
      </div>
      <div className="flex-1"></div>
  </div>
  )
}

export default CreateEarnHome;