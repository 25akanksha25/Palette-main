import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { reset, resetNewPassword } from "../../store/auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import background from "../../assets/background.jpg";

const ResetNewPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      setPassword("");
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError]);

  const resetnewPassword = (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("Password is required");
      return false;
    }

    let data = {
      password: password,
      id,
      token,
    };

    dispatch(resetNewPassword(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <div className="flex w-[90%] flex-col items-center rounded-xl bg-gray-300 py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-black">Palette</h1>
        <p className="my-3 h-[1px] w-[80%] bg-black"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={resetnewPassword}
        >
          <label className="my-1 text-lg text-black">Enter New Password</label>
          <div className="pr-3 flex justify-between items-center w-full rounded bg-gray-200 outline-none mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your new Password"
              className="w-full pl-5 py-3 bg-gray-200 text-black placeholder-gray-700 outline-none border border-black"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="cursor-pointer text-gray-700 hover:text-black"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          <button
            type="submit"
            className="my-4 font-Roboto outline-none text-white border border-black w-full rounded bg-black px-4 py-3 font-bold hover:bg-gray-300 hover:text-black"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetNewPassword;
