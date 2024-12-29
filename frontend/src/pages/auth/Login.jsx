import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, reset } from "../../store/auth/authSlice";
import background from "../../assets/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 1000,
      });
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message, {
        autoClose: 1000,
      });
      dispatch(reset());
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reset());
    dispatch(login(formData));
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center text-black"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative z-10 flex w-[90%] flex-col items-center rounded-xl bg-gray-300 py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-black">Palette</h1>
        <p className="m-2 text-xl">Login with your account</p>
        <p className="my-3 h-[1px] w-[80%] bg-black"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={handleSubmit}
        >
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
          />
          <label className="my-1 mt-2 text-lg">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              className="w-full pl-5 py-3 bg-gray-200 text-black placeholder-gray-500 outline-none border border-border-info-color rounded"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute right-3 text-gray-600 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          </div>
          <Link
            to="/forgot-password"
            className="my-1 text-black no-underline hover:text-pink-500"
          >
            Forget Password?
          </Link>
          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-black px-4 py-3 font-bold hover:bg-pink-500 hover:text-black text-white"
          >
            Sign In
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 hover:text-pink-500"
          >
            Sign Up.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
