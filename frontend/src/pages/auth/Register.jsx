import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register, reset } from "../../store/auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import background from "../../assets/background.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful", {
        autoClose: 1000,
      });
      dispatch(reset());
      navigate("/login");
    } else if (isError) {
      toast.error(message, {
        autoClose: 1000,
      });
      dispatch(reset());
    }
  }, [isSuccess, isError, isLoading]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-.]+@(gmail\.com|yahoo\.com|chitkara\.edu\.in)$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(formData.fullName)) {
      toast.error("Name should contain only alphabets.", {
        autoClose: 1000,
      });
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error(
        "Email must be a valid Gmail, Yahoo, or Chitkara email address.",
        {
          autoClose: 1000,
        }
      );
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
        {
          autoClose: 1000,
        }
      );
      return false;
    } else {
      dispatch(reset());
      dispatch(register(formData));
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat text-black"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex w-[90%] flex-col items-center justify-center rounded-xl bg-gray-300/80 py-8 sm:w-2/5 sm:px-6 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-black">Palette</h1>
        <p className="m-2 text-xl">Create your new account</p>
        <p className="my-3 h-[1px] w-[80%] bg-black"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={handleRegister}
        >
          <label className="my-1 text-lg">Full Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full pl-5 py-3 rounded text-black bg-gray-200 placeholder-gray-500 outline-none mb-3 border border-border-info-color"
            name="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
          <label className="my-1 text-lg">Email Address</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full pl-5 py-3 rounded text-black bg-gray-200 placeholder-gray-500 outline-none mb-3 border border-border-info-color"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label className="my-1 text-lg">Password</label>
          <div className="pr-3 flex justify-between items-center w-full rounded bg-gray-200 outline-none mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              className="w-full pl-5 py-3 bg-gray-200 text-black placeholder-gray-500 outline-none border border-border-info-color"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="cursor-pointer text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </span>
          </div>
          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-black px-4 py-3 font-bold hover:bg-[#c97064] hover:text-black text-white"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-black hover:text-[#c97064]"
          >
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
