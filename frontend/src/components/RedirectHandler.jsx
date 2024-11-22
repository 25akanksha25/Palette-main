import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHandler = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userType === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return null; // No UI rendered
};

export default RedirectHandler;
