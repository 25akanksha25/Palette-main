// import { useEffect } from "react";
// import { useNavigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useSelector} from "react-redux";


// const useAuth = () => {
//   const token = Cookies.get("JwtToken");
//   const user = JSON.parse(localStorage.getItem("user"));

//   if(!token){
//     localStorage.removeItem("user")
//   }
//   //console.log(user, "user,,,,,,,,,,,");
//   return token && user;
// };

// const PublicRoute = () => {
//   const auth = useAuth();
//   const navigate = useNavigate();
//   //console.log(auth, "auth.,,,,,,,,.......public....");

//   useEffect(() => {
//     if (auth) {
//       navigate("/");
//     }
//   }, [auth, navigate]);

//   return auth ? null : <Outlet />;
// };


// const AdminPublicRoute = () => {
//   const auth = useAuth();
//   const navigate = useNavigate();
//   //console.log(auth, "auth.,,,,,,,,.......public....");

//   useEffect(() => {
//     if (auth) {
//       navigate("/admin/users");
//     }
//   }, [auth, navigate]);

//   return auth ? null : <Outlet />;
// };

// const Protected = () => {
//   const auth = useAuth();
//   const navigate = useNavigate();
//   //console.log(auth, "auth.,,,,,,,,.......protected....");
//   useEffect(() => {
//     if (!auth) {
//       navigate("/login");
//     }
//   }, [auth, navigate]);

//   return auth ? <Outlet /> : null;
// };

// const AdminProtected = () => {
//   const auth = useAuth();
//   const navigate = useNavigate();
//   //console.log(auth, "auth.,,,,,,,,.......protected....");
//   useEffect(() => {
//     if (!auth) {
//       navigate("/login");
//     }
//   }, [auth, navigate]);

//   return auth ? <Outlet /> : null;
// };

// const SellerRoutes=()=>{
// const {user}=useSelector((state)=>state.auth);
//   const auth = useAuth();
//   const navigate = useNavigate();
// //console.log(auth, "auth.,,,,,seller routes,,,...........");
//   useEffect(() => {
//     if (auth && user.userType !== "seller") {
//       navigate("/dashboard");
//     }
//   }, [auth, navigate]);

//   return auth && user.userType === "seller" ? <Outlet /> : null;
// }

// const AdminRoutes=()=>{
//   const {user}=useSelector((state)=>state.auth);
//     const auth = useAuth();
//     const navigate = useNavigate();
//   //console.log(auth, "auth.,,,,,seller routes,,,...........");
//   if (auth && user.userType !== "admin") {
//     navigate("/admin/users");
//   }
//     useEffect(() => {
//       if (auth && user.userType !== "admin") {
//         navigate("/dashboard");
//       }
//     }, [auth, navigate]);
  
//     return auth && user.userType === "admin" ? <Outlet /> : null;
//   }

// export { PublicRoute,SellerRoutes, AdminRoutes,AdminProtected , AdminPublicRoute};
// export default Protected;




import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

// Updated useAuth function
const useAuth = () => {
  const token = Cookies.get("JwtToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    localStorage.removeItem("user");
  }

  return { token, user };
};

const PublicRoute = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      if (user.userType === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/");
      }
    }
  }, [token, user, navigate]);

  return token && user ? null : <Outlet />;
};

const AdminPublicRoute = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user && user.userType === "admin") {
      navigate("/admin/users");
    }
  }, [token, user, navigate]);

  return token && user && user.userType === "admin" ? null : <Outlet />;
};

const Protected = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? <Outlet /> : null;
};

const AdminProtected = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user?.userType !== "admin") {
      navigate("/login");
    }
  }, [token, user, navigate]);

  return token && user?.userType === "admin" ? <Outlet /> : null;
};

const SellerRoutes = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user?.userType !== "seller") {
      navigate("/dashboard");
    }
  }, [token, user, navigate]);

  return token && authUser?.userType === "seller" ? <Outlet /> : null;
};

const AdminRoutes = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user?.userType !== "admin") {
      navigate("/dashboard");
    }
  }, [token, user, navigate]);

  return token && authUser?.userType === "admin" ? <Outlet /> : null;
};

export { PublicRoute, SellerRoutes, AdminRoutes, AdminProtected, AdminPublicRoute };
export default Protected;
