import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import ArtWorks from "./pages/ArtWorks";
// import ArtworkDetails from "./pages/ArtWorkDetails";
import ViewRoom from "./pages/ViewRoom";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetNewPassword from "./pages/auth/ResetNewPassword";
import UploadItem from "./pages/UploadItem";
import Dashboard from "./pages/Dashboard";
import SingleAuctionDetail from "./pages/SingleAuctionDetail";
import UserProfile from "./pages/UserProfile";
import EditAuction from "./pages/EditAuction";
import ErrorPage from "./pages/ErrorPage";
import Protected, { PublicRoute, SellerRoutes, AdminRoutes } from "./auth/Protected";
import { useSelector } from "react-redux";
import AdminFooter from "./admin/components/Footer"
import AdminHeader from "./admin/components/Header"
import AdminDashboard from "./admin/Admin"
// <<<<<<< HEAD
// import PurchaseArtWork from "./pages/PurchaseArtWork";
import EventPage from "./pages/EventPage";

// =======
import UploadArtwork from "./pages/UploadArtwork";
import SingleArtworkDetail from "./pages/SingleArtworkDetail";
// >>>>>>> e5c1fae06ddfdb4ae86461825f1f301e7c75dec9


const App = () => {

const { user } = useSelector((state) => state.auth);

console.log(user,"...")
  return (
    <>
      <BrowserRouter>
      {user && user.userType === "admin" ? <AdminHeader /> : <Header />}
 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/ArtWork" element={<ArtWorks />} />
          <Route path="/viewroom" element={<ViewRoom/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<EventPage/>} />

          <Route
            path="/single-auction-detail/:id"
            element={<SingleAuctionDetail />}
          />
          <Route 
            path="/single-artwork-detail/:id" 
            element={<SingleArtworkDetail />} 
          />


          <Route path="*" element={<ErrorPage />} />

          <Route element={<PublicRoute />}>
            <Route
              path="/reset-password/:id/:token"
              element={<ResetNewPassword />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<Protected />}>
            <Route path="/user-profile/*" element={<UserProfile />} />
            <Route path="/edit-auction/:id" element={<EditAuction />} />
            <Route element={<SellerRoutes />}>
              <Route path="/create-auction" element={<UploadItem />} />
              <Route path="/create-artwork" element={<UploadArtwork/>} />
            </Route>
           
          </Route>
            <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>

{user && user.userType === "admin" ? <AdminFooter />: <Footer /> }

      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
