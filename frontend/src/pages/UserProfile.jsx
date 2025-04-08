import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChangePassword from "./auth/ChangePassword";
import ProfileComponent from "../components/ProfileComponent";
import ManageItems from "../components/ManageItems";
import BidsItem from "../components/BidsItem";
import Notifications from "../components/Notifications";
import AccountSetting from "../components/AccountSetting";
import {SellerRoutes} from '../auth/Protected'
// import PaymentMethod from "../components/PaymentMethod";
import Cart from "../components/Cart";
import ErrorPage from "./ErrorPage";
import banner from "../assets/profileBanner2.png"



const UserProfile = () => {
  return (
    <div className="">
      {/* Banner Section */}
      {/* <div className="relative h-[300px] w-full">
        <img
          src={banner} // Replace with the actual path to your banner image
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Rest of the Profile Page */}
      <div className="flex gap-4 px-5 py-10 flex-wrap lg:flex-nowrap bg-[rgba(201,112,100,0.1)]">
        <Sidebar />
        <Routes>
          <Route path="/profile" element={<ProfileComponent />} />

          <Route element={<SellerRoutes />}>
            <Route path="/manage-items" element={<ManageItems />} />

          </Route>
          <Route path="/bids-items" element={<BidsItem />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/account-settings" element={<AccountSetting />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* <Route path="/payment-method" element={<PaymentMethod />} /> */}
          <Route path="/cart" element={<Cart />} />

          <Route path="/logout" element={<ChangePassword />} />
          <Route path="*" element={<ErrorPage />} />


        </Routes>
      </div>
    </div>
  );
};

export default UserProfile;
