import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordSendMail, reset } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(reset());
      navigate("/login")
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError]);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    //console.log(email);
    if (email === "") {
      toast.error("Email is required");
      return false;
    }
    dispatch(forgotPasswordSendMail({ email }));
  
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center text-black"
        style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="absolute inset-0"></div>
      <div className="relative z-10 flex w-[90%] flex-col items-center rounded-xl bg-gray-300 py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-black">Palette</h1>
        <p className="m-2 text-xl">Reset your account password</p>
        <p className="my-3 h-[1px] w-[80%] bg-black"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={handlePasswordReset}
        >
          <label className="my-1 text-lg">Email Address</label>
          <input
            type="email"
            placeholder="Your Email"
            className="focus:border-1 rounded text-white border-[1px]  border-none focus:border-1 focus:border-solid bg-gray-200 px-5 py-3 outline-none  mb-2 placeholder-body-text-color"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="my-4 font-Roboto outline-none border border-transparent w-full rounded bg-black px-4 py-3 font-bold text-white hover:bg-gray-400 hover:text-black hover:border-black"
          >
            Send Reset Link
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
